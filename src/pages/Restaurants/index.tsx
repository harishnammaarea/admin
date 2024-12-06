import { useTypedDispatch, useTypedSelector } from "App/Store";
import RestaurantCountCard from "components/RestaurantCountCard";
import RestaurantList from "components/RestaurantList";
import WelcomeCard from "components/WelcomeCard";
import { getRole } from "core/helpers/storage";
import { Roles } from "core/models/Token";
import { useEffect } from "react";
import { getRestaurantsThunk } from "redux-slices/getRestaurantsSlice";
import { hideLoader, showLoader } from "redux-slices/loader";
import { Col, Grid, Row } from "rsuite";

export default function Restaurants() {
  const { restaurants, isLoading, count } = useTypedSelector(state => state.restaurants)
  const dispatch = useTypedDispatch()
  const role: Roles = getRole()

  useEffect(() => {
    if (isLoading) {
      dispatch(showLoader())
    }
    else {
      dispatch(hideLoader())
    }
  }, [dispatch, isLoading])

  useEffect(() => {
    dispatch(getRestaurantsThunk())
  }, [dispatch])
  

  return (
    <div className="restaurants-page-container">
      <WelcomeCard role={role} name="Harish" />
      <h1>Analytics</h1>
      <Grid fluid className="restaurant-page-grid-container">
        <Row gutter={10}>
          <Col xs={24} sm={24} md={24} lg={6} xl={6} xxl={6}>
              <RestaurantCountCard count={count} />
          </Col>
        </Row>
      </Grid>
      <h1>Recentenly Added</h1>
      {restaurants.length > 0 &&
        <RestaurantList data={restaurants} className="restaurant-page-restaurant-list" />
      }
    </div>
  )
}