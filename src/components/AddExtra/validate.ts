export const validate = (values: any) => {
  const errors: any = {};

  if (!values.name) errors.name = "Extra name is required"

  if (values.name) {
    if (values.name.length > 255)
      errors.name = "Extra name must not exceed 255 characters"
  }

  if (values.quantity) {
    if (values.quantity.length > 255)
      errors.quantity = "Quanity must not exceed 255 characters"
  }

  if (!values.price) errors.price = "Price is requried";

  if (isNaN(Number(values.price))) {
    errors.price = "Price must be a number"
  }

  if (values.price) {
    if (values.price.length > 255)
      errors.price = "Quanity must not exceed 255 characters"
  }

  if (!values.category) {
    errors.category = "Category is reqiured"
  }

  return errors;
};
