import clsx from "clsx";
import { Form } from "rsuite";
import { InjectedFormProps, reduxForm } from "redux-form";
import AddMenuFields from "components/AddMenuFields";
import Button from "shared/components/Button";
import AddIconCircularIcon from "shared/icons/AddIconCircularIcon";
import { validate } from "components/AddMenuFields/validate";

export interface AddMenuDetailsFormProps {
  name: string
  price: string
  quantity: string
  category: string
  cuisine: string
  description: string
  menuSection: string
}

type FinalProps = InjectedFormProps<AddMenuDetailsFormProps, AddMenuFormProps> & AddMenuFormProps

interface AddMenuFormProps {
  className?: string;
}

function AddMenuForm({ className, handleSubmit }: FinalProps) {

  function handleFormSubmit(values: AddMenuDetailsFormProps) {
    console.log(values)
  }

  return (
    <Form fluid className={clsx("add-menu-form", className)} onSubmit={handleSubmit(handleFormSubmit)}>
      <AddMenuFields
        cuisines={[]}
        menuSections={[]}
        categories={[]}
        extras={[]}
        className="add-menu-form-add-menu-fields"
      />
      <div className="add-menu-form-save-btn-container">
        <Button
          label="Save"
          type="submit"
          icon={<AddIconCircularIcon color="#ffffff" fontSize="1.6rem" />}
          iconPosition="end"
        />
      </div>
    </Form>
  );
}

export default reduxForm < AddMenuDetailsFormProps, AddMenuFormProps > ({
  form: "add-menu-form",
  validate
})(AddMenuForm)