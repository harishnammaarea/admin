import clsx from "clsx";
import AddRestaurantBankDetailsFields from "components/AddrestaurantBankDetailsFields";
import StartOnBoardingProcessRouteToStage from "components/StartOnBoardingprocessRouteToStage";
import { InjectedFormProps, reduxForm } from "redux-form";
import { Form } from "rsuite";
import validate from "./validate";
import { SelectOptions } from "core/models/Options";
import { BankDetails } from "core/models/restaurants";
import { useEffect } from "react";

interface AddRestaurantBankDetailsFormProps {
  className?: string
  onAddBankDetails(values: BankDetailsReducFormProps): void
  states: SelectOptions[]
  bankDetails?: BankDetails | BankDetailsReducFormProps | null
}

export interface BankDetailsReducFormProps {
  accountNumber: string
  accountHolderName: string
  bankName: string
  ifscCode: string
  branch: string
  bankCity: string
  bankState: string
  pancard: string
}

type FinalProps = InjectedFormProps<BankDetailsReducFormProps, AddRestaurantBankDetailsFormProps>
  & AddRestaurantBankDetailsFormProps

function AddRestaurantBankDetailsForm({ className, handleSubmit, states, initialize, bankDetails, onAddBankDetails }: FinalProps) {
  useEffect(() => {
    if (bankDetails) {
      initialize({ ...bankDetails })
    }
  }, [bankDetails, initialize])
  
  function handleAddBankDetails(values: BankDetailsReducFormProps) {
    onAddBankDetails(values)
  }

  return (
    <Form
      className={clsx("add-restaurant-bank-details-form-main-container", className)}
      onSubmit={handleSubmit(handleAddBankDetails)}
    >
      <AddRestaurantBankDetailsFields
        states={states}
        className="add-restaurant-bank-details-form-fields" />
      <StartOnBoardingProcessRouteToStage
        previousStage="owner-details"
        nextStage="basic-details"
      />
    </Form>)
}

export default reduxForm<BankDetailsReducFormProps, AddRestaurantBankDetailsFormProps>({
  form: "add-restaurant-bank-details-form",
  validate
})(AddRestaurantBankDetailsForm)