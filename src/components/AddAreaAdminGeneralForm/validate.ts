import { AREA_ADMIN_MAX_AGE_LIMIT, AREA_ADMIN_MINI_AGE_LIMIT } from "core/constants/Defaults"
import { GENDER } from "core/constants/roles"
import { DATE_REGEX, EMAIL_REGEX, ISNUMBER_REGEX, PAN_CARD_REGEX } from "core/helpers/validaters"

export const validate = (values: any) => {
  const errors: any = {}

  if (!values.name) errors.name = "Name is required"

  if (!values.phoneNumber) errors.phoneNumber = "Mobile Number is requried"

  if (values.phoneNumber) {
    if (values.phoneNumber.length > 10 || values.phoneNumber.length < 10)
      errors.phoneNumber = "Invalid Mobile number"

    if (!ISNUMBER_REGEX.test(values.phoneNumber))
      errors.phoneNumber = "Invalid Mobile Number"
  }

  if (!values.age) errors.age = "Age is required"

  if (values.age < AREA_ADMIN_MINI_AGE_LIMIT && values.age > AREA_ADMIN_MAX_AGE_LIMIT)
    errors.age = "Invalid age"

  if (!values.gender) errors.gender = "Gender is required"

  if (values.gender && !Object.values(GENDER).includes(values.gender)) errors.gender = "Invalid gender"

  if (!values.email) errors.email = "Email is required"

  if (!EMAIL_REGEX.test(values.email)) errors.email = "Invalid email"

  if (!values.dob) errors.dob = "Date of birth is required"

  if (!values.adhardCard)
    errors.adhardCard = "adharCard is required"

  if (values.adhardCard) {
    if (values.adhardCard.length > 12 || values.adhardCard.length < 12)
      errors.adhardCard = "Invalid AdharCard Id"
  }

  if (!ISNUMBER_REGEX.test(values.adharCard))
    errors.adharCard = "Invalid Adhar Card"

  if (!values.pancard) errors.pancard = "Pancard is required"

  if (values.pancard) {
    if (values.pancard.length > 10 || values.pancard.length < 10)
      errors.pancard = "Invalid pan card ID"
  }

  if (!PAN_CARD_REGEX.test(values.pancard)) errors.pancard = "Invalid pan card"


  return errors;
}