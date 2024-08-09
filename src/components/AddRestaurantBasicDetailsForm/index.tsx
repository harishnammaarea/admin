import clsx from "clsx";
import { InjectedFormProps, reduxForm } from "redux-form";
import validate from "./validate";
import {
  BasicDetails,
  MainCourses,
  RestaurantType,
} from "core/models/restaurants";
import { Form } from "rsuite";
import { useContext, useEffect, useState } from "react";
import Option, { SelectOptions } from "core/models/Options";
import { uploadSingleFile } from "core/services/core";
import { NotifierContext } from "App/Notifier";
import { DEFAULT_API_ERROR } from "core/constants/Defaults";
import AddRestaurantBasicDetailsFields from "../AddRestaurantBasicDetailsFields";
import StartOnBoardingProcessRouteToStage from "components/StartOnBoardingprocessRouteToStage";
import { START_ON_BOARDING_PROCESS_STAGES } from "core/constants/OnBoarding";

interface AddRestaurantBasicDetailsFormProps {
  className?: string;
  onAddRestaurantBasicDetails(
    basicDetails: ModifiedAddRestaurantBasicDetailsFormValues): void,
  areas: SelectOptions[],
  mainCourses: MainCourses[],
  basicDetails?: null | BasicDetails | ModifiedAddRestaurantBasicDetailsFormValues,
  cuisines: string[],
  states: Option[],
}

type LogoUrl = {
  logo: string
}

type ModifiedClosedOn = {
  closedOn: string
}

type ModifiedCuisines = {
  cuisines: string
}
type ModifiedMainCourses = {
  mainCourses: string
}

export type ModifiedAddRestaurantBasicDetailsFormValues = Omit<AddRestaurantBasicDetailsFormValues,
  "closedOn" | "cuisines" | "mainCourses">
  & ModifiedClosedOn & ModifiedCuisines & ModifiedMainCourses & LogoUrl


export interface AddRestaurantBasicDetailsFormValues {
  name: string;
  category: RestaurantType;
  contactNumber: string;
  contactNumberType: "Mobile number" | "Landline number";
  alternateContactNumber: string;
  alternateContactNumberType: "Mobile number" | "Landline number";
  gstNo: string;
  fssaiNumber: string;
  email: string;
  closedOn: string[];
  cuisines: string[];
  mainCourses: string[];
}

type FinalProps = InjectedFormProps<AddRestaurantBasicDetailsFormValues, AddRestaurantBasicDetailsFormProps> &
  AddRestaurantBasicDetailsFormProps;

function AddRestaurantBasicDetailsForm({ className, handleSubmit,
  initialize,
  basicDetails,
  mainCourses,
  cuisines,
  onAddRestaurantBasicDetails
}: FinalProps) {
  const [logo, setLogo] = useState<File | null>(null)
  const [uploadedUrl, setUploadedUrl] = useState<string>("")
  const { showNotification } = useContext(NotifierContext)

  useEffect(() => {
    if (basicDetails) {
      initialize({
        name: basicDetails.name,
        category: basicDetails.category,
        contactNumber: basicDetails.contactNumber,
        contactNumberType: basicDetails.contactNumberType,
        alternateContactNumber: basicDetails.alternateContactNumber,
        alternateContactNumberType: basicDetails.alternateContactNumberType,
        gstNo: basicDetails.gstNo,
        fssaiNumber: basicDetails.fssaiNumber,
        email: basicDetails.email || "",
        closedOn: basicDetails.closedOn ? basicDetails.closedOn.split(",") : [],
        cuisines: basicDetails.cuisines.split(","),
        mainCourses: basicDetails.mainCourses.split(","),
      })

      if (basicDetails.logo) {
        setUploadedUrl(basicDetails.logo)
      }
    }
  }, [basicDetails, initialize]);

  async function onFormSubmit(values: AddRestaurantBasicDetailsFormValues) {
    let logoUrl = ""
    const formData = new FormData()

    if (logo) {
      formData.append("files", logo)
      const uploadLogoResponse = await uploadSingleFile(formData)
      if (uploadLogoResponse.data && uploadLogoResponse.status) {
        logoUrl = uploadLogoResponse.data.url
      } else {
        showNotification({ type: "error", message: uploadLogoResponse.message || DEFAULT_API_ERROR, title: "Failed" })
      }
    }

    const restaurantBasicDetails = {
      ...values,
      cuisines: values.cuisines.join(","),
      closedOn: values.closedOn ? values.closedOn?.join(",") : "",
      city: "Bengaluru",
      state: "Karnataka",
      mainCourses: values.mainCourses ? values.mainCourses.join(",") : "",
      logo: logoUrl || uploadedUrl
    }

    onAddRestaurantBasicDetails(restaurantBasicDetails)
  }

  function handleUploadLogo(logo: File) {
    setLogo(logo)
  }

  return (
    <Form onSubmit={handleSubmit(onFormSubmit)}
      className={clsx("add-restaurant-basic-details-form-container", className)}    >
      <AddRestaurantBasicDetailsFields
        uploadedurl={uploadedUrl}
        onLogoUpload={handleUploadLogo}
        cuisines={cuisines}
        mainCourses={mainCourses}
        className="add-restaurant-basic-details-form-container-basic-details-fields"
      />
      <StartOnBoardingProcessRouteToStage
        nextStage={START_ON_BOARDING_PROCESS_STAGES.locationDetails}
        previousStage={START_ON_BOARDING_PROCESS_STAGES.coverPhotos}
      />
    </Form>
  )
}

export default reduxForm<AddRestaurantBasicDetailsFormValues, AddRestaurantBasicDetailsFormProps>({
  form: "addRestuarantBasicDetailsForm",
  validate
})(AddRestaurantBasicDetailsForm);