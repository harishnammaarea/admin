import clsx from "clsx";
import { COLORS } from "core/constants/color";
import UseIsMobile from "core/hooks/IsMobile";
import { MenuItem } from "core/models/menu";
import dayjs from "dayjs";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Table } from "rsuite";
import Button from "shared/components/Button";
import CommonModal from "shared/components/CommonModal";
import CommonPopover from "shared/components/CommonPopover";
import IconButton from "shared/components/IconButton";
import AddIconCircularIcon from "shared/icons/AddIconCircularIcon";
import CancelFilledIcon from "shared/icons/CancelFilledIcon";
import EditIcon from "shared/icons/Edit";
import FilterIcon from "shared/icons/Filter";
import SearchIcon from "shared/icons/Search";
import TickCircledIcon from "shared/icons/TickCirculed";

interface MenuListProps {
  className?: string
  data: MenuItem[]
  menuSectionCount: number
  restaurantId: string
  showFilters?: boolean
}

export default function MenuItemsList({ className, data, menuSectionCount, restaurantId, showFilters = true }: MenuListProps) {
  const { Column, HeaderCell, Cell } = Table;
  const isMobile = UseIsMobile()
  const [openMenusectionModal, setMenuSectionModal] = useState<boolean>(false)

  function handleViewDescription() {
    return (
      <Column width={200} align="center" fullText>
        <HeaderCell>Description</HeaderCell>
        <Cell style={{ padding: 0 }}>
          {rowData => {
            if (rowData.description) {
              return (
                <CommonPopover
                  popOverContent={
                    <span
                      className="menu-items-list-table-popover">
                      {rowData.description}
                    </span>}
                  children={<p className="menu-items-list-table-link">View</p>}
                />
              )
            } else {
              return <span>N/A</span>
            }
          }}
        </Cell>
      </Column>
    )
  }

  function handleViewIngredients() {
    return (
      <Column width={200} align="center" fullText>
        <HeaderCell>Ingredients</HeaderCell>
        <Cell style={{ padding: "-5px" }}>
          {rowData => {
            if (rowData.ingredients) {
              return (
                <CommonPopover
                  popOverContent={
                    <span
                      className="menu-items-list-table-description-popover">
                      {rowData.ingredients}
                    </span>}
                  children={<p className="menu-items-list-table-link">View</p>}
                />
              )
            } else {
              return <span>N/A</span>
            }
          }}
        </Cell>
      </Column>
    )
  }

  function handleGetFormattedDate(timeStamp: string) {
    const dateTime = dayjs(timeStamp).format('YYYY-MM-DD HH:mm:ss');
    return dateTime
  }

  function handleCloseMenuSectionModal() {
    setMenuSectionModal(false)
  }

  return (
    <>
      <CommonModal open={openMenusectionModal} onClose={handleCloseMenuSectionModal}>
        Menu section
      </CommonModal>
      <div className="menu-items-list-header-container">
        <h1>Menu Items</h1>
        <div className="menu-items-list-header-action-container">
          <Link to={`/restaurants/menu-item/create-menu-item/${restaurantId}`}>
            <Button
              disabled={!menuSectionCount}
              icon={<AddIconCircularIcon color="#ffffff" />}
              iconPosition="end"
              label="Create" />
          </Link>
          {showFilters &&
            <IconButton
              classname="menu-items-list-header-action-filter-icon-btn"
              icon={<FilterIcon fontSize="1.5rem" color={COLORS.PRIMARY_WHITE} />} />
          }
          {showFilters &&
            <IconButton
              classname="menu-items-list-header-action-filter-icon-btn"
              icon={<SearchIcon color={COLORS.PRIMARY_WHITE} />}
            />
          }
        </div>
      </div>
      <Table
        data={data}
        autoHeight={true}
        hover={true}
        bordered
        cellBordered
        className={clsx(className, "menu-items-list-table")}>
        <Column width={200} align="center" fullText>
          <HeaderCell>ID</HeaderCell>
          <Cell dataKey="_id" />
        </Column>
        <Column width={200} align="center" fullText>
          <HeaderCell>Name</HeaderCell>
          <Cell dataKey="name" />
        </Column>
        <Column width={200} align="center" fullText>
          <HeaderCell>Created At</HeaderCell>
          <Cell>
            {rowData => (handleGetFormattedDate(rowData.createdAt))}
          </Cell>
        </Column>
        <Column width={200} align="center" fullText>
          <HeaderCell>Price(INR)</HeaderCell>
          <Cell dataKey="price" />
        </Column>
        <Column width={200} align="center" fullText>
          <HeaderCell>Category</HeaderCell>
          <Cell dataKey="category" />
        </Column>
        <Column width={200} align="center" fullText>
          <HeaderCell>Cuisine</HeaderCell>
          <Cell dataKey="cuisine.name" />
        </Column>
        <Column width={200} align="center" fullText>
          <HeaderCell>Spicy</HeaderCell>
          <Cell style={{ paddingTop: "-5px" }}>
            {rowData => (<span>{rowData.isSpicy ? <TickCircledIcon color="#5449f0" /> : <CancelFilledIcon color="#5449f0" />} </span>)}
          </Cell>
        </Column>
        <Column width={200} align="center" fullText>
          <HeaderCell>Cooking Request</HeaderCell>
          <Cell style={{ paddingTop: "-5px" }}>
            {rowData => (<span>{rowData.cookingRequest ? <TickCircledIcon color="#5449f0" /> : <CancelFilledIcon color="#5449f0" />} </span>)}
          </Cell>
        </Column>
        {handleViewDescription()}
        {handleViewIngredients()}
        <Column width={200} align="center" fullText>
          <HeaderCell>Menu Sections</HeaderCell>
          <Cell style={{ paddingTop: "-5px" }}>
            {rowData => (<span className="menu-items-list-table-link">View</span>)}
          </Cell>
        </Column>
        <Column width={200} align="center" fullText>
          <HeaderCell>Photos</HeaderCell>
          <Cell style={{ paddingTop: "-5px" }}>
            {rowData => (<span className="menu-items-list-table-link">View</span>)}
          </Cell>
        </Column>
        <Column width={200} align="center" fullText>
          <HeaderCell>Customizers</HeaderCell>
          <Cell style={{ paddingTop: "-5px" }}>
            {rowData => (<span className="menu-items-list-table-link">View</span>)}
          </Cell>
        </Column>
        <Column fixed={!isMobile && "right"} width={200} align="center" fullText>
          <HeaderCell>Update(Basic Details)</HeaderCell>
          <Cell style={{ paddingTop: "-5px" }}>
            {rowData => (
              <Link to={`/restaurants/menu-item/update-basic-details/${restaurantId}/${rowData._id}`}
                className="menu-items-list-table-link">
                <IconButton icon={<EditIcon className="menu-items-table-link-edit-icon" />} />
              </Link>)}
          </Cell>
        </Column>
      </Table>
    </>
  )
}