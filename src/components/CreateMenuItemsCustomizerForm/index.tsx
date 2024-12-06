import clsx from "clsx"
import { useEffect, useState } from "react"
import { Field, Form as FinalForm } from "react-final-form"
import { Col, Form, Grid, Row } from "rsuite"
import Button from "shared/components/Button"
import InputWithLabel from "shared/components/redux-form/InputWithLabel"
import { validate } from "./validate"
import ArrowWithLineIcon from "shared/icons/ArrowWithLineIcon"
import CommonModal from "shared/components/CommonModal"
import { RowDataType } from "rsuite/esm/Table"
import { MenuItemsCustomizer, MenuItemsCustomizersOptions } from "core/models/menu"
import CreateMenuItemsCustomizersOptionsForm, { CreateMenuComboOptiosForm } from "components/CreateMenuItemsCustomizerForm/CreateMenuItemsCustomizersOptionsForm"
import CreateMenuItemsCustomizerConfirmForm from "./CreateMenuItemsCutsomerizerConfirmForm"
import SelectWithlabel from "shared/components/redux-form/SelectwithLabel"
import { SelectOptions } from "core/models/Options"
import MenuItemsCustomizerOptionsList from "components/MenuItemsCustomizerOptionsList"

interface CreateMenuComboFormProps {
  className?: string
  onCreateMenuItemsCustomizer(values: CreateMenuComboFormMainDetails & { options: CreateMenuComboOptiosForm[] }): void
  onUpdateMenuItemsCustomizer(values: CreateMenuComboFormMainDetails & { options: CreateMenuComboOptiosForm[] }): void
  customizerToUpdate?: RowDataType<MenuItemsCustomizer> | null
  customizerTypes: SelectOptions[]
}

export interface CreateMenuComboFormMainDetails {
  title: string
  minimunOptionsToSelect: number
  canSelectUpto: number
  type: "items" | "quantity"
}

