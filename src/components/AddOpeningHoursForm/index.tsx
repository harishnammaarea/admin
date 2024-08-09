import clsx from "clsx";
import { Form, Grid } from "rsuite";
import { FieldArray, InjectedFormProps, reduxForm } from "redux-form";
import AddOpeningHoursFields from "../AddOpeningHoursFields";
import StartOnBoardingProcessRouteToStage from "components/StartOnBoardingprocessRouteToStage";
import validate from "./validate";
import { useEffect } from "react";
import { SelectOptions } from "core/models/Options";

interface AddOpeningHoursProps {
  className?: string;
  onAddOpeningHours(values: AddOpeningHoursReduxFormProps): void
  openingHoursDetails?: AddOpeningHoursReduxFormProps | null
  appliedDays: SelectOptions[]
}

type FinalProps = InjectedFormProps<AddOpeningHoursReduxFormProps, AddOpeningHoursProps> & AddOpeningHoursProps

export interface AddOpeningHoursReduxFormProps {
  openingHours: OpeningHours[]
}

type OpeningHours = {
  appliedDays: string[],
  closingTime: string,
  openingTime: string
}

function AddOpeningHoursForm({ className,
  handleSubmit,
  initialize,
  openingHoursDetails,
  appliedDays,
  onAddOpeningHours }: FinalProps) {

  function handleAddOpeningHours(values: AddOpeningHoursReduxFormProps) {
    onAddOpeningHours(values)
  }

  useEffect(() => {
    if (openingHoursDetails) {
      initialize({...openingHoursDetails})
    }
  }, [initialize, openingHoursDetails])

  return (
    <Form
      className={clsx("add-opening-hours-form-main-container", className)}
      onSubmit={handleSubmit(handleAddOpeningHours)}
    >
      <Grid fluid className="add-opening-hours-form-grid">
        <FieldArray name="openingHours"
          appliedDays={appliedDays}
          className="add-opening-hours-field-array"
          component={AddOpeningHoursFields} />
      </Grid>
      <StartOnBoardingProcessRouteToStage
        previousStage="basic-details"
        nextStage="owner-details"
      />
    </Form>
  )
}

export default reduxForm<AddOpeningHoursReduxFormProps, AddOpeningHoursProps>({
  form: "add-opening-hours-form",
  validate
})(AddOpeningHoursForm)