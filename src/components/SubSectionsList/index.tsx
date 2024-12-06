import clsx from "clsx";
import { SubSection } from "core/models/menu";
import { Link } from "react-router-dom";
import { Table } from "rsuite";
import Button from "shared/components/Button";
import AddIconCircularIcon from "shared/icons/AddIconCircularIcon";

interface SubSectionListProps {
  className?: string
  data: SubSection[]
  mainSection: string
  sectionId: string
}

export default function SubSectionsList({ className, data, mainSection, sectionId }: SubSectionListProps) {
  const { Column, HeaderCell, Cell } = Table;

  return (
    <>
      <div className={clsx(className, "sub-section-list-create-wrapper")}>
        <h1>{mainSection} Sub Sections</h1>
        <Link to={`/restaurants/menu-section/create/${sectionId}`} className={clsx("sub-section-list-create-btn-container")}>
          <Button
            label="Create"
            icon={
              <AddIconCircularIcon
                color="#ffffff" />
            }
            iconPosition="end"
          />
        </Link>
        <Table
          data={data}
          autoHeight={true}
          hover={true}
          wordWrap={true}
          bordered={true}
          className={clsx("sub-sections-list-table")}
        >
          <Column width={160} align="center" fullText>
            <HeaderCell>Id</HeaderCell>
            <Cell dataKey="_id" />
          </Column>
          <Column width={150} align="center" fullText>
            <HeaderCell>Name</HeaderCell>
            <Cell dataKey="name" />
          </Column>
          <Column width={150} align="center" fullText>
            <HeaderCell>...</HeaderCell>
            <Cell>
              {rowdata => (
                <Link to={`/restaurants/menu-section/update/`}>
                  <span
                    className="sub-section-list-update">
                    Update
                  </span>
                </Link>)
              }
            </Cell>
          </Column>
        </Table>
      </div>
    </>
  )
}