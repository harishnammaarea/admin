import clsx from "clsx";
import CommonCard from "shared/components/CommonCard";
import SectionsIcon from "shared/icons/sections";

interface MenuSectionsCountCardProps {
  className?: string
  count: number
}

export default function MenuSectionsCountCard({ className, count }: MenuSectionsCountCardProps) {
  return (
    <CommonCard
      className={clsx("common-count-card-common-card", className)}
      innerContainerClassName="common-count-card-container"
    >
      <SectionsIcon className="common-count-card-icon" fontSize="3rem" />
      <h2 className="common-count-card">{count}</h2>
      <h3>Total Menu Sections</h3>
      {/* <Link to={``}>
        <Button label="Create" icon={<AddIconCircularIcon color={COLORS.PRIMARY_WHITE} />} />
      </Link> */}
    </CommonCard>
  )
}