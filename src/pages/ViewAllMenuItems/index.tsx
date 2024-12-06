import history from "App/History"
import { NotifierContext } from "App/Notifier"
import { ObjectId } from "bson"
import MenuItemsList from "components/MenuItemsList"
import RestaurantInfoCard from "components/RestaurantInfoCard"
import { Menus } from "core/models/menu"
import { Restaurants } from "core/models/restaurants"
import { getMenuItemsApi } from "core/services/menu"
import { getRestaurantByIdApi } from "core/services/restaurants"
import { useCallback, useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import CommonPagination from "shared/components/CommonPagination"

type Params = {
  id: string
}

export default function ViewAllMenuItems() {
  const { id } = useParams<Params>()
  const [restaurant, setRestaurant] = useState<Restaurants | null>(null)
  const [menuItems, setMenuItems] = useState<Menus | null>(null)
  const { showNotification } = useContext(NotifierContext)
  const [page, setPage] = useState<number>(0)

  const handleGetRestaurantDetailsCallBack = useCallback(handleGetRestaurantDetails, [id, showNotification])
  const handleGetAllMenuItemsCallBack = useCallback(handleGetAllMenuItems, [id, page])

  useEffect(() => {
    if (!id || !ObjectId.isValid(id)) history.push("/restaurants")
    handleGetRestaurantDetailsCallBack()
    handleGetAllMenuItemsCallBack()
  }, [handleGetAllMenuItemsCallBack, handleGetRestaurantDetailsCallBack, id])

  async function handleGetRestaurantDetails() {
    const response = await getRestaurantByIdApi(id);
    if (response.status && response.data) {
      setRestaurant(response.data.restaurant)
    }
    else {
      showNotification({ type: "error", message: "Restaurant does not exists", title: "Failed" })
      history.push("/restaurants")
    }
  }

  async function handleGetAllMenuItems() {
    const response = await getMenuItemsApi(id, page, 10)
    if (response.data && response.status) {
      setMenuItems(response.data.menuItems)
    }
  }


  function handlePagination(pageNumber: number) {
    setPage(pageNumber - 1)
  }

  return (
    <div className="view-all-menu-items-page">
      {restaurant &&
        <RestaurantInfoCard
          name={restaurant.name}
          logo={restaurant.logo}
          category={restaurant.category}
          createdAt={restaurant.createdAt}
          businessModal={restaurant.businessModel}
          mobileNumber={restaurant.mobileNumber}
          cuisines={restaurant.cuisines}
          email={restaurant.email}
        />
      }
      <MenuItemsList
        restaurantId={id}
        menuSectionCount={restaurant ? restaurant.menuSections.sections.length : 0}
        data={menuItems ? menuItems.items : []}
      />
      <div className="view-all-menu-items-pagination">
        <CommonPagination
          total={menuItems ? menuItems.count : 0}
          limit={10}
          activePage={page + 1}
          onChangePage={handlePagination}
        />
      </div>
    </div>)
}