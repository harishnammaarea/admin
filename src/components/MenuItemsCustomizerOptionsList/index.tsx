import clsx from "clsx";
import { RESTAURANTS_CATEGORIES } from "core/constants/restuarant";
import { Table } from "rsuite";
import vegIcon from "assets/icons/veg.png"
import nonVegIcon from "assets/icons/non-veg.png";
import { MenuItemsCustomizersOptions } from "core/models/menu";
import TickCircledIcon from "shared/icons/TickCirculed";
import CancelFilledIcon from "shared/icons/CancelFilledIcon";
import { RowDataType } from "rsuite/esm/Table";

interface MenuComboOptionsListProps {
  className?: string
  data: MenuItemsCustomizersOptions[]
  showDelete?: boolean
  onUpdateOption(data: RowDataType<MenuItemsCustomizersOptions>): void
  onRemoveOption?(id: number): void
}

export default function MenuItemsCustomizerOptionsList({
  className,
  data,
  showDelete = false,
  onRemoveOption,
  onUpdateOption }: MenuComboOptionsListProps) {
  const { Column, HeaderCell, Cell } = Table;


  function handleRemoveCombo(id: number) {
    if (onRemoveOption) {
      onRemoveOption(id)
    }
  }

  function handleOnUpdateOption(data: RowDataType<MenuItemsCustomizersOptions>) {
    onUpdateOption(data)
  }

  return (
    <>
      <div className="menu-items-customizer-options-list-btn-container">
        <h1>Menu Customizers Options</h1>
      </div>
      <Table
        data={data}
        autoHeight={true}
        hover={true}
        bordered
        cellBordered
        className={clsx(className, "menu-items-customizer-options-list-common-combos-table")}>
        <Column width={200} align="center" fullText>
          <HeaderCell>ID</HeaderCell>
          <Cell dataKey="_id" />
        </Column>
        <Column width={200} align="center" fullText>
          <HeaderCell>Item</HeaderCell>
          <Cell dataKey="item" />
        </Column>
        <Column width={200} align="center" fullText>
          <HeaderCell>Quantity</HeaderCell>
          <Cell>
            {rowData => (<span>{rowData.quantity || "N/A"}</span>)}
          </Cell>
        </Column>
        <Column width={200} align="center" fullText>
          <HeaderCell>Can select up to</HeaderCell>
          <Cell dataKey="canSelectUpTo" />
        </Column>
        <Column width={200} align="center" fullText>
          <HeaderCell>Price(INR)</HeaderCell>
          <Cell dataKey="price" />
        </Column>
        <Column width={200} align="center">
          <HeaderCell>Currently Avalibale</HeaderCell>
          <Cell>
            {rowData => (
              rowData.currentlyAvaliable ?
                <TickCircledIcon color="#5449f0" /> :
                <CancelFilledIcon color="#5449f0" />
            )
            }
          </Cell>
        </Column>
        <Column width={200} align="center">
          <HeaderCell>Category</HeaderCell>
          <Cell>
            {rowData => (rowData.category === RESTAURANTS_CATEGORIES.veg ?
              <img src={vegIcon} alt="" width={20} height={20} /> :
              <img src={nonVegIcon} alt="" width={20} height={20} />)
            }
          </Cell>
        </Column>
        {showDelete &&
          <Column width={150} align="center">
            <HeaderCell>...</HeaderCell>
            <Cell>
              {rowData => (<span
                className="menu-items-customizer-options-list-common-combos-table-remove"
                onClick={() => { handleRemoveCombo(Number(rowData._id)) }}>Remove</span>)}
            </Cell>
          </Column>
        }
        <Column width={150} align="center" fixed="right">
          <HeaderCell>...</HeaderCell>
          <Cell>
            {rowData => (<span
              className="menu-items-customizer-options-list-common-combos-table-remove"
              onClick={() => { handleOnUpdateOption(rowData) }}>Update</span>)}
          </Cell>
        </Column>
      </Table>
    </>
  )
}