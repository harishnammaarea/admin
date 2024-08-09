import clsx from "clsx"

interface RestaurantHeaderProps {
  className?: String
  name: string
}

export default function RestaurantHeader({ className }: RestaurantHeaderProps) {

  return (
    <div className={clsx("restaurant-header-container", className)}>
      <h1>Restuarants</h1>
    </div>)
}
