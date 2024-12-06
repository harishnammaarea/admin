import { Field, Form as FinalForm } from "react-final-form"
import { Form } from "rsuite"
import NumberInputWithLabel from "shared/components/redux-form/NumberInputWithLable"
import { CreateMenuComboFormMainDetails } from ".."
import Button from "shared/components/Button"
import AddIconCircularIcon from "shared/icons/AddIconCircularIcon"

interface CreateMenuItemsCustomizerConfirmFormProps {
  minimunOptionsToSelect: number
  canSelectUpto: number
  optionsCount: number
  onCreateCustomizer(data: CreateMenuComboFormMainDetails): void
  isUpdate?: boolean
}

export default function CreateMenuItemsCustomizerConfirmForm({ onCreateCustomizer, canSelectUpto, minimunOptionsToSelect, optionsCount, isUpdate = false }: CreateMenuItemsCustomizerConfirmFormProps) {

  function handleOnCreateMenuItemsCustomizers(data: CreateMenuComboFormMainDetails) {
    onCreateCustomizer(data)
  }

  return (
    <FinalForm
      initialValues={{ minimunOptionsToSelect: minimunOptionsToSelect, canSelectUpto: canSelectUpto }}
      onSubmit={handleOnCreateMenuItemsCustomizers}
      render={({ handleSubmit }) => (
        <Form
          onSubmit={() => handleSubmit()}
          className="create-menu-items-customizer-mots-form"
          fluid
        >
          <Field
            name="minimunOptionsToSelect"
            component={NumberInputWithLabel}
            min={0}
            max={optionsCount}
            label="Minimun options required to select before ordering from this combo"
            placeholder="Minimum options to select"
          />
          <Field
            name="canSelectUpto"
            component={NumberInputWithLabel}
            min={1}
            max={optionsCount}
            label="Can Select up to"
            placeholder="Minimum options to select"
          />
          <div className="create-menu-items-customizer-mots-form-btn-container">
            <Button
              label={isUpdate ? "Update Customizer" : "Create Customizer"}
              type="submit"
              icon={<AddIconCircularIcon color="#ffffff" />}
              iconPosition="end"
            />
          </div>
        </Form>
      )} />
  )
}