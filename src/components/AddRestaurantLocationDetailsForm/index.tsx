import { InjectedFormProps, reduxForm } from "redux-form"
import AddRestaurantLocationDetailsFields, { Location } from "../AddRestaurantLocationDetailsFields"
import { Form } from "rsuite"
import { SelectOptions } from "core/models/Options"
import { validate } from "./validate";
import { LocationDetails } from "core/models/restaurants";
import StartOnBoardingProcessRouteToStage from "components/StartOnBoardingprocessRouteToStage";
import { START_ON_BOARDING_PROCESS_STAGES } from "core/constants/OnBoarding";
import { useEffect } from "react";

interface AddRestaurantLocationDetailsFormProps {
  isLoaded: boolean,
  className?: string,
  location: Location,
  areas: SelectOptions[]
  locationDetails?: LocationDetails | null | AddLocationReduxFormProps
  onConfirmAddress(address: string): void
  onAddLocationDetails(values: AddLocationReduxFormProps): void
}

export interface AddLocationReduxFormProps {
  buildingNo: string,
  addressLineOne: string,
  area: string,
  city: string,
  pincode: string,
  state: string,
  lat: string,
  lng: string
}

type FinalProps = InjectedFormProps<AddLocationReduxFormProps, AddRestaurantLocationDetailsFormProps>
  & AddRestaurantLocationDetailsFormProps

function AddRestaurantLocationDetailsForm({ isLoaded,
  handleSubmit,
  location,
  areas,
  locationDetails,
  onConfirmAddress,
  onAddLocationDetails
  ,initialize
}: FinalProps) {

  useEffect(()=>{
    if(locationDetails) {
      initialize({...locationDetails})
    }
  },[initialize, locationDetails])

  function handleOnFormSubmit(values: AddLocationReduxFormProps) {
    onAddLocationDetails(values)
  }

  return (
    <div className="add-restaurant-location-details-form">
      <Form onSubmit={handleSubmit(handleOnFormSubmit)}>
        <AddRestaurantLocationDetailsFields
          isLoaded={isLoaded}
          location={location}
          areas={areas}
          onConfirmAddress={onConfirmAddress}
          className="add-resturant-location-details-form-fields"
        />
        <StartOnBoardingProcessRouteToStage
          previousStage={START_ON_BOARDING_PROCESS_STAGES.openingHours}
          nextStage={START_ON_BOARDING_PROCESS_STAGES.ownerDetails}
        />
      </Form>
    </div>)
}

export default reduxForm<AddLocationReduxFormProps, AddRestaurantLocationDetailsFormProps>({
  form: "add-restaurant-location-details-form",
  validate
}
)(AddRestaurantLocationDetailsForm)