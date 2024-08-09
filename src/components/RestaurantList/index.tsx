import clsx from "clsx";
import { RestaurantDetails } from "core/models/restaurants";
import { Link } from "react-router-dom";
import { Table } from "rsuite";

interface RestaurantListProps {
  className?: string
  data: RestaurantDetails[]
}

export default function RestaurantList({ className, data }: RestaurantListProps) {
  const { Column, HeaderCell, Cell } = Table;

  return (
    <Table
      data={data}
      autoHeight={true}
      hover={true}
      virtualized
      className={clsx("restaurant-list-table-container", className)}
    >
      <Column align="center" fullText>
        <HeaderCell>Id</HeaderCell>
        <Cell dataKey="id" />
      </Column>
      <Column align="center" fullText>
        <HeaderCell>Name</HeaderCell>
        <Cell dataKey="name" />
      </Column>
      <Column align="center" fullText>
        <HeaderCell>Contact Number</HeaderCell>
        <Cell dataKey="contactNumber" />
      </Column>
      <Column>
        <HeaderCell align="center">...</HeaderCell>

        <Cell align="center">
          {rowData => (
            <Link to="">
              View
            </Link>
          )}
        </Cell>
      </Column>

      <Column>
        <HeaderCell align="center">...</HeaderCell>

        <Cell align="center">
          {rowData => {
            return (
              <Link to={`/admin/restaurants/edit-restaurant-basic-details/${rowData.id}`}>
                Edit
              </Link>
            )
          }}
        </Cell>
      </Column>
    </Table>
  )
}