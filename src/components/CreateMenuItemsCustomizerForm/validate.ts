export const validate = (values: any) => {
  const errors: any = {}
  if (!values.title) errors.title = "Title is required"

  if (values.title) {
    if (values.title.length > 100) errors.title = "Title must not exceed 100 characters"
  }
  
  return errors
}
