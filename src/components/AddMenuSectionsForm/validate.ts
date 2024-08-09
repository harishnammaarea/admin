export const validate = (values: any) => {
  const errors: any = {}
  const menuSectionsArrayErrors: any = []
  if (values.menuSections) {
    values.menuSections.forEach((menuSection: any, index: number) => {
      const menuSectionsErrors: any = {}
      if (!menuSection.name) {
        menuSectionsErrors.name = "Menu section is required"
        menuSectionsArrayErrors[index] = menuSectionsErrors
      }
    })
  }

  if (menuSectionsArrayErrors.length > 0) {
    errors.menuSections = menuSectionsArrayErrors
  }

  return errors
}
