import history from "App/History"
import { ObjectId } from "bson"
import ViewRestaurantBasicDetails from "components/ViewRestaurantDetails"
import { Restaurants } from "core/models/restaurants"
import { getRestaurantByIdApi } from "core/services/restaurants"
import { useCallback, useEffect, useState } from "react"
import { useParams } from "react-router-dom"

type Params = {
  id: string
}

export default function ViewRestaurant() {
  const { id } = useParams<Params>()
  const [restaurant, setRestaurant] = useState<Restaurants | null>(null)

  const handleGetRestaurantId = useCallback(async () => {
    const response = await getRestaurantByIdApi(id)
    if (response.data && response.status) {
      setRestaurant(response.data.restaurant)
    }
  }, [id])


  useEffect(() => {
    if (!id) history.push("/restaurants")
    if (!ObjectId.isValid(id)) history.push("/restaurants")
    handleGetRestaurantId()
  }, [handleGetRestaurantId, id])

  return (
    <div className="view-restaurant-page">
      {restaurant &&
        <>
          <ViewRestaurantBasicDetails
            restaurant={restaurant} />
        </>
      }
    </div>)
}