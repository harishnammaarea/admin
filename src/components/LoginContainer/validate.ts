import { EMAIL_REGEX } from "core/helpers/validaters"

export const validate = (values:any) => {
  const errors:any={}

  if(!values.email)  errors.email="Email is required"

  if(!EMAIL_REGEX.test(values.email)) errors.email ="Invalid email ID"

  if(!values.password) errors.password="Password is required"

  return errors
}
