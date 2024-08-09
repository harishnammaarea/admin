import clsx from "clsx";
import CommonCard from "shared/components/CommonCard";
import EmptyIcon from "assets/illus/empty.png";
import Button from "shared/components/Button";
import AddIconCircularIcon from "shared/icons/AddIconCircularIcon";
import MenuListTable, { MenuRow } from "components/MenuListTable";
import CommonModal from "shared/components/CommonModal";
import AddMenuForm from "components/AddMenuForm";
import { useState } from "react";
import { SelectOptions } from "core/models/Options";
import { Menus } from "core/models/restaurants";

interface MenuListProps {
  className?: string
  menuList: Menus[]
  category: SelectOptions[]
  cuisines: SelectOptions[]
  menuSections: SelectOptions[]
  extras: SelectOptions[]
  count: number
}

export default function MenuList({ className, menuList }: MenuListProps) {
  const [openModal, setOpenModal] = useState<boolean>(false)

  function handleOpenModal() {
    setOpenModal(true)
  }
  console.log(menuList)
  return (
    <>
      <CommonModal size="full" open={openModal} onClose={() => { setOpenModal(false) }}>
        <AddMenuForm />
      </CommonModal>
      <div className={clsx("menu-list-container", className)}>
        {menuList.length > 0 ?
          <>
            <div className="menu-list-add-menu-item-btn-container">
              <Button label="Add Menu Item"
                icon={<AddIconCircularIcon color="#ffffff" fontSize="1.6rem" />}
                iconPosition="end"
                onClick={handleOpenModal}
              />
            </div>
            <MenuListTable
              menuList={menuList}
              className="menu-list-component-table" />
          </>
          :
          <CommonCard className="menu-list-empty-card">
            <img src={EmptyIcon} width={200} height={200} alt="" />
            <h3>Unfortunately, there are no items on the menu at the moment.</h3>
            <Button
              label="Add Menu"
              icon={<AddIconCircularIcon color="#ffffff" fontSize="1.6rem" />}
              iconPosition="end"
            />
          </CommonCard>
        }
      </div>
    </>
  )
}