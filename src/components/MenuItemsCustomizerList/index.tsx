import clsx from "clsx";
import MenuComboOptionsList from "components/MenuItemsCustomizerOptionsList";
import { MenuItemsCustomizer, MenuItemsCustomizersOptions } from "core/models/menu";
import { useState } from "react";
import { Table } from "rsuite";
import { RowDataType } from "rsuite/esm/Table";
import Button from "shared/components/Button";
import CommonModal from "shared/components/CommonModal";
import AddIconCircularIcon from "shared/icons/AddIconCircularIcon";

interface MenuItemsCustomizersListProps {
  className?: string
  data: MenuItemsCustomizer[]
  onCreateMenuItemsCustomizer(): void
  onUpdateMenuItemCustomizer(customizer: RowDataType<MenuItemsCustomizer>): void
}

export default function MenuItemsCustomizerList({ className, onCreateMenuItemsCustomizer, data, onUpdateMenuItemCustomizer }: MenuItemsCustomizersListProps) {
  const { Column, HeaderCell, Cell } = Table;
  const [selectedCustomizerOption, setSelectedCustomizerOption] = useState<RowDataType<MenuItemsCustomizer> | null>(null)

  function handleCloseCustomizerOptionsModal() {
    setSelectedCustomizerOption(null)
  }

  function handleOpenCustomizerOptionModal(option: RowDataType<MenuItemsCustomizer>) {
    setSelectedCustomizerOption(option)
  }

  function handleOnUpdateCustomizerOption(data: RowDataType<MenuItemsCustomizersOptions>) {
    console.log(data)
  }

  return (
    <>
      <CommonModal size="full"
        open={!!selectedCustomizerOption}
        onClose={handleCloseCustomizerOptionsModal}>
        <MenuComboOptionsList
          onUpdateOption={handleOnUpdateCustomizerOption}
          data={selectedCustomizerOption ? selectedCustomizerOption.options : []}
        />
      </CommonModal>
      <div className="menu-items-customizer-common-combos-header-container">
        <h1>Menu Items Customizers</h1>
        <Button
          iconPosition="end"
          onClick={onCreateMenuItemsCustomizer}
          icon={<AddIconCircularIcon color="#ffffff" />}
          label="Create"
        />
      </div>
      <Table
        data={data}
        autoHeight={true}
        hover={true}
        bordered
        cellBordered
        className={clsx(className, "menu-items-customizers-common-combos-table")}>
        <Column width={200} align="center" fullText>
          <HeaderCell>ID</HeaderCell>
          <Cell dataKey="_id" />
        </Column>
        <Column width={200} align="center" fullText>
          <HeaderCell>Title</HeaderCell>
          <Cell dataKey="title" />
        </Column>
        <Column width={200} align="center" fullText>
          <HeaderCell>Options</HeaderCell>
          <Cell>
            {rowData => (<span
              onClick={() => { handleOpenCustomizerOptionModal(rowData) }}
              className="menu-items-customizers-common-combos-table-view">View</span>)}
          </Cell>
        </Column>
        <Column width={200} align="center" fullText>
          <HeaderCell>...</HeaderCell>
          <Cell>
            {rowData => (<span
              onClick={() => { onUpdateMenuItemCustomizer(rowData) }}
              className="menu-items-customizers-common-combos-table-view">Update</span>)}
          </Cell>
        </Column>
      </Table>
    </>)
}