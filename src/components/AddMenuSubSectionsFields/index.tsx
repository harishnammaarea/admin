
import clsx from "clsx";
import { useEffect } from "react";
import { Field, WrappedFieldArrayProps } from "redux-form";
import { Col, Grid, Row } from "rsuite";
import Button from "shared/components/Button";
import CommonCard from "shared/components/CommonCard";
import InputWithLabel from "shared/components/redux-form/InputWithLabel";
import AddIconCircularIcon from "shared/icons/AddIconCircularIcon";

interface AddMenuSectionFieldsProps {
  className?: string
}

export default function AddMenuSectionsFields({ fields, className }: WrappedFieldArrayProps<{}> & AddMenuSectionFieldsProps) {

  useEffect(() => {
    if (!fields.length)
      fields.push({});
  }, []);

  function handleRemoveField(index: number) {
    if (fields.length > 1)
      fields.remove(index)
  }

  return (
    <CommonCard className={clsx("add-menu-sections-fields-main-container", className)}>
      <Grid className="add-menu-sections-fields-grid" fluid>
        <Row className="add-menu-sections-fields-add-section-btn-row">
          <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}
            className="add-menu-sections-fields-add-section-btn-col">
            <Button
              className="add-menu-sections-fields-add-fields-btn"
              label="Add Section"
              icon={<AddIconCircularIcon color="#ffffff" />}
              iconPosition="end"
              onClick={() => {
                fields.push({});
              }}
            />
          </Col>
        </Row>
        <Row gutter={10} className="add-menu-sections-fields-row">
          {fields &&
            fields.map((menuSections: string, index: number) => (
              <Col xxl={8} xl={8} lg={8} md={6} sm={12} xs={24}
                className="add-menu-seections-fields-col"
                key={index}>
                <Field
                  name={`${menuSections}.name`}
                  component={InputWithLabel}
                  label="Section"
                  placeholder="Enter Section"
                  formControlLabelClassName="add-menu-sections-fields-form-label"
                  icon="-"
                  onClickIcon={() => { handleRemoveField(index) }}
                />
              </Col>
            ))}
        </Row>
      </Grid>
    </CommonCard>
  );
}
