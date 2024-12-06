import clsx from "clsx"
import SubSectionList from "components/SubSectionsList";
import { MenuSection, Section, SubSection } from "core/models/menu";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Table } from "rsuite"
import { RowDataType } from "rsuite/esm/Table";
import Button from "shared/components/Button";
import CommonModal from "shared/components/CommonModal";
import AddIconCircularIcon from "shared/icons/AddIconCircularIcon";

interface MenuSectionsProps {
  className?: string
  data: Section[]
  restaurantId: string
}

export default function MenuSectionsList({
  className,
  data,
  restaurantId,
}: MenuSectionsProps) {
  const { Column, HeaderCell, Cell } = Table;
  const [selectedSubSection, setSelectedSubSection] = useState<RowDataType<MenuSection> | null>(null)

  useEffect(() => {
    if (selectedSubSection) {
      const rowsToUpdate = data.find(subSection => subSection._id === selectedSubSection._id)
      setSelectedSubSection(rowsToUpdate || null)
    }
  }, [data, selectedSubSection])

  function handleGetFormatteDate(timeStamp: string) {
    const date = dayjs(timeStamp)
    const day = date.format("DD")
    const month = date.format("MM")
    const year = date.format("YYYY")
    return `${year}-${month}-${day}`
  }

  return (
    <>
      <CommonModal
        size="full"
        onClose={() => { setSelectedSubSection(null) }}
        open={!!selectedSubSection}>
        <SubSectionList
          mainSection={selectedSubSection && selectedSubSection.name}
          sectionId={selectedSubSection && selectedSubSection._id}
          data={
            selectedSubSection ?
              selectedSubSection.subSections.map((section: SubSection) =>
                ({ name: section.name, _id: section._id, createdAt: section.createdAt })) : []}
        />
      </CommonModal>
      <div className="menu-section-page-menu-section-list-btn-container">
        <h2>Menu Sections</h2>
        <Link to={`/restaurants/menu-section/create/${restaurantId}`}>
          <Button
            label="Create"
            iconPosition="end"
            icon={<AddIconCircularIcon color="#ffffff" />} />
        </Link>
      </div>
      <Table
        data={data}
        autoHeight={true}
        hover={true}
        wordWrap={true}
        bordered
        cellBordered
        className={clsx(className, "menu-sections-list-container")}
      >
        <Column width={200} align="center" fullText>
          <HeaderCell>ID</HeaderCell>
          <Cell dataKey="_id" />
        </Column>
        <Column width={200} align="center" fullText>
          <HeaderCell>Section</HeaderCell>
          <Cell dataKey="name" />
        </Column>
        <Column width={150} align="center" fullText>
          <HeaderCell>Created On</HeaderCell>
          <Cell align="center">
            {rowData => {
              return (<span>{handleGetFormatteDate(rowData.createdAt)}</span>)
            }}
          </Cell>
        </Column>
        <Column width={150}>
          <HeaderCell align="center">Sub Sections</HeaderCell>
          <Cell align="center" >
            {rowData => {
              return (
                <span onClick={() => { setSelectedSubSection(rowData) }}
                  className="menu-sections-list-sub-section-view">
                  View
                </span>
              )
            }}
          </Cell>
        </Column>
        <Column width={150}>
          <HeaderCell align="center">...</HeaderCell>
          <Cell align="center" >
            {rowData => (
              <Link to={`/restaurants/menu-section/update/${rowData._id}`}>
                <span
                  className="menu-sections-list-section-update-menu-section">
                  Update
                </span>
              </Link>
            )}
          </Cell>
        </Column>
        <Column width={150}>
          <HeaderCell align="center">...</HeaderCell>
          <Cell align="center" >
            <Link to={`/restaurants/menu-items/${restaurantId}`}
              className="menu-sections-list-section-update-menu-section">
              Add Menu Item
            </Link>
          </Cell>
        </Column>
      </Table >
    </>)
}