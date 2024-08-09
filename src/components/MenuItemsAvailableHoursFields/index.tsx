import clsx from "clsx"
import React from "react"
import { useEffect } from "react"
import { Field, WrappedFieldArrayProps } from "redux-form"
import { Col, Row } from "rsuite"
import Button from "shared/components/Button"
import CheckerSelectWithLabel from "shared/components/redux-form/CheckerSelectWithLabel"
import InputWithLabel from "shared/components/redux-form/InputWithLabel"
import AddIconCircularIcon from "shared/icons/AddIconCircularIcon"
import RemoveOutlinedIcon from "shared/icons/RemoveOutlinedIcon"

interface MenuItemsAvailableHoursFieldsProps {
  className?: string
}

export default function MenuItemsAvailableHoursFields({ fields, className }:
  WrappedFieldArrayProps<{}> & MenuItemsAvailableHoursFieldsProps) {

  useEffect(() => {
    fields.push({})
  }, [fields])

  return (
    <>
      <div className="add-available-hours-fields-btn-container">
        <Button
          label="Add Available Hours"
          icon={<AddIconCircularIcon color="#ffffff" fontSize="1.6rem" />}
          iconPosition="end"
          onClick={() => { fields.push({}) }}
        />
      </div>
      {(fields && fields.length) && fields.map((field: string, index: number) => (
        <React.Fragment key={index}>
          <Row gutter={10} className={clsx("add-menu-fields-row", className)}>
            <Col xs={24} sm={24} md={24} lg={8} xl={8} xxl={8}
              className="add-menu-fields-col">
              <Field
                name={`${field}.startTime`}
                component={InputWithLabel}
                type="time"
                label="Start Time"
                placeholder="select start time"
                formControlLabelClassName="add-menu-fields-control-label"
              />
            </Col>
            <Col xs={24} sm={24} md={24} lg={8} xl={8} xxl={8}
              key={index}
              className="add-menu-fields-col">
              <Field
                name={`${field}.endTime`}
                component={InputWithLabel}
                type="time"
                label="End Time"
                placeholder="select start time"
                formControlLabelClassName="add-menu-fields-control-label"
              />
            </Col>
            <Col xs={24} sm={24} md={24} lg={8} xl={8} xxl={8}
              key={index}
              className="add-menu-fields-col">
              <Field
                name={`${field}.appliedDays`}
                component={CheckerSelectWithLabel}
                data={[]}
                label="Applied Days"
                placeholder="Applied days"
                formControlLabelClassName="add-menu-fields-control-label"
              />
            </Col>
          </Row>
          {fields.length > 1 &&
            <div className="add-menu-fields-remove-available-hours-fields-btn-container">
              <Button
                label="Remove"
                icon={<RemoveOutlinedIcon color="#ffffff" fontSize="1.6rem" />}
                iconPosition="end"
                onClick={() => { fields.remove(index) }} />
            </div>
          }
        </React.Fragment>
      ))}
    </>

  )
}