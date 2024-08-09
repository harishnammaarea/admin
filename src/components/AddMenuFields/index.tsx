import clsx from "clsx";
import MenuItemsAvailableHoursFields from "components/MenuItemsAvailableHoursFields";
import UploadMultiplePhotosWithPreview from "components/UploadMultiplePhotos";
import { SelectOptions } from "core/models/Options";
import { Field, FieldArray } from "redux-form";
import { Col, Grid, Row } from "rsuite";
import CommonCard from "shared/components/CommonCard";
import CheckerSelectWithLabel from "shared/components/redux-form/CheckerSelectWithLabel";
import InputWithLabel from "shared/components/redux-form/InputWithLabel";
import SelectWithlabel from "shared/components/redux-form/SelectwithLabel";
import { TextArea } from "shared/components/redux-form/TextArea";

interface AddMenuFieldsProps {
  className?: string
  cuisines: SelectOptions[]
  categories: SelectOptions[]
  menuSections: SelectOptions[],
  extras: SelectOptions[]
}

export default function AddMenuFields({ className, cuisines, categories, menuSections }: AddMenuFieldsProps) {

  return (
    <CommonCard className={clsx("add-menu-fields-container", className)}>
      <UploadMultiplePhotosWithPreview onImagesToUpload={() => { }} />
      <Grid fluid className="add-menu-fields-grid">
        <Row gutter={10} className="add-menu-fields-row">
          <Col xs={24} sm={24} md={24} lg={8} xl={8} xxl={8} className="add-menu-fields-col">
            <Field
              name="name"
              component={InputWithLabel}
              label="Name"
              placeholder="Enter name..."
              formControlLabelClassName="add-menu-fields-control-label"
            />
          </Col>
          <Col xs={24} sm={24} md={24} lg={8} xl={8} xxl={8} className="add-menu-fields-col">
            <Field
              name="price"
              component={InputWithLabel}
              label="Price"
              placeholder="Enter price..."
              icon="$"
              formControlLabelClassName="add-menu-fields-control-label"
            />
          </Col>
          <Col xs={24} sm={24} md={24} lg={8} xl={8} xxl={8} className="add-menu-fields-col">
            <Field
              name="quantity"
              component={InputWithLabel}
              label="Quantity(e.g,200gms)"
              placeholder="Enter quantity..."
              formControlLabelClassName="add-menu-fields-control-label"
            />
          </Col>
        </Row>
        <Row gutter={10} className="add-menu-fields-row" >
          <Col xs={24} sm={24} md={24} lg={8} xl={8} xxl={8} className="add-menu-fields-col">
            <Field
              name="category"
              component={SelectWithlabel}
              data={categories}
              disabled={categories.length === 0}
              label="Category"
              formGroupClassName="add-menu-fields-control-label"
            />
          </Col>
          <Col xs={24} sm={24} md={24} lg={8} xl={8} xxl={8} className="add-menu-fields-col">
            <Field
              name="cuisine"
              component={SelectWithlabel}
              data={cuisines}
              label="Cuisines"
              formGroupClassName="add-menu-fields-control-label"
            />
          </Col>
          <Col xs={24} sm={24} md={24} lg={8} xl={8} xxl={8} className="add-menu-fields-col">
            <Field
              name="menuSection"
              component={SelectWithlabel}
              data={menuSections}
              label="Menu section"
              formGroupClassName="add-menu-fields-control-label"
            />
          </Col>
        </Row>
        <Row gutter={10} className="add-menu-fields-row" >
          <Col xs={24} sm={24} md={24} lg={8} xl={8} xxl={8} className="add-menu-fields-col">
            <Field
              name="extras"
              component={CheckerSelectWithLabel}
              label="Extras"
              placeholder="Select extras..."
              formControlLabelClassName="add-menu-fields-control-label"
            />
          </Col>
        </Row>
        <FieldArray
          className="add-menu-applied-hours-fields-row"
          name="availableHours"
          component={MenuItemsAvailableHoursFields} />
        <Row gutter={10} className="add-menu-fields-row" >
          <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24} className="add-menu-fields-col">
            <Field
              name="description"
              component={TextArea}
              rows={4}
              label="Description"
              placeholder="Enter quantity..."
              formControlLabelClassname="add-menu-fields-control-label"
            />
          </Col>
        </Row>
        <Row gutter={10} className="add-menu-fields-row" >
          <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24} className="add-menu-fields-col">
            <Field
              name="ingredients"
              component={TextArea}
              rows={4}
              label="Ingredients"
              placeholder="Enter quantity..."
              formControlLabelClassname="add-menu-fields-control-label"
            />
          </Col>
        </Row>
      </Grid>
    </CommonCard>)
}

