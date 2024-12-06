import { useState } from "react"
import CreateMenuItemForm, { CreateMenuDetailsFormProps } from "./CreateMenuItemForm"
import { MenuItem, MenuItemsCustomizer, MenuSection } from "core/models/menu";
import { Cuisine } from "core/models/restaurants";
import AddMenuSections, { AddMenuSectionsFormProps } from "./AddMenuItemMenuSections";
import { RowDataType } from "rsuite/esm/Table";
import clsx from "clsx";
import CommonCard from "shared/components/CommonCard";

interface CreateMenuFormProps {
  className?: string
  cuisines: Cuisine[]
  menuSections: MenuSection
  customizers: MenuItemsCustomizer[]
  selectedMenuItem?: RowDataType<MenuItem> | null
  onCreateMenuItem(menuItem: CreateMenuDetailsFormProps, photos: File[], menuSections: AddMenuSectionsFormProps[]): void
}

export default function CreateMenuItem({
  cuisines,
  menuSections,
  selectedMenuItem,
  customizers,
  className,
  onCreateMenuItem }: CreateMenuFormProps) {
  const [formStage, setFormStage] = useState<"item" | "section">("item")
  const [menuItem, setMenuItem] = useState<CreateMenuDetailsFormProps | null>(null)
  const [menuCoverPhotos, setMenuCoverPhotos] = useState<File[]>()

  function handlePreCreateMenuItem(data: CreateMenuDetailsFormProps, images: File[]) {
    setMenuItem(data)
    setMenuCoverPhotos(images)
    setFormStage("section")
  }

  function handleOnCreateMenuItem(menuSections: AddMenuSectionsFormProps[]) {
    if (menuItem && menuCoverPhotos) {
      onCreateMenuItem(menuItem, menuCoverPhotos, menuSections)
    } else {
      return
    }
  }

  function handleGoBack() {
    setFormStage("item")
  }

  return (
    <CommonCard className={clsx("create-menu-item-main-container", className)}>
      {formStage === "item" ?
        <CreateMenuItemForm
          selectedMenuItemToUpdate={selectedMenuItem}
          onCreateMenuItem={handlePreCreateMenuItem}
          menuSections={menuSections}
          customizers={customizers}
          cuisines={cuisines} />
        :
        !selectedMenuItem && (
          <AddMenuSections
            onGoBack={handleGoBack}
            onCreateMenuItem={handleOnCreateMenuItem}
            menuSections={menuSections} />
        )
      }
    </CommonCard>
  )
}