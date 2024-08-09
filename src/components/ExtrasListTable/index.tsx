import clsx from "clsx"
import { Extras } from "core/models/restaurants";
import { Table } from "rsuite"
import { RowDataType } from "rsuite/esm/Table";
import Button from "shared/components/Button";
import { ExtraFormProps } from "../AddExtra";

interface ExtrasListTableProps {
  className?: string
  data: ExtraFormProps[]
  onRemoveExtra(extraDetails: RowDataType<Extras>): void
  onUpdateExtraDetails(extraDetails: RowDataType<Extras>): void
}

export default function ExtrasListTable({ className, data, onRemoveExtra, onUpdateExtraDetails }: ExtrasListTableProps) {
  const { Column, HeaderCell, Cell } = Table;

  function handleEditExtra(extraDetails: RowDataType<Extras>) {
    onUpdateExtraDetails(extraDetails)
  }

  function hanldeRemoveExtra(extraDetails: RowDataType<Extras>) {
    onRemoveExtra(extraDetails)
  }

  return (
    <div className={clsx("extras-list-table-main-container", className)}>
      <Table
        height={223}
        data={data}
        hover={false}
        fillHeight={true}
      >
        <Column align="center" fullText>
          <HeaderCell>#</HeaderCell>
          <Cell dataKey="id" />
        </Column>
        <Column align="center" fullText>
          <HeaderCell>Name</HeaderCell>
          <Cell dataKey="name" />
        </Column>
        <Column align="center" fullText>
          <HeaderCell>Price(Rs)</HeaderCell>
          <Cell dataKey="price" />
        </Column>
        <Column align="center" fullText>
          <HeaderCell>Quantity</HeaderCell>
          <Cell dataKey="quantity" />
        </Column>
        <Column align="center" fullText>
          <HeaderCell>Category</HeaderCell>
          <Cell dataKey="category" />
        </Column>
        <Column align="center">
          <HeaderCell>...</HeaderCell>

          <Cell style={{ padding: '6px' }}>
            {rowData => (
              <Button appearance="link"
                label="Update"
                onClick={() => handleEditExtra(rowData)}
                className="extra-list-table-edit-btn" />
            )}
          </Cell>
        </Column>
        <Column align="center">
          <HeaderCell>...</HeaderCell>

          <Cell style={{ padding: '6px' }}>
            {rowData => (
              <Button appearance="link"
                label="Remove"
                className="extra-list-table-remove-btn"
                onClick={() => hanldeRemoveExtra(rowData)}
              />
            )}
          </Cell>
        </Column>
      </Table>
    </div>
  )
}