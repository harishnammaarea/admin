export const createMenuSectionValidations = (values: any) => {
  const errors: any = {}

  if (!values.name) errors.name = "Menu Section Name is required"
  if (values.name) {
    if (values.name.length > 100) errors.name = "Menu Section name must not exceed 100 characters "
  }

  if (values.subSectionName) {
    if (values.subSectionName.length > 100) errors.subSectionName = "Sub Section Name is must not exceed 100 characters"
  }

  return errors
}