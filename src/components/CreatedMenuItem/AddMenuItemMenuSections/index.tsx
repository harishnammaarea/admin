import clsx from "clsx";
import { Col, Form, Grid, Row, Table } from "rsuite";
import { Field, Form as FinalForm } from "react-final-form";
import Button from "shared/components/Button";
import SelectWithlabel from "shared/components/redux-form/SelectwithLabel";
import AddIconCircularIcon from "shared/icons/AddIconCircularIcon";
import { MenuSection } from "core/models/menu";
import { useState } from "react";
import { RowDataType } from "rsuite/esm/Table";
import IconButton from "shared/components/IconButton";
import BackIcon from "shared/icons/BackIcon";
import { menuSectionValidations } from "../validations";

interface AddMenuSectionsProps {
  className?: string
  menuSections: MenuSection
  onGoBack(): void
  onCreateMenuItem(menuSections: AddMenuSectionsFormProps[]): void
  
}

export interface AddMenuSectionsFormProps {
  section: string,
  subSection?: string
}

interface AddMenuSecitonsTableProps {
  _id: string,
  name: string,
  subSectionId: string,
  subSectionTitle: string
}

export default function AddMenuItemMenuSections({ className, menuSections, onCreateMenuItem, onGoBack }: AddMenuSectionsProps) {
  const { Column, HeaderCell, Cell } = Table;
  const [selectedMenuSections, setSelectedMenuSecitons] = useState<AddMenuSecitonsTableProps[]>([])

  function handleOnCreateMenuItem() {
    onCreateMenuItem(selectedMenuSections.map(section => ({ section: section._id, subSection: section.subSectionId })))
  }

  function handleFormSubmit(formData: AddMenuSectionsFormProps) {
    const tempArray: AddMenuSecitonsTableProps[] = [...selectedMenuSections]
    const matchIndex = tempArray.findIndex(value => value._id === formData.section)
    if (matchIndex !== -1) {
      tempArray.splice(matchIndex, 1)
    }

    const matchedSection = menuSections.sections.find(section => section._id === formData.section)
    if (matchedSection) {
      tempArray.push({
        _id: matchedSection._id,
        name: matchedSection.name,
        subSectionId: formData.subSection || "",
        subSectionTitle: matchedSection.subSections.find(subSection => subSection._id === formData.subSection)?.name || ""
      })
    }

    setSelectedMenuSecitons([...tempArray])
  }

  function handleRemoveMenuSection(rowData: RowDataType<AddMenuSecitonsTableProps>) {
    const tempArray = [...selectedMenuSections]
    const matchedIndex = tempArray.findIndex(section => section._id === rowData._id)
    tempArray.splice(matchedIndex, 1)
    setSelectedMenuSecitons([...tempArray])
  }

  function handleSelectSubSecitonView(id: string) {
    const matchedSection = menuSections.sections.find(section => id === section._id)
    return (
      <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
        <Field
          name="subSection"
          component={SelectWithlabel}
          disabled={!matchedSection?.subSections.length}
          options={matchedSection ? matchedSection.subSections.map(value => ({ label: value.name, value: value._id })) : []}
          placeholder="Select"
          label="Section"
        />
      </Col>
    )
  }

  return (
    <>
      <div className="add-menu-item-menu-section-back-container">
        <IconButton onClick={onGoBack} icon={<BackIcon fontSize="2.2rem" />} />
      </div>
      <FinalForm
        validate={menuSectionValidations}
        initialValues={{ section: "", subSection: "" }}
        onSubmit={handleFormSubmit}
        render={({ handleSubmit, values }) => {
          return (
            <Form
              className={clsx("add-menu-item-menu-section", className)}
              fluid onSubmit={() => { handleSubmit() }}>
              <Grid fluid>
                <Row gutter={10}>
                  <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
                    <Field
                      name="section"
                      component={SelectWithlabel}
                      options={menuSections.sections.map(value => ({ label: value.name, value: value._id }))}
                      placeholder="Select"
                      label="Section"
                    />
                  </Col>
                  {handleSelectSubSecitonView(values.section)}
                </Row>
              </Grid>
              <div className="create-menu-item-form-save-btn-container">
                <Button
                  label="Add"
                  type="submit"
                  icon={<AddIconCircularIcon color="#ffffff" fontSize="1.6rem" />}
                  iconPosition="end"
                />
              </div>
            </Form>
          )
        }}
      >
      </FinalForm>
      <h1>Selected Menu Sections</h1>
      <Table
        data={selectedMenuSections}
        autoHeight={true}
        hover={true}
        bordered
        cellBordered
        className={clsx(className, "add-menu-sections-table")}>
        <Column width={200} align="center" fullText>
          <HeaderCell>Main Section ID</HeaderCell>
          <Cell dataKey="_id" />
        </Column>
        <Column width={200} align="center" fullText>
          <HeaderCell>Title</HeaderCell>
          <Cell dataKey="name" />
        </Column>
        <Column width={200} align="center" fullText>
          <HeaderCell>Sub Section ID</HeaderCell>
          <Cell dataKey="subSectionId" />
        </Column>
        <Column width={200} align="center" fullText>
          <HeaderCell>Title</HeaderCell>
          <Cell dataKey="subSectionTitle" />
        </Column>
        <Column width={200} align="center" fullText>
          <HeaderCell>...</HeaderCell>
          <Cell>
            {rowData => (
              <span
                onClick={() => { handleRemoveMenuSection(rowData) }}
                className="add-menu-sections-remove-menu-item-cell">
                Remove
              </span>)}
          </Cell>
        </Column>
      </Table>
      <div className="create-menu-item-form-create-menu-item-btn-container">
        <Button
          disabled={!selectedMenuSections.length}
          label="Create Menu Item"
          type="button"
          onClick={handleOnCreateMenuItem}
          icon={<AddIconCircularIcon color="#ffffff" fontSize="1.6rem" />}
          iconPosition="end"
        />
      </div>
    </>
  )
}