import { BUSINESS_MODEL, RESTAURANTS_CATEGORIES } from "core/constants/restuarant"
import { EMAIL_REGEX, ISNUMBER_REGEX } from "core/helpers/validaters"

export const createRestaurantValidations = (values: any) => {
  let errors: any = {}

  if (!values.name) errors.name = "Restaurant Name is required"

  if (values.name) {
    if (values.name.length > 250) errors.name = "Restaurant name must not exceed 250 characters"
  }

  if (!values.mobileNumber) errors.mobileNumber = "Contact Number is required"

  if (values.mobileNumber) {
    if (values.mobileNumber.length > 10 || values.mobileNumber.lenght < 10) errors.mobileNumber = "Invalid Contact Number"
    if (!ISNUMBER_REGEX.test(values.mobileNumber)) errors.mobileNumber = "Invalid contact number"
  }

  if (!values.businessModel) errors.businessModel = "Business modal is required"

  if (values.businessModel) {
    if (!Object.values(BUSINESS_MODEL).includes(values.businessModel))
      errors.businessModel = "Invalid business modal"
  }

  if (!values.cuisines.length) errors.cuisines = "Cuisine is required"

  if (!values.category) errors.category = "Catgeory is required"

  if (values.category) {
    if (!Object.values(RESTAURANTS_CATEGORIES).includes(values.category))
      errors.category = "Invalid category"
  }

  if (values.email) {
    if (!EMAIL_REGEX.test(values.email)) errors.email = "Invalid Email"
  }

  return errors;
}