export default function CreateMenuItemsCustomizerForm({ className, onCreateMenuItemsCustomizer, customizerToUpdate, customizerTypes, onUpdateMenuItemsCustomizer }: CreateMenuComboFormProps) {
  const [mainDetailsInitialValues, setMainDetailsInitialValues] = useState<CreateMenuComboFormMainDetails>({ title: "", minimunOptionsToSelect: 0, canSelectUpto: 1, type: "items" })
  const [selectedOptionToUpdate, setSelectedOptionToUpdate] = useState<MenuItemsCustomizersOptions | null>(null)
  const [customizerOptions, setCustomizerOptions] = useState<MenuItemsCustomizersOptions[]>([])
  const [currentForm, setCurrentForm] = useState<"basicDetails" | "options">("basicDetails")
  const [confirmSubmitModal, setConfirmSubmitModal] = useState<boolean>(false)

  useEffect(() => {
    if (customizerToUpdate) {
      setMainDetailsInitialValues({
        title: customizerToUpdate.title,
        minimunOptionsToSelect: customizerToUpdate.minimunOptionsToSelect,
        canSelectUpto: customizerToUpdate.canSelectUpto,
        type: customizerToUpdate.type
      })

      setCustomizerOptions([...customizerToUpdate.options])
    }
  }, [customizerToUpdate])

  function handleOnFormSubmit(values: CreateMenuComboFormMainDetails) {
    setCurrentForm("options")
    setMainDetailsInitialValues(values)
  }

  function handleOnOptionsFormSubmit(values: CreateMenuComboOptiosForm) {
    const tempArray = [...customizerOptions]
    if (selectedOptionToUpdate) {
      const { _id } = selectedOptionToUpdate;
      const matchedIndex = customizerOptions.findIndex(value => _id === value._id)

      const updatedObject = {
        ...tempArray[matchedIndex],
        ...values
      };
      tempArray[matchedIndex] = updatedObject;
      setCustomizerOptions(tempArray)
    } else {
      tempArray.push({ ...values, _id: (tempArray.length + 1).toString() })
      setCustomizerOptions(tempArray)
    }
  }

  function handleGoBack() {
    setCurrentForm("basicDetails")
  }

  function handleRemoveCustomizerOption(index: number) {
    const tempArray = [...customizerOptions]
    tempArray.splice(index - 1, 1)
    setCustomizerOptions(tempArray)
  }

  function handleConfirmSubmitModal() {
    setConfirmSubmitModal(true)
  }

  function handleOnCreateMenuItemsCustomizer(values: CreateMenuComboFormMainDetails) {
    const data = {
      ...mainDetailsInitialValues,
      minimunOptionsToSelect: Number(values.minimunOptionsToSelect),
      canSelectUpTo: Number(values.canSelectUpto),
      options: customizerOptions.map(values => {
        const { _id, ...rest } = values
        return {
          ...rest,
          canSelectUpTo: Number(values.canSelectUpTo),
          price: Number(values.price)
        }
      })
    }

    if (customizerToUpdate) {
      onUpdateMenuItemsCustomizer(data)
    }
    else {
      onCreateMenuItemsCustomizer(data)
    }

    setConfirmSubmitModal(false)
  }

  function handleOnUpdateOption(data: RowDataType<MenuItemsCustomizersOptions>) {
    setSelectedOptionToUpdate({
      _id: data._id,
      item: data.item,
      category: data.category,
      canSelectUpTo: data.canSelectUpTo,
      price: data.price,
      quantity: data.quantity,
      currentlyAvaliable: data.currentlyAvaliable
    })
  }

  function handleCreateMenuItemsCustomizerForm() {
    return (
      <>
        <h1>Create A Menu Items Customizer</h1>
        <FinalForm
          onSubmit={handleOnFormSubmit}
          initialValues={mainDetailsInitialValues}
          validate={validate}
          render={({ handleSubmit }) => (
            <Form className={clsx("create-menu-items-customizer-form-container", className)}
              fluid onSubmit={() => { handleSubmit() }}>
              <Grid fluid>
                <Row gutter={10}>
                  <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
                    <Field
                      name="title"
                      label="Title"
                      component={InputWithLabel}
                      placeholder="Title"
                    />
                  </Col>
                  <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
                    <Field
                      name="type"
                      label="Customizer Type"
                      component={SelectWithlabel}
                      options={customizerTypes}
                      placeholder="Customizer Type"
                    />
                  </Col>
                </Row>
              </Grid>
              <div className="create-menu-items-customizer-form-save-btn-container">
                <Button
                  label="Next"
                  type="submit"
                  icon={<ArrowWithLineIcon color="#ffffff" rotate={180} />}
                  iconPosition="end"
                />
              </div>
            </Form>
          )}
        />
      </>
    )
  }

  return (
    <>
      {currentForm === "basicDetails" && handleCreateMenuItemsCustomizerForm()}
      {currentForm === "options" &&
        <>
          <CreateMenuItemsCustomizersOptionsForm
            optionToUpdate={selectedOptionToUpdate}
            onFormSubmit={handleOnOptionsFormSubmit}
            onGoBack={handleGoBack}
          />
          <MenuItemsCustomizerOptionsList
            onUpdateOption={handleOnUpdateOption}
            onRemoveOption={handleRemoveCustomizerOption}
            showDelete={!customizerToUpdate}
            data={
              customizerOptions
            } />
          {customizerOptions.length > 0 &&
            <div className="create-menu-items-customizer-form-options-create-form-btn-container">
              <Button
                icon={<ArrowWithLineIcon rotate={180} color="#ffffff" />}
                iconPosition="end"
                label="Next"
                onClick={handleConfirmSubmitModal}
              />
            </div>
          }
        </>
      }
      <CommonModal
        size="md"
        open={confirmSubmitModal}
        onClose={() => { setConfirmSubmitModal(false) }} >
        <CreateMenuItemsCustomizerConfirmForm
          isUpdate={!!customizerToUpdate}
          optionsCount={customizerOptions.length}
          minimunOptionsToSelect={mainDetailsInitialValues.minimunOptionsToSelect}
          canSelectUpto={mainDetailsInitialValues.canSelectUpto}
          onCreateCustomizer={handleOnCreateMenuItemsCustomizer}
        />
      </CommonModal>
    </>
  )
}