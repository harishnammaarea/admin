import history from "App/History";
import { NotifierContext } from "App/Notifier";
import { useTypedDispatch, useTypedSelector } from "App/Store";
import { ObjectId } from "bson";
import CreateMenuItemForm, { CreateMenuDetailsFormProps } from "components/CreatedMenuItem/CreateMenuItemForm";
import { DEFAULT_API_ERROR } from "core/constants/Defaults";
import { MenuItem, MenuSection } from "core/models/menu";
import { Restaurants } from "core/models/restaurants";
import { uploadfilesApi } from "core/services/core";
import { getMenuItemById, updateMenuItemBasicDetailsApi } from "core/services/menu";
import {  getRestaurantByIdApi } from "core/services/restaurants";
import { useCallback, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCuisinesThunk } from "redux-slices/getAllCuisinesSlice";
import { hideLoader, showLoader } from "redux-slices/loader";
import CommonCard from "shared/components/CommonCard";

type Params = {
  id: string
  restaurantId: string
}

export default function UpdateMenuItemBasicDetails() {
  const { id, restaurantId } = useParams<Params>()
  const [menuItemToUpdate, setMenuItemToUpdate] = useState<MenuItem | null>(null)
  const [restaurant, setRestaurant] = useState<Restaurants | null>(null)
  const dispatch = useTypedDispatch()
  const { cuisines } = useTypedSelector(state => state.cuisines)
  const { showNotification } = useContext(NotifierContext)

  const handleGetRestaurantByIdCallback = useCallback(handleGetRestaurantById, [dispatch, restaurantId, showNotification])
  const handleGetMenuItemByIfCallback = useCallback(handleGetMenuItemById, [dispatch, id, restaurantId, showNotification])

  useEffect(() => {
    if (restaurantId && !ObjectId.isValid(restaurantId)) history.push(`/restaurants/menu-items/${restaurantId}`)
    if (id && !ObjectId.isValid(id)) history.push(`/restaurants/menu-items/${restaurantId}`)
    handleGetRestaurantByIdCallback()
    handleGetMenuItemByIfCallback()
    dispatch(getCuisinesThunk())
  }, [dispatch, handleGetMenuItemByIfCallback, handleGetRestaurantByIdCallback, id, restaurantId])


  async function handleGetRestaurantById() {
    const response = await getRestaurantByIdApi(restaurantId)
    if (response.status && response.data) {
      dispatch(showLoader())
      setRestaurant(response.data.restaurant)
    } else {
      dispatch(hideLoader())
      showNotification({ type: "error", message: "Restaurant not found", title: "Failed" })
      history.push(`/restaurants/menu-items/${restaurantId}}`)
    }
    dispatch(hideLoader())
  }

  async function handleGetMenuItemById() {
    const response = await getMenuItemById(id)
    if (response.data && response.status) {
      dispatch(showLoader())
      setMenuItemToUpdate(response.data.menuItem)
    } else {
      dispatch(hideLoader())
      showNotification({ type: "error", message: "Menu item not found", title: "Failed" })
      history.push(`/restaurants/menu-items/${restaurantId}`)
    }
    dispatch(hideLoader())
  }

  async function handleOnUpdateMenuItemBasicDetails(data: CreateMenuDetailsFormProps, newImages: File[], existsingImages: string[]) {
    dispatch(showLoader())
    let photos: string[] = []
    if (newImages.length) {
      const formData = new FormData()
      newImages.forEach(file => {
        formData.set("files", file)
      })

      const filesResponse = await uploadfilesApi(formData)
      if (filesResponse.data && filesResponse.status) {
        photos = filesResponse.data.urls
      }
      else {
        showNotification({ message: filesResponse.message || DEFAULT_API_ERROR, type: "error", title: "Failed to create menu item" })
        return
      }
    }

    const combinedUrls = [...photos, ...existsingImages]

    const payload: CreateMenuDetailsFormProps & { photos: string[] } & { menuSections: MenuSection[] } = {
      ...data,
      photos: combinedUrls,
      menuSections: menuItemToUpdate ? menuItemToUpdate.menuSections : []
    }

    if (menuItemToUpdate) {
      const response = await updateMenuItemBasicDetailsApi(payload, menuItemToUpdate._id)
      if (response.data && response.status) {
        showNotification({ message: "Successfully updated menu item", type: "success", title: "Success!!" })
        history.push(`/restaurants/menu-items/${restaurantId}`)
      }
      else {
        showNotification({ message: response.message || DEFAULT_API_ERROR, type: "error", title: "Failed!!" })
      }
    }
    dispatch(hideLoader())
  }

  return (<>
    {restaurant &&
      <div className="update-menu-item-page">
        <CommonCard className="update-menu-item-page-common-card">
          <CreateMenuItemForm
            onCreateMenuItem={handleOnUpdateMenuItemBasicDetails}
            selectedMenuItemToUpdate={menuItemToUpdate}
            isUpdate={true}
            menuSections={restaurant.menuSections || []}
            cuisines={cuisines}
            customizers={restaurant.customizers}
          />
        </CommonCard>
      </div>
    }
  </>

  )
}