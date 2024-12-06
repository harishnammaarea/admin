import clsx from "clsx"
import { commasFormatter } from "core/helpers/NumberHelper"
import CommonCard from "shared/components/CommonCard"
import MenusIcon from "shared/icons/Menus"

interface MenuCountCardProps {
  className?: string
  count: number
}

export default function MenuCountCard({ className, count }: MenuCountCardProps) {
  return (
    <CommonCard className={clsx("common-count-card-common-card", className)}
      innerContainerClassName="common-count-card-container">
      <MenusIcon fontSize="3rem" className="common-count-card-icon" />
      <h2>
        {commasFormatter(count)}
      </h2>
      <h3>Total Menu Items</h3>
      {/* <Link to={``}>
        <span>View <ArrowWithLineIcon color={COLORS.PRIMARY_COLOR} /></span>
      </Link> */}
    </CommonCard>
  )
}