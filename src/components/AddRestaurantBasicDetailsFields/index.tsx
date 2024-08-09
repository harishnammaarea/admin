import clsx from "clsx"
import { Field } from "redux-form"
import { Col, Grid, Row } from "rsuite"
import InputWithLabel from "shared/components/redux-form/InputWithLabel"
import SelectWithlabel from "shared/components/redux-form/SelectwithLabel"
import { PHONE_NUMBER_TYPE, RESTAURANT_TYPES, WEEK_DAYS } from "core/constants/options"
import CheckerSelectWithLabel from "shared/components/redux-form/CheckerSelectWithLabel"
import CommonCard from "shared/components/CommonCard"
import { MainCourses } from "core/models/restaurants"
import defaultIcon from "assets/icons/default-image.png"
import UploadSinglePhoto from "components/UploadSinglePhoto"

interface AddRestaurantBasicDetailsFieldsProps {
  className?: string
  mainCourses: MainCourses[]
  cuisines: string[]
  onLogoUpload(file: File): void
  uploadedurl: string
}

export default function AddRestaurantBasicDetailsFields({
  className,
  mainCourses,
  cuisines,
  onLogoUpload,
  uploadedurl }: AddRestaurantBasicDetailsFieldsProps) {

  return (
    <CommonCard className={clsx("add-restaurant-basic-details-fields-main-container", className)}>
      <UploadSinglePhoto
        defaultProfileIcon={uploadedurl || defaultIcon}
        onUploadImage={onLogoUpload}
      />
      <Grid fluid className="add-restaurant-basic-details-fields-grid">
        <Row gutter={10} className="add-restaurant-basic-details-fields-row">
          <Col xxl={6} xl={6} lg={6} md={6} sm={24} xs={24}
            className="add-restaurant-basic-details-fields-col">
            <Field
              name="name"
              component={InputWithLabel}
              label="Name"
              placeholder="Restaurant Name"
              formControlLabelClassName="add-restaurant-basic-details-fields-form-control-label"
            />
          </Col>
          <Col xxl={6} xl={6} lg={6} md={6} sm={24} xs={24}
            className="add-restaurant-basic-details-fields-col">
            <Field
              name="category"
              component={SelectWithlabel}
              data={RESTAURANT_TYPES}
              label="Category"
              formControlLabelClassName="add-restaurant-basic-details-fields-form-control-label"
            />
          </Col>
          <Col xxl={6} xl={6} lg={6} md={12} sm={24} xs={24}
            className="add-restaurant-basic-details-fields-col">
            <Field
              name="contactNumber"
              component={InputWithLabel}
              label="Contact Number"
              placeholder="Enter contact number"
              formControlLabelClassName="add-restaurant-basic-details-fields-form-control-label"
            />
          </Col>
          <Col xxl={6} xl={6} lg={6} md={24} sm={24} xs={24}
            className="add-restaurant-basic-details-fields-col">
            <Field
              name="alternateContactNumber"
              component={InputWithLabel}
              label="Alternate Contact Number"
              placeholder="alternate contact number"
              helperText="eg:9073508926 or 989-25428826"
              formControlLabelClassName="add-restaurant-basic-details-fields-form-control-label"
            />
          </Col>
        </Row>
        <Row gutter={10} className="add-restaurant-basic-details-fields-row">

          <Col xxl={6} xl={6} lg={6} md={12} sm={24} xs={24}
            className="add-restaurant-basic-details-fields-col">
            <Field
              name="alternateContactNumberType"
              component={SelectWithlabel}
              data={PHONE_NUMBER_TYPE.map(type => ({ label: type, value: type }))}
              label="Alternate contact number type"
              formControlLabelClassName="add-restaurant-basic-details-fields-form-control-label"
            />
          </Col>
          <Col xxl={6} xl={6} lg={6} md={6} sm={12} xs={24}
            className="add-restaurant-basic-details-fields-col">
            <Field
              name="gstNo"
              component={InputWithLabel}
              label="GST Number"
              placeholder="Enter gst number"
              formControlLabelClassName="add-restaurant-basic-details-fields-form-control-label"
            />
          </Col>
          <Col xxl={6} xl={6} lg={6} md={6} sm={12} xs={24}
            className="add-restaurant-basic-details-fields-col">
            <Field
              name="fssaiNumber"
              component={InputWithLabel}
              label="Fssai Number"
              placeholder="Enter Fssai Number"
              formControlLabelClassName="add-restaurant-basic-details-fields-form-control-label"
            />
          </Col>
          <Col xxl={6} xl={6} lg={6} md={6} sm={24} xs={24}
            className="add-restaurant-basic-details-fields-col">
            <Field
              name="email"
              component={InputWithLabel}
              label="Email(Optional)"
              placeholder="Enter Email"
              formControlLabelClassName="add-restaurant-basic-details-fields-form-control-label"
            />
          </Col>
        </Row>
        <Row gutter={10} className="add-restaurant-basic-details-fields-row">
          <Col xxl={6} xl={6} lg={6} md={12} sm={12} xs={24}
            className="add-restaurant-basic-details-fields-col">
            <Field
              name="closedOn"
              component={CheckerSelectWithLabel}
              data={WEEK_DAYS.map((item) => ({ label: item, value: item }))}
              label="Restaurant closed on"
              formControlLabelClassName="add-restaurant-basic-details-fields-form-control-label"
            />
          </Col>
          <Col xxl={6} xl={6} lg={6} md={12} sm={12} xs={24}
            className="add-restaurant-basic-details-fields-col">
            <Field
              name="cuisines"
              component={CheckerSelectWithLabel}
              data={cuisines.map((item) => ({ label: item, value: item }))}
              label="Cuisines"
              formControlLabelClassName="add-restaurant-basic-details-fields-form-control-label"
            />
          </Col>
          <Col xxl={6} xl={6} lg={6} md={12} sm={12} xs={24}
            className="add-restaurant-basic-details-fields-col">
            <Field
              name="mainCourses"
              component={CheckerSelectWithLabel}
              data={mainCourses.map(course => ({ label: course.name, value: course.name }))}
              label="Main Courses"
              formControlLabelClassName="add-restaurant-basic-details-fields-form-control-label"
            />
          </Col>
        </Row>
      </Grid>
    </CommonCard>)
}

