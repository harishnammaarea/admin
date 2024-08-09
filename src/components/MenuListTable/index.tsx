import clsx from 'clsx';
import { Menus } from 'core/models/restaurants';
import { Table } from 'rsuite';

interface MenuListTableProps {
  className?: string
  menuList: Menus[]
}

export type MenuRow = {
  id: number,
  name: string
}

export default function MenuListTable({ className, menuList }: MenuListTableProps) {
  const { Column, HeaderCell, Cell } = Table;
console.log(menuList)
  return (
    <Table
      data={menuList}
      className={clsx("menu-list-table", className)}>
      <Column width={60} align="center" fixed>
        <HeaderCell>Id</HeaderCell>
        <Cell dataKey="id" />
      </Column>
      <Column width={60} align="center" fixed>
        <HeaderCell>Name</HeaderCell>
        <Cell dataKey="name" />
      </Column>
    </Table>)
}