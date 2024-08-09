import clsx from "clsx"
import UploadSinglePhoto from "components/UploadSinglePhoto"
import { Field } from "redux-form"
import { Col, Grid, Row } from "rsuite"
import CommonCard from "shared/components/CommonCard"
import defaultProfile from "assets/icons/user.png";
import InputWithLabel from "shared/components/redux-form/InputWithLabel"

interface AddRestaurantOwnerDetailsProps {
  className?: string
  onUploadOnwerPhoto(image: File | never[]): void
  url?: string
}

export default function AddRestaurantOwnerDetailsFields({ className, onUploadOnwerPhoto, url }: AddRestaurantOwnerDetailsProps) {
  function handleUploadImage(image: File | never[]) {
    onUploadOnwerPhoto(image)
  }

  return (
    <CommonCard className={clsx("add-restaurant-owner-details-fields-main-container", className)}>
      <UploadSinglePhoto defaultProfileIcon={defaultProfile}
        url={url}
        onUploadImage={handleUploadImage} />
      <Grid fluid className="add-restaurant-owner-details-fields-grid">
        <Row gutter={10} className="add-restaurant-owner-details-fields-row">
          <Col xs={24} sm={24} md={24} lg={6} xl={6} xxl={6}
            className="add-restaurant-owner-details-fields-row-col">
            <Field
              name="ownerName"
              component={InputWithLabel}
              placeholder="Ower Name"
              label="Owner Name"
              formControlLabelClassName="add-restaurant-owner-details-fields-form-control-label"
            />
          </Col>
          <Col xs={24} sm={24} md={24} lg={6} xl={6} xxl={6}
            className="add-restaurant-owner-details-fields-row-col">
            <Field
              name="ownerContactNumber"
              component={InputWithLabel}
              placeholder="Contact Number"
              label="Contact Number"
              formControlLabelClassName="add-restaurant-owner-details-fields-form-control-label"
            />
          </Col>
          <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}
            className="add-restaurant-owner-details-fields-row-col">
            <Field
              name="adharCardNo"
              component={InputWithLabel}
              placeholder="Adhar Card Number"
              label="Adhar Card Number"
              formControlLabelClassName="add-restaurant-owner-details-fields-form-control-label"
            />
          </Col>
        </Row>
        <Row gutter={10} className="add-restaurant-owner-details-fields-row">
          <Col xs={24} sm={24} md={24} lg={6} xl={6} xxl={6}
            className="add-restaurant-owner-details-fields-row-col">
            <Field
              name="ownerEmail"
              component={InputWithLabel}
              placeholder="Email"
              label="Email(Optional)"
              formControlLabelClassName="add-restaurant-owner-details-fields-form-control-label"
            />
          </Col>
        </Row>
      </Grid>
    </CommonCard>)
}