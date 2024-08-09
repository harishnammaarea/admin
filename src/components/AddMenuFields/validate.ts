import { ISNUMBER_REGEX } from "core/helpers/validaters";

export const validate = (values: any) => {
  const errors: any = {};

  if (!values.name) errors.name = "Name is required";

  if (values.name) {
    if (values.name.length > 255)
      errors.name = "Name must not exceed 255 characters";
  }

  if (!values.price) errors.price = "Price is required";

  if (values.price) {
    if (values.price.length > 10)
      errors.price = "Price must not exceed 10 characters ";

    if (!ISNUMBER_REGEX.test(values.price))
      errors.price = "Price must be a number";
  }

  if (values.quantity) {
    if (values.quantity.length > 255)
      errors.quantity = "Quantity must not exceed 255 characters";
  }

  if (values.description) {
    const wordCount = values.description.split(" ").length;
    if (wordCount > 100) {
      errors.description = "Description must not exceed 100 words";
    }
  }

  if (!values.menuSection) {
    errors.menuSection = "Menu sections is required"
  }

  return errors;
};
