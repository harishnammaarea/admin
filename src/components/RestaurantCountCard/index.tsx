import clsx from "clsx";
import { commasFormatter } from "core/helpers/NumberHelper";
import CommonCard from "shared/components/CommonCard";
import HotelIcon from "shared/icons/Hotel";

interface RestaurantCountCardProps {
  className?: string
  count: number
}

export default function RestaurantCountCard({ count }: RestaurantCountCardProps) {
  return (
    <CommonCard className={clsx("resatuarnt-count-card-container")}>
      <HotelIcon fontSize="2rem" color="#5449f0" />
      <h1>{commasFormatter(count)}</h1>
      <h4>Total Restaurants</h4>
    </CommonCard>
  )
}