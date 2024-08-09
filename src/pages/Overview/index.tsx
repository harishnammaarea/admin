import { useTypedDispatch, useTypedSelector } from "App/Store";
import RestaurantList from "components/RestaurantList";
import WelcomeCard from "components/WelcomeCard";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import GetAllRestaurantsAction from "redux/action/GetAllRestaurantsAction";

export default function Overview() {
  const { allRestaurants, count } = useTypedSelector(state => state.allRestaurants)
  const dispatch = useTypedDispatch()

  useEffect(() => {
    dispatch(GetAllRestaurantsAction(0, 10))
  }, [dispatch])

  return (
    <div className="overview-page">
      <WelcomeCard name="Harish" />
      <h1>Resturants</h1>
      {allRestaurants ?
        <>
          <RestaurantList data={allRestaurants} />
          <Link to="">
            View All
          </Link>
        </> : null}
    </div>
  )
}

