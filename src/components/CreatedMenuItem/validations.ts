const menuItemvalidations = (values: any) => {
  let errors: any = {}

  if (!values.name) errors.name = "Name is required"

  if (values.name)
    if (values.name.length > 250) errors.name = "Name must not exceed 250 characters"

  if (!values.price) errors.price = "Price is required"

  if (!values.category) errors.category = "Category is required"

  if (!values.cuisine) errors.cuisine = "Cuisine is required"

  if (values.quantity) {
    if (values.quantity.length > 100) errors.quantity = "Quantity must not exceed 100 characters"
  }

  if (values.ingredients) {
    if (values.ingredients.length > 100) errors.ingredients = "Ingredients must not exceed 25 words"
  }

  if (values.description) {
    const descriptionArray = values.description.split(" ")
    if (descriptionArray.length > 25) values.description = "Description must not exceed 25 words"
  }

  return errors
}

const menuSectionValidations = (values: any) => {
  const errors: any = {}

  if (!values.section) errors.section = "Section is required"

  return errors
}

export { menuItemvalidations, menuSectionValidations };
