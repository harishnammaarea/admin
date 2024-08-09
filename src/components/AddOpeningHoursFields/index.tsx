import clsx from "clsx";
import { SelectOptions } from "core/models/Options";
import { useEffect } from "react";
import { Field, WrappedFieldArrayProps } from "redux-form";
import { Col, Row } from "rsuite";
import Button from "shared/components/Button";
import CommonCard from "shared/components/CommonCard";
import CheckerSelectWithLabel from "shared/components/redux-form/CheckerSelectWithLabel";
import InputWithLabel from "shared/components/redux-form/InputWithLabel";
import AddIconCircularIcon from "shared/icons/AddIconCircularIcon";
import RemoveOutlinedIcon from "shared/icons/RemoveOutlinedIcon";

interface AddOpeningHoursProps {
  className?: string
  appliedDays:SelectOptions[]
}

export default function AddOpeningHoursFields({ fields, className,appliedDays }: WrappedFieldArrayProps<{}> & AddOpeningHoursProps) {

  useEffect(() => {
    if (!fields.length)
      fields.push({});
  }, []);

  function handleRemoveField(index: number) {
    if (fields.length > 1)
      fields.remove(index)
  }

  return (
    <CommonCard className={clsx("add-opening-hours-fields-main-container", className)}>
      <div className="add-opening-hours-fields-btn-container">
        <Button
          className="add-opening-hours-fields-add-fields-btn"
          label="Add Opening Hours"
          icon={<AddIconCircularIcon color="#ffffff" />}
          iconPosition="end"
          onClick={() => {
            fields.push({});
          }}
        />
      </div>
      {fields &&
        fields.map((openingHours: string, index: number) => (
          <div key={index}>
            <Row gutter={10} className="add-opening-hours-field-grid-row">
              <Col xxl={8} xl={8} lg={8} md={6} sm={12} xs={24}
                className="add-opening-hours-field-grid-col"
              >
                <Field
                  name={`${openingHours}.openingTime`}
                  component={InputWithLabel}
                  label="Opening Time"
                  type="time"
                  formControlLabelClassName="add-opening-hours-field-form-label"
                />
              </Col>
              <Col xxl={8} xl={8} lg={8} md={6} sm={12} xs={24}
                className="add-opening-hours-field-grid-col"
              >
                <Field
                  name={`${openingHours}.closingTime`}
                  component={InputWithLabel}
                  label="Closing Time"
                  type="time"
                  placeholder="Closing Time"
                  formControlLabelClassName="add-opening-hours-field-form-label"
                />
              </Col>
              <Col
                xxl={8} xl={8} lg={8} md={6} sm={12} xs={24}
                className="add-opening-hours-field-grid-col"
              >
                <Field
                  name={`${openingHours}.appliedDays`}
                  component={CheckerSelectWithLabel}
                  data={appliedDays}
                  formControlLabelClassName="add-opening-hours-field-form-label"
                  label="Applied Days"
                />
              </Col>
              <Col>
              </Col>
            </Row>
            {fields.length > 1 &&
              <div className="add-opening-hours-remove-field-btn">
                <Button
                  className="add-opening-hours-remove-field-btn"
                  label="Remove"
                  onClick={() => { handleRemoveField(index) }}
                  icon={<RemoveOutlinedIcon color="#ffffff" />}
                  iconPosition="end"
                />
              </div>
            }
          </div>
        ))}
    </CommonCard>
  );
}
