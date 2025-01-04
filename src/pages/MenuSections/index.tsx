import history from "App/History";
import { NotifierContext } from "App/Notifier";
import { useTypedDispatch } from "App/Store";
import { ObjectId } from "bson";
import MenuCountCard from "components/MenuCountCard";
import MenuSectionsCountCard from "components/MenuSectionsCountCard";
import MenuSectionsList from "components/MenuSectionsList";
import RestaurantInfoCard from "components/RestaurantInfoCard";
import { Restaurants } from "core/models/restaurants";
import { getRestaurantByIdApi } from "core/services/restaurants";
import { useCallback, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { hideLoader, showLoader } from "redux-slices/loader";
import { Col, Grid, Row } from "rsuite";

export default function MenuSections() {
  const { id } = useParams<{ id: string }>()
  const [restaurant, setRestaurant] = useState<Restaurants | null>(null)
  const { showNotification } = useContext(NotifierContext)
  const dispatch = useTypedDispatch()

  async function hanldeGetRestaurant() {
    dispatch(showLoader())
    const response = await getRestaurantByIdApi(id)
    if (response.data && response.status) {
      setRestaurant(response.data.restaurant)
      dispatch(hideLoader())
    } else {
      dispatch(hideLoader())
      history.push("/restaurants")
      showNotification({ message: "Restaurant does not exists", type: "error", title: "Failed" })
    }
  }

  const handleGetRestaurantCallback = useCallback(hanldeGetRestaurant, [dispatch, id, showNotification])

  useEffect(() => {
    if (!id) history.push("/restaurants")
    if (!ObjectId.isValid(id)) {
      history.push("/restaurants")
    } else {
      handleGetRestaurantCallback()
    }
  }, [handleGetRestaurantCallback, id])

  return (
    <>
      <div className="menu-sections-page-wrapper">
        {restaurant &&
          <>
            <RestaurantInfoCard
              businessModal={restaurant.businessModel}
              cuisines={restaurant.cuisines}
              email={restaurant.email}
              category={restaurant.category}
              mobileNumber={restaurant.mobileNumber}
              logo={restaurant.logo}
              name={restaurant.name}
              createdAt={restaurant.createdAt}
            />
            <div className="menu-section-page-analytics-container">
              <h2>Analytics</h2>
              <Grid fluid>
                <Row gutter={10}>
                  <Col xs={24} sm={24} md={24} lg={8} xl={8} xxl={8} >
                    <MenuCountCard count={0} />
                  </Col>
                  <Col xs={24} sm={24} md={24} lg={8} xl={8} xxl={8} >
                    <MenuSectionsCountCard
                      count={restaurant.menuSections.sections?.length || 0} 
                      />
                  </Col>
                </Row>
              </Grid>
            </div>
            <MenuSectionsList
              restaurantId={restaurant._id}
              data={restaurant ? restaurant.menuSections.sections : []}
            />
          </>
        }
      </div>
    </>
  )
}