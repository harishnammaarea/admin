import clsx from "clsx";
import AddRestaurantOwnerDetailsFields from "components/AddRestaurantOwnerDetailsFields";
import StartOnBoardingProcessRouteToStage from "components/StartOnBoardingprocessRouteToStage";
import { InjectedFormProps, reduxForm } from "redux-form";
import { Form } from "rsuite";
import validate from "./validate";
import { useContext, useEffect, useState } from "react";
import { NotifierContext } from "App/Notifier";
import { uploadSingleFile } from "core/services/core";
import { OwnerDetails } from "core/models/restaurants";

interface AddRestaurantOwnerDetailsFormProps {
  className?: string
  ownerDetails?: CombinedOwnerDetails | null | OwnerDetails
  onAddOwnerDetails(values: CombinedOwnerDetails): void
}

export type CombinedOwnerDetails = OwnerDetailsReduxformProps & OwnerPhoto

type OwnerPhoto = {
  ownerPhotoUrl: string
}

interface OwnerDetailsReduxformProps {
  ownerName: string,
  ownerContactNumber: string,
  adharCardNo: string
  ownerEmail: string
}

type FinalProps = InjectedFormProps<OwnerDetailsReduxformProps, AddRestaurantOwnerDetailsFormProps>
  & AddRestaurantOwnerDetailsFormProps

function AddRestaurantOwnerDetailsForm({ className,
  handleSubmit,
  onAddOwnerDetails,
  ownerDetails,
  initialize }: FinalProps) {
  const [ownerPhoto, setOwnerPhoto] = useState<File | null>(null)
  const { showNotification } = useContext(NotifierContext)
  const [uploadedOwnerPhoto, setUploadOwnerPhoto] = useState<string>("")

  useEffect(() => {
    if (ownerDetails) {
      initialize({ ...ownerDetails })
      setUploadOwnerPhoto(ownerDetails.ownerPhotoUrl)
    }
  }, [ownerDetails, initialize])

  async function handleAddLocationDetails(values: OwnerDetailsReduxformProps) {
    let ownerPhotoUrl = ""
    if (!ownerPhoto && !uploadedOwnerPhoto) {
      showNotification({ type: "error", message: "Owner Photo is required", title: "Required" })
      return
    }
    if (ownerPhoto) {
      const formData = new FormData()
      formData.append("files", ownerPhoto)
      const ownerPhotoResponse = await uploadSingleFile(formData)
      if (ownerPhotoResponse.data && ownerPhotoResponse.status) {
        ownerPhotoUrl = ownerPhotoResponse.data.url
      }
      else {
        showNotification({ type: "error", message: "some thing went wrong ", title: "Failed" })
        return
      }
    }

    const ownerDetails = {
      ...values,
      ownerPhotoUrl: ownerPhotoUrl || uploadedOwnerPhoto
    }
    onAddOwnerDetails(ownerDetails)
  }

  return (
    <Form onSubmit={handleSubmit(handleAddLocationDetails)}
      className={clsx("add-restaurant-owner-details-form-main-container", className)}>
      <AddRestaurantOwnerDetailsFields
        onUploadOnwerPhoto={(image: File) => { setOwnerPhoto(image) }}
        className="add-restaurant-owner-details-form-fields"
        url={uploadedOwnerPhoto}
      />
      <StartOnBoardingProcessRouteToStage
        previousStage="location-details"
        nextStage="bank-details"
      />
    </Form>)
}

export default reduxForm<OwnerDetailsReduxformProps, AddRestaurantOwnerDetailsFormProps>({
  form: "add-restaurant-owner-details-form",
  validate

})(AddRestaurantOwnerDetailsForm)