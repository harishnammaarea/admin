import clsx from "clsx";
import Option from "core/models/Options";
import { Field } from "redux-form";
import { Col, Grid, Row } from "rsuite";
import CommonCard from "shared/components/CommonCard";
import InputWithLabel from "shared/components/redux-form/InputWithLabel";
import SelectWithlabel from "shared/components/redux-form/SelectwithLabel";

interface AddRestaurantBankDetailsFieldsProps {
  className?: string;
  states: Option[]
}


export default function AddRestaurantBankDetailsFields({
  className,
  states
}: AddRestaurantBankDetailsFieldsProps) {
  return (
    <CommonCard className={clsx("add-restaurant-bank-details-fields-container", className)}>
      <Grid fluid className="add-restaurant-bank-details-fields-grid">
        <Row gutter={10} className="add-restaurant-bank-details-fields-row">
          <Col xs={24} sm={24} md={24} lg={6} xl={6} xxl={6}
            className="add-restaurant-bank-details-fields-row-col">
            <Field name="accountNumber"
              component={InputWithLabel}
              placeholder="Account Number"
              label="Account Number"
              formControlLabelClassName="add-restaurant-bank-details-fields-control-label" />
          </Col>
          <Col xs={24} sm={24} md={24} lg={6} xl={6} xxl={6}
            className="add-restaurant-bank-details-fields-row-col">
            <Field name="accountHolderName"
              component={InputWithLabel}
              placeholder="Account Holder Name"
              label="Account Holder Name"
              formControlLabelClassName="add-restaurant-bank-details-fields-control-label" />
          </Col>
          <Col xs={24} sm={24} md={24} lg={6} xl={6} xxl={6}
            className="add-restaurant-bank-details-fields-row-col">
            <Field name="bankName"
              component={InputWithLabel}
              placeholder="Bank Name"
              label="Bank Name"
              formControlLabelClassName="add-restaurant-bank-details-fields-control-label" />
          </Col>
          <Col xs={24} sm={24} md={24} lg={6} xl={6} xxl={6}
            className="add-restaurant-bank-details-fields-row-col">
            <Field name="ifscCode"
              component={InputWithLabel}
              placeholder="IFSC code"
              label="IFSC code"
              formControlLabelClassName="add-restaurant-bank-details-fields-control-label" />
          </Col>
        </Row>
        <Row gutter={10} className="add-restaurant-bank-details-fields-row">
          <Col xs={24} sm={24} md={24} lg={6} xl={6} xxl={6}
            className="add-restaurant-bank-details-fields-row-col">
            <Field name="branch"
              component={InputWithLabel}
              placeholder="Branch"
              label="Branch"
              formControlLabelClassName="add-restaurant-bank-details-fields-control-label" />
          </Col>
          <Col xs={24} sm={24} md={24} lg={6} xl={6} xxl={6}
            className="add-restaurant-bank-details-fields-row-col">
            <Field
              name="bankCity"
              component={InputWithLabel}
              placeholder="City"
              label="City"
              formControlLabelClassName="add-restaurant-bank-details-fields-control-label" />
          </Col>
          <Col xs={24} sm={24} md={24} lg={6} xl={6} xxl={6}
            className="add-restaurant-bank-details-fields-row-col">
            <Field
              name="bankState"
              component={SelectWithlabel}
              data={states}
              placeholder="State"
              label="State"
              formControlLabelClassName="add-restaurant-bank-details-fields-control-label" />
          </Col>
          <Col xs={24} sm={24} md={24} lg={6} xl={6} xxl={6}
            className="add-restaurant-bank-details-fields-row-col">
            <Field name="pancard"
              component={InputWithLabel}
              placeholder="Pancard"
              label="Pancard"
              helperText="e.g,ABCPD1234C"
              formControlLabelClassName="add-restaurant-bank-details-fields-control-label" />
          </Col>
        </Row>
      </Grid>
    </CommonCard>
  );
}
