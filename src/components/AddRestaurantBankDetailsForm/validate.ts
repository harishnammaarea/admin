import { IFSC_CODE, PAN_CARD_REGEX } from "core/helpers/validaters"

const validate = (values: any) => {
  const errors: any = {}
  if (!values.accountNumber)
    errors.accountNumber = "Account Number is required"

  if (values.accountNumber) {
    if (values.accountNumber.trim().length > 255)
      errors.accountNumber = "Account number must not exceed 255 characters"
  }

  if (!values.accountHolderName)
    errors.accountHolderName = "Account holder name is required"

  if (values.accountHolderName) {
    if (values.accountHolderName.trim().length > 255)
      errors.accountHolderName = "Account holer name must not exceed 255 characters"
  }

  if (!values.bankName)
    errors.bankName = "Bank name is required"

  if (values.bankName) {
    if (values.bankName.trim().length > 255)
      errors.bankName = "Bank name must not exceed 255 characters"
  }

  if (!values.ifscCode)
    errors.ifscCode = "IFSC code is required"

  if (values.ifscCode) {
    if (values.ifscCode.trim().length > 11 || values.ifscCode.trim().length < 11)
      errors.ifscCode = "Invalid IFSC code"

    if (!IFSC_CODE.test(values.ifscCode))
      errors.ifscCode = "Invalid IFSC code"
  }

  if (!values.branch)
    errors.branch = "Branch name is required"

  if (values.branch) {
    if (values.branch.trim().length > 255)
      errors.branch = "Branch name must not exceed 255 characters"
  }

  if (!values.bankCity)
    errors.bankCity = "Bank city is required"

  if (values.bankCity && values.bankCity.trim().length > 255)
    errors.bankCity = "City name must not exceed 255 characters"

  if (!values.bankState)
    errors.bankState = "Bank state is required"

  if (!values.pancard)
    errors.pancard = "Pancard number is required"

  if (values.pancard) {
    if (values.pancard.trim().length > 10 || values.pancard.trim().length < 10)
      errors.pancard = "Invalid pancard number"

    if (!PAN_CARD_REGEX.test(values.pancard))
      errors.pancard = "Invalid pancard number"
  }

  return errors
}

export default validate