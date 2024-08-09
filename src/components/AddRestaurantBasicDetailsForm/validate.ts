import {
  PHONE_NUMBER_TYPE,
  RESTAURANT_TYPES,
  WEEK_DAYS,
} from "core/constants/options";
import {
  emailRegex,
  gstNoRegex,
  landlineRegex,
  mobileNumberRegex,
} from "core/helpers/validaters";

const validate = (values: any) => {
  const errors: any = {};

  if (!values.name) errors.name = "Name is required!";

  if (values.name && values.name.trim().length > 1000)
    errors.name = "Maximun characters alllowed in 1000!";

  if (!values.category) errors.category = "Restaurant Category is required!";

  if (values.category) {
    const resTypes = RESTAURANT_TYPES.map((type) => type.value);
    if (!resTypes.includes(values.category)) errors.category = "Invalid Category!";
  }

  if (!values.contactNumber) {
    errors.contactNumber = "Contact number is required!";
  }

  if (values.contactNumber) {
    if (!values.contactNumberType)
      errors.contactNumberType = "Contact number type is required";

    if (values.contactNumber.trim().length > 10 || values.contactNumber.trim().length < 10)
      errors.contactNumber = "Contact number must be of 10 digits!";

    if (!mobileNumberRegex.test(values.contactNumber))
      errors.contactNumber = "Invalid contact number";
  }

  if (values.alternateContactNumber) {
    if (
      !PHONE_NUMBER_TYPE.includes(
        values.alternateContactNumberType || !values.alternateContactNumberType
      )
    )
      errors.alternateContactNumberType =
        "Alternate contact number type is required";

    if (values.alternateContactNumberType === PHONE_NUMBER_TYPE[0]) {
      if (
        values.alternateContactNumber.trim().length > 10 ||
        values.alternateContactNumber.trim().length < 10
      )
        errors.alternateContactNumber =
          "Alternate is required please  contact number must be of 10 digits!";

      if (!mobileNumberRegex.test(values.alternateContactNumber))
        errors.alternateContactNumber = "Invalid alternate contact number";
    }

    if (values.alternateContactNumberType === PHONE_NUMBER_TYPE[1]) {
      if (
        values.alternateContactNumber.trim().length > 12 ||
        values.alternateContactNumber.trim().length < 12
      )
        errors.alternateContactNumber =
          "Alternate contact number must be of 12 digits!";

      if (!landlineRegex.test(values.alternateContactNumber))
        errors.alternateContactNumber = "Invalid alternate contact number";
    }
  }

  if (values.gstNo && values.gstNo.trim().length !== 15)
    errors.gstNo = "Invalid GST no!";

  if (values.gstNo && !gstNoRegex.test(values.gstNo)) {
    errors.gstNo = "Invalid gst no";
  }

  if (values.email && !emailRegex.test(values.email))
    errors.email = "Invalid email";

  if (!values.cuisines) errors.cuisines = "Cuisines is required!";

  if (values.cuisines && !Array.isArray(values.cuisines))
    errors.cusinies = "Cuisines is required!";

  if (values.cuisines && values.cuisines.length <= 0)
    errors.cuisines = "Cuisines is required!";

  if (values.closedOn && values.closedOn.length > 0) {
    values.closedOn.forEach((closedon: any) => {
      if (!WEEK_DAYS.includes(closedon)) {
        errors.closedOn = "Day not found!";
      }
    });
  }

  if (!values.fssaiNumber)
    errors.fssaiNumber = "Fssai number is required"

  if (values.fssaiNumber) {
    if (values.fssaiNumber.trim().length > 14 || values.fssaiNumber.trim().length < 14)
      errors.fssaiNumber = "Invalid fssai code"
  }

  return errors;
};

export default validate;
