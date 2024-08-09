import { mobileNumberRegex } from "core/helpers/validaters";

export const validate = (values: any) => {
  const errors: any = {}

  if (!values.buildingNo) errors.buildingNo = "Building number is required";

  if (values.buildingNo) {
    if (values.buildingNo.length > 100)
      errors.buildingNo =
        "Maximun characters allowed for a building number is 100";
  }

  if (!values.addressLineOne)
    errors.addressLineOne = "Address line  is required";

  if (values.addressLineOne) {
    if (values.addressLineOne.trim().length > 1000)
      errors.addressLineOne =
        "Maximum characters allowed for a address line is 1000";
  }

  if (!values.area) errors.area = "Area is required";

  if (!values.pincode) errors.pincode = "Pincode is required";

  if (values.pincode) {
    if (values.pincode.length > 6 || values.pincode < 6)
      errors.pincode = "Invalid pincode";

    if (!mobileNumberRegex.test(values.pincode))
      errors.pincode = "Invalid pincode";
  }

  return errors
}