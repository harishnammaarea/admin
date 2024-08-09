import RestaurantHeader from "components/RestaurantHeader";
import { getName } from "core/helpers/storage";
import { useEffect } from "react";

export default function Restaurants() {

  const name = getName()

  useEffect(() => {

  }, [])

  return (
    <div className="restaurants-page-container">
      <RestaurantHeader name={name} />
    </div>
  )
}