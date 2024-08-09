const validate = (values: any) => {
  const errors: any = {}

  const openingHoursArrayErrors: any = []

  if (values.openingHours && values.openingHours.length > 0) {
    values.openingHours.forEach((openingHour: any, index: number) => {
      const openingHourErrors: any = {}
      if (!openingHour.openingTime) {
        openingHourErrors.openingTime = "Opening time is required"
        openingHoursArrayErrors[index] = openingHourErrors
      }
      if (!openingHour.closingTime) {
        openingHourErrors.closingTime = "Closing time is required"
        openingHoursArrayErrors[index] = openingHourErrors
      }
      if (!openingHour.appliedDays) {
        openingHourErrors.appliedDays = "Applied days is required"
        openingHoursArrayErrors[index] = openingHourErrors
      }
    })
  }

  if (openingHoursArrayErrors.length > 0) {
    errors.openingHours = openingHoursArrayErrors
  }

  return errors
}

export default  validate