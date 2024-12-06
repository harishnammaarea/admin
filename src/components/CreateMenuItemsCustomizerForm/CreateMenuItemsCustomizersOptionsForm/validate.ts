export const optionsValidations = (values: any) => {
  const errors: any = {}

  if (!values.item) errors.item = "Item is required"
  if (values.item) {
    if (values.item.length > 100) errors.item = "Item must not exceed 100 characters"

    if (values.quantity) {
      if (values.quantity.length > 100) errors.quantity = "Quantity must not exceed 100 characters"
    }

    if (!values.category) errors.category = "Category is required"

  }

  return errors
}