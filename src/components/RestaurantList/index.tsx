import clsx from "clsx";
import { COLORS } from "core/constants/color";
import { Restaurants } from "core/models/restaurants";
import { Link } from "react-router-dom";
import { Table } from "rsuite";
import EditIcon from "shared/icons/Edit";
import ViewIcon from "shared/icons/ViewIcon";

interface RestaurantListProps {
  className?: string
  data: Restaurants[]
}

export default function RestaurantList({ className, data }: RestaurantListProps) {
  const { Column, HeaderCell, Cell, } = Table;

  const ImageCell = ({ rowData, dataKey, ...props }: any) => (
    <Cell {...props} style={{ padding: "2px" }}>
      <div
        className="restaurant-list-table-logo-container"
      >
        <img src={rowData.logo} width="40" alt="" />
      </div>
    </Cell>
  );

  return (
    <>
      <Table
        data={data}
        autoHeight={true}
        hover={true}
        wordWrap={true}
        className={clsx("restaurant-list-table-container", className)}
      >
        <Column align="center" fullText>
          <HeaderCell>{""}</HeaderCell>
          <ImageCell dataKey="logo" />
        </Column>
        <Column align="center" fullText>
          <HeaderCell>ID</HeaderCell>
          <Cell dataKey="_id" />
        </Column>
        <Column width={150} align="center" fullText>
          <HeaderCell>Name</HeaderCell>
          <Cell dataKey="name" />
        </Column>
        <Column width={150} align="center" fullText>
          <HeaderCell>Contact Number</HeaderCell>
          <Cell dataKey="mobileNumber" />
        </Column>
        <Column align="center" fullText>
          <HeaderCell>Email</HeaderCell>
          <Cell dataKey="email" />
        </Column>
        <Column align="center" fullText width={150}>
          <HeaderCell>Total Outlets</HeaderCell>
          <Cell dataKey="outletCount" />
        </Column>
        <Column align="center" fullText width={200}>
          <HeaderCell>Total Menu Sections</HeaderCell>
          <Cell dataKey="menuSectionsCount" />
        </Column>
        <Column width={150}>
          <HeaderCell align="center">...</HeaderCell>
          <Cell align="center" >
            {rowData => (
              <Link to={`/restaurants/menu-sections/${rowData._id}`}
                className="restaurant-list-table-add-menu-items-link">
                View Menu Sections
              </Link>
            )}
          </Cell>
        </Column>
        <Column width={150}>
          <HeaderCell align="center">...</HeaderCell>
          <Cell align="center" >
            {rowData => (
              <Link to={`restaurants/menu-items/${rowData._id}`}
                className="restaurant-list-table-add-menu-items-link">
                View Menu Items
              </Link>
            )}
          </Cell>
        </Column>
        <Column>
          <HeaderCell align="center">...</HeaderCell>
          <Cell align="center" >
            {rowData => (
              <Link to={``}
                className="restaurant-list-table-add-menu-items-link"
              >
                Create Outlet
              </Link>
            )}
          </Cell>
        </Column>
        <Column>
          <HeaderCell align="center">...</HeaderCell>
          <Cell align="center" >
            {rowData => (
              <Link to={`/restaurants/view-restaurants/${rowData._id}`}>
                <ViewIcon fontSize="2.4rem" color={COLORS.PRIMARY_COLOR} />
              </Link>
            )}
          </Cell>
        </Column>
        <Column>
          <HeaderCell align="center">...</HeaderCell>
          <Cell align="center" >
            {rowData => (
              <Link to={`/restaurants/update-restaurant/${rowData._id}`}>
                <EditIcon fontSize="1.8rem"  color={COLORS.PRIMARY_COLOR}/>
              </Link>
            )}
          </Cell>
        </Column>
      </Table>
    </>
  )
}