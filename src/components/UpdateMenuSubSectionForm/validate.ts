export const validate = (values: any) => {
  const errors: any = {}

  if (!values.name) errors.name = "Name is requried"

  if (values.name) {
    if (values.name.length > 100) errors.name = "Name must not exceed 100 characters"
  }

  return errors
}
