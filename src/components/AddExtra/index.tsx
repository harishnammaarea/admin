import clsx from "clsx";
import { Field, InjectedFormProps, reduxForm } from "redux-form";
import { Col, Form, Grid, Row } from "rsuite";
import Button from "shared/components/Button";
import CommonCard from "shared/components/CommonCard";
import InputWithLabel from "shared/components/redux-form/InputWithLabel";
import SelectWithlabel from "shared/components/redux-form/SelectwithLabel";
import { validate } from "./validate";
import { useEffect } from "react";
import { SelectOptions } from "core/models/Options";

interface AddExtraProps {
  className?: string
  onAddExtraDetails(details: ExtraFormProps): void
  edit?: boolean
  extraDetails?: ExtraFormProps | null
  categories: SelectOptions[]
}

export interface ExtraFormProps {
  name: string,
  quantity: string
  price: string | number
  category?: string
}

type FinalProps = InjectedFormProps<ExtraFormProps, AddExtraProps> & AddExtraProps

function AddExtra({
  className,
  handleSubmit,
  onAddExtraDetails,
  edit,
  extraDetails,
  categories,
  initialize,
  dirty }: FinalProps) {

  function handleExtraSubmit(values: ExtraFormProps) {
    onAddExtraDetails(values)
  }

  useEffect(() => {
    if (edit && extraDetails) {
      initialize({ ...extraDetails })
    }
  }, [initialize, edit, extraDetails])

  return (
    <CommonCard className={clsx("add-extra-container", className)}>
      <Form onSubmit={handleSubmit(handleExtraSubmit)}>
        <Grid fluid className="add-extra-grid">
          <Row gutter={10} className="add-extra-row">
            <Col xs={24} sm={24} md={24} lg={6} xl={6} xxl={6} className="add-extra-col">
              <Field
                name="name"
                component={InputWithLabel}
                label="Name"
                placeholder="Enter Name..."
                formControlLabelClassName="add-extra-control-label"
              />
            </Col>
            <Col xs={24} sm={24} md={24} lg={6} xl={6} xxl={6} className="add-extra-col">
              <Field
                name="quantity"
                component={InputWithLabel}
                label="Quantity(e.g,200gms)"
                placeholder="Enter quantity..."
                formControlLabelClassName="add-extra-control-label"
              />
            </Col>
            <Col xs={24} sm={24} md={24} lg={6} xl={6} xxl={6} className="add-extra-col">
              <Field
                name="price"
                component={InputWithLabel}
                label="Price"
                placeholder="Enter Price..."
                formControlLabelClassName="add-extra-control-label"
                icon="$"
              />
            </Col>
            {categories.length !== 0 &&
              <Col xs={24} sm={24} md={24} lg={6} xl={6} xxl={6} className="add-extra-col">
                <Field
                  name="category"
                  component={SelectWithlabel}
                  disabled={categories.length === 0}
                  data={categories}
                  label="Category"
                  placeholder="Enter Category..."
                  formControlLabelClassName="add-extra-control-label"
                />
              </Col>
            }
          </Row>
        </Grid>
        <div className="add-extra-save-btn-container">
          <Button label={edit ? "Update" : "Save"} type="submit" disabled={!dirty} />
        </div>
      </Form>
    </CommonCard>)
}


export default reduxForm<ExtraFormProps, AddExtraProps>({
  form: "extraForm",
  validate
})(AddExtra)

