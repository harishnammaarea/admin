import clsx from "clsx"
import { useEffect, useState } from "react"
import { Field, Form as FinalForm } from "react-final-form"
import { Form } from "rsuite"
import Button from "shared/components/Button"
import InputWithLabel from "shared/components/redux-form/InputWithLabel"
import AddIconCircularIcon from "shared/icons/AddIconCircularIcon"
import { validate } from "./validate"

interface UpdateMenuSubSectionProps {
  className?: string
  data?: UpdateMenuSubSectionFormProps | null
  onCreateMenuSubSection(values: UpdateMenuSubSectionFormProps): void
  onUpdateMenuSubSection(values: UpdateMenuSubSectionFormProps): void
}

export interface UpdateMenuSubSectionFormProps {
  name: string
}

export default function UpdateMenuSubSection({ className, data, onCreateMenuSubSection, onUpdateMenuSubSection }: UpdateMenuSubSectionProps) {
  const [initialValues, setInitialValues] = useState<UpdateMenuSubSectionFormProps>({ name: "" })

  useEffect(() => {
    if (data) {
      setInitialValues({ name: data.name })
    }
  }, [data])

  function handleFormSubmit(values: UpdateMenuSubSectionFormProps) {
    onCreateMenuSubSection(values)
  }

  function handleUpdateSubSection(values: UpdateMenuSubSectionFormProps) {
      onUpdateMenuSubSection(values)
  }

  return (
    <>
      <h1>{data ? "Update Sub Section" : "Create Sub Section"}</h1>
      <FinalForm
        initialValues={{ ...initialValues }}
        validate={validate}
        onSubmit={data ? handleUpdateSubSection : handleFormSubmit}
        render={({ handleSubmit }) => (
          <Form
            fluid
            className={clsx("update-menu-sub-section-form-wrapper", className)}
            onSubmit={() => handleSubmit()}>
            <Field
              component={InputWithLabel}
              name="name"
              placeholder="Enter sub section"
              label="Name"
            />
            <div className="update-menu-sub-section-form-btn-container">
              <Button
                iconPosition="end"
                type="submit"
                icon={<AddIconCircularIcon color="#ffffff" />}
                label={data ? "Update" : "Create"} />
            </div>
          </Form>
        )}
      />
    </>
  )
}