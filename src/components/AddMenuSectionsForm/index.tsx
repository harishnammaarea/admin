import clsx from "clsx";
import AddMenuSectionsFields from "components/AddMenuSubSectionsFields";
import StartOnBoardingProcessRouteToStage from "components/StartOnBoardingprocessRouteToStage";
import { FieldArray, InjectedFormProps, reduxForm } from "redux-form";
import { Form } from "rsuite";
import { validate } from "./validate";
import { useEffect } from "react";

interface AddMenuSectionsProps {
  className?: string
  onAddMenuSections(values: AddMenuSectionReduxForm): void
  menuSections?: null | AddMenuSectionReduxForm
}

export interface AddMenuSectionReduxForm {
  menuSections: AddMenuSections[]
}

type AddMenuSections = {
  section: string
}

type FinalProps = InjectedFormProps<AddMenuSectionReduxForm, AddMenuSectionsProps> & AddMenuSectionsProps

function AddMenuSectionsForm({ className,
  handleSubmit,
  onAddMenuSections,
  initialize,
  menuSections }: FinalProps) {

  function handleAddMenuSections(values: AddMenuSectionReduxForm) {
    onAddMenuSections(values)
  }

  useEffect(() => {
    if (menuSections) {
      initialize({ ...menuSections })
    }
  }, [initialize, menuSections])

  return (
    <Form
      onSubmit={handleSubmit(handleAddMenuSections)}
      className={clsx("add-menu-sections-form-main-container", className)}>
      <FieldArray
        name="menuSections"
        className="add-menu-sections-form-fields"
        component={AddMenuSectionsFields} />
      <StartOnBoardingProcessRouteToStage
        previousStage="bank-details"
        nextStage="basic-details"
      />
    </Form>)
}

export default reduxForm<AddMenuSectionReduxForm, AddMenuSectionsProps>({
  form: "add-menu-sections-form",
  validate
})(AddMenuSectionsForm)
