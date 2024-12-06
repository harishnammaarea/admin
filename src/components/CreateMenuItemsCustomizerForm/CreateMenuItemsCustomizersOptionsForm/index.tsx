import clsx from "clsx"
import { Field, Form as FinalForm } from "react-final-form"
import { Col, Form, Grid, Row } from "rsuite"
import Button from "shared/components/Button"
import InputWithLabel from "shared/components/redux-form/InputWithLabel"
import SelectWithlabel from "shared/components/redux-form/SelectwithLabel"
import AddIconCircularIcon from "shared/icons/AddIconCircularIcon"
import { optionsValidations, } from "./validate"
import { RESTAURANTS_CATEGORIES } from "core/constants/restuarant"
import NumberInputWithLabel from "shared/components/redux-form/NumberInputWithLable"
import ResetIcon from "shared/icons/Reset"
import ArrowWithLineIcon from "shared/icons/ArrowWithLineIcon"
import IconButton from "shared/components/IconButton"
import { useEffect, useState } from "react"
import { MenuCategory } from "core/models/menu"

interface CreateMenuItemsCustomizersOptionsFormProps {
  className?: string
  onGoBack(): void
  optionToUpdate?: CreateMenuComboOptiosForm | null
  onFormSubmit(data: CreateMenuComboOptiosForm): void
}

export interface CreateMenuComboOptiosForm {
  item: string
  quantity: string
  price: number
  category: MenuCategory
  canSelectUpTo: number
  currentlyAvaliable: boolean
}

export default function CreateMenuItemsCustomizersOptionsForm({
  className,
  onGoBack,
  optionToUpdate,
  onFormSubmit,
}: CreateMenuItemsCustomizersOptionsFormProps) {
  const [initialValues, setInitialValues] = useState<CreateMenuComboOptiosForm>({ item: "", quantity: "", price: 0, category: "", canSelectUpTo: 1, currentlyAvaliable: true })

  useEffect(() => {
    if (optionToUpdate) {
      setInitialValues({ ...optionToUpdate })
    }
  }, [optionToUpdate])

  function handleOnOptionsFormSubmit(data: CreateMenuComboOptiosForm) {
    onFormSubmit(data)
  }

  function handleResetIfUpdate() {
    setInitialValues({
      item: "",
      quantity: "",
      price: 0,
      category: "",
      canSelectUpTo: 1,
      currentlyAvaliable: true
    })
  }

  return (
    <>
      <IconButton
        onClick={onGoBack}
        icon={<ArrowWithLineIcon fontSize="2rem" />}
      />
      <h1>Add Combo Options</h1>
      <FinalForm
        initialValues={initialValues}
        validate={optionsValidations}
        onSubmit={handleOnOptionsFormSubmit}
        render={({ handleSubmit, form }) => (
          <Form
            onSubmit={() => handleSubmit()}
            className={clsx("create-menu-items-customizer-form-options-form", className)} fluid>
            <Grid fluid>
              <Row gutter={10}>
                <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
                  <Field
                    name="item"
                    label="Item"
                    component={InputWithLabel}
                    placeholder="Item"
                  />
                </Col>
                <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
                  <Field
                    name="quantity"
                    label="Quantity"
                    component={InputWithLabel}
                    placeholder="Quantity"
                  />
                </Col>
                <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
                  <Field
                    name="price"
                    label="Price(INR)"
                    min={0}
                    max={100000}
                    component={NumberInputWithLabel}
                    placeholder="Price"
                  />
                </Col>
              </Row>
              <Row gutter={10} className="create-menu-items-customizer-form-options-form-grid-row">
                <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
                  <Field
                    name="category"
                    label="Category"
                    component={SelectWithlabel}
                    options={Object.values(RESTAURANTS_CATEGORIES).map(val => {
                      if (RESTAURANTS_CATEGORIES.both !== val) {
                        return { label: val, value: val }
                      }
                      return null
                    }).filter(Boolean)}
                    placeholder="Select"
                  />
                </Col>
                <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
                  <Field
                    name="canSelectUpTo"
                    label="Can Select up to"
                    component={NumberInputWithLabel}
                    min={1}
                    max={100}
                    placeholder="Select"
                  />
                </Col>
                <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
                  <Field
                    name="currentlyAvaliable"
                    label="Currenlty Avalibale"
                    component={SelectWithlabel}
                    options={[{ label: "true", value: true }, { label: "false", value: false }]}
                    placeholder="Select"
                  />
                </Col>
              </Row>
            </Grid>
            <div className="create-menu-items-customizer-form-options-form-btn-container">
              <Button
                label="Save Option"
                type="submit"
                icon={<AddIconCircularIcon color="#ffffff" />}
                iconPosition="end"
              />
              <Button
                label="Reset"
                onClick={() => { optionToUpdate ? handleResetIfUpdate() : form.reset() }}
                icon={<ResetIcon color="#ffffff" />}
                iconPosition="end"
              />
            </div>
          </Form>
        )}
      />
    </>
  )
}