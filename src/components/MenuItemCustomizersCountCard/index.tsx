import clsx from "clsx";
import CommonCard from "shared/components/CommonCard";
import AddIconFilledCirculatIcon from "shared/icons/AddIconFilledCircularIcon";

interface MenuItemsCustomizersCountCardProps {
  className?: string
  count: number
}

export default function MenuItemCustomizersCountCard({ className, count }: MenuItemsCustomizersCountCardProps) {
  return (
    <CommonCard className={clsx("common-count-card-common-card", className)}
      innerContainerClassName="common-count-card-container">
      <AddIconFilledCirculatIcon fontSize="3rem" className="common-count-card-icon" />
      <h2>
        {count}
      </h2>
      <h3>Total Customizers Items</h3>
    </CommonCard>)
}