import { emailRegex, mobileNumberRegex } from "core/helpers/validaters"

const validate = (values: any) => {
  const errors: any = {}
  if (!values.ownerName)
    errors.ownerName = "owner name is required"

  if (values.ownerName) {
    if (values.ownerName.trim().length > 255)
      errors.ownerName = "owner name is must not exceed 255 characters"
  }

  if (!values.ownerContactNumber)
    errors.ownerContactNumber = "owner contact number is required"

  if (values.ownerContactNumber) {
    if (values.ownerContactNumber.trim().length > 10 || values.ownerContactNumber.trim().length < 10)
      errors.ownerContactNumber = "Invalid owner contact number"

    if (!mobileNumberRegex.test(values.ownerContactNumber))
      errors.ownerContactNumber = "Invalid owner contact number"
  }

  if (!values.adharCardNo)
    errors.adharCardNo = "Aadhar card number is required"

  if (values.adharCardNo) {
    if (values.adharCardNo.trim().length > 12 || values.adharCardNo.trim().length < 12)
      errors.adharCardNo = "Invalid aadhar card number"

    if (!mobileNumberRegex.test(values.adharCardNo))
      errors.adharCardNo = "Invalid addhar card number1"
  }

  if (values.ownerEmail) {
    if (!emailRegex.test(values.ownerEmail))
      errors.ownerEmail = "Invalid owner emailF"
  }

  return errors
}
export default validate