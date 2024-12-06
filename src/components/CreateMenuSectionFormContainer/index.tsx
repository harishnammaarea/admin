import { useEffect, useRef, useState } from "react"
import { MenuSection } from "core/models/menu"
import { RowDataType } from "rsuite/esm/Table"
import Button from "shared/components/Button"
import { Field, Form as FinalForm } from "react-final-form"
import AddIconCircularIcon from "shared/icons/AddIconCircularIcon"
import clsx from "clsx"
import { Col, Form, Grid, Row, TagGroup, } from "rsuite"
import { createMenuSectionValidations } from "./validate"
import InputWithLabel from "shared/components/redux-form/InputWithLabel"
import CommonTag from "shared/components/CommonTag"
import { FormApi } from "final-form"
import CommonCard from "shared/components/CommonCard"

interface CreateMenuSectionFormContainerProps {
  onCreateMenuSection(values: CreateMenuSectionPayload): void
  data?: RowDataType<MenuSection> | null
  onUpdateRestaurantMenuSection?(data: UpdateMenuSectionProps): void
  className?: string
}

interface CreateMenuSectionFormProps {
  name: string
  subSectionName: string
}

export interface CreateMenuSectionPayload {
  name: string
  subSections: string[]
}

export interface UpdateMenuSectionProps {
  name: string
}

export default function CreateMenuSectionFormContainer({
  onCreateMenuSection,
  data,
  onUpdateRestaurantMenuSection,
  className }: CreateMenuSectionFormContainerProps) {
  const [subSections, setSubSections] = useState<string[]>([])
  const [initialValues, setInitialValues] = useState<CreateMenuSectionFormProps>({ name: "", subSectionName: "" })
  const formRef = useRef<FormApi | null>(null)

  useEffect(() => {
    if (data) {
    }
  }, [data])

  function handleCreateMenuSection(values: CreateMenuSectionFormProps) {
    const data = { name: values.name, subSections }
    onCreateMenuSection(data)
  }

  function handleOnUpdateMenuSection(values: CreateMenuSectionFormProps) {
    if (data && onUpdateRestaurantMenuSection) {
      onUpdateRestaurantMenuSection({ name: values.name })
    }
  }

  function handleRemoveSubSection(index: number) {
    const tempArray = [...subSections]
    tempArray.splice(index, 1)
    setSubSections([...tempArray])
  }

  function handleAddSubsection() {
    if (formRef.current) {
      const value = formRef.current.getFieldState("subSectionName")?.value
      if (value) {
        const tempArray = [...subSections]
        tempArray.push(value)
        setSubSections([...tempArray])
      }
    }
  }

  return (
    <CommonCard className={clsx("create-menu-section-form-card", className)}>
      <h1>{data ? "Update Menu Section" : "Create New Menu Section"}</h1>
      <FinalForm
        validate={createMenuSectionValidations}
        initialValues={{ ...initialValues }}
        onSubmit={(values) => { data ? handleOnUpdateMenuSection(values) : handleCreateMenuSection(values) }}
        render={({ handleSubmit, form }) => {
          formRef.current = form
          const menuSectionName = form.getFieldState("name")?.value
          const subSectionName = form.getFieldState("subSectionName")?.value
          return (
            <Form
              onSubmit={() => { handleSubmit() }}
              fluid
            >
              <Grid fluid className="create-menu-section-form-container-grid">
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                  <Row gutter={10}>
                    <Field
                      name="name"
                      placeholder="Enter the section name"
                      label="Name*"
                      component={InputWithLabel}
                    />
                  </Row>
                </Col>
                {!data &&
                  <Col
                    xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}
                    className="create-menu-section-form-container-grid-col">
                    <Row>
                      <Field
                        name="subSectionName"
                        component={InputWithLabel}
                        disabled={menuSectionName ? false : true}
                        label="Add Sub Section"
                        placeholder="Enter the sub section"
                      />
                    </Row>
                  </Col>
                }
              </Grid>
              {!data &&
                <>
                  <div className="create-menu-section-form-conatiner-sub-section-btn-container">
                    <Button
                      label="Add"
                      disabled={subSectionName ? false : true}
                      onClick={() => { handleAddSubsection() }}
                      iconPosition="end"
                      icon={<AddIconCircularIcon color="#ffffff" />}
                    />
                  </div>
                  <TagGroup className="create-menu-section-form-container-sub-section-tags-container">
                    {subSections.map((tag, index) => (
                      <CommonTag
                        onClose={() => { handleRemoveSubSection(index) }}
                        key={index}
                        tag={tag} />))}
                  </TagGroup>
                </>
              }
              <div className="create-menu-section-form-container-sub-section-btn-container">
                <Button
                  iconPosition="end"
                  type="submit"
                  label={data ? "Update Menu Section" : "Create Menu Section"}
                  icon={<AddIconCircularIcon color="#ffffff" />}
                />
              </div>
            </Form>)
        }}
      />
    </CommonCard>
  )
}