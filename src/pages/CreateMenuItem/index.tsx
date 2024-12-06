import history from "App/History"
import { NotifierContext } from "App/Notifier"
import { useTypedDispatch, useTypedSelector } from "App/Store"
import { ObjectId } from "bson"
import CreateMenuItemForm from "components/CreatedMenuItem"
import { AddMenuSectionsFormProps } from "components/CreatedMenuItem/AddMenuItemMenuSections"
import { CreateMenuDetailsFormProps } from "components/CreatedMenuItem/CreateMenuItemForm"
import { DEFAULT_API_ERROR } from "core/constants/Defaults"
import { MenuItem, } from "core/models/menu"
import { Restaurants } from "core/models/restaurants"
import { uploadfilesApi } from "core/services/core"
import { createMenuItemApi } from "core/services/menu"
import { getRestaurantByIdApi } from "core/services/restaurants"
import { useCallback, useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getCuisinesThunk } from "redux-slices/getAllCuisinesSlice"
import { hideLoader, showLoader } from "redux-slices/loader"

type Params = {
  id: string
}

export default function CreateMenuItem() {
  const { id } = useParams<Params>()
  const [restaurant, setRestaurant] = useState<Restaurants | null>(null)
  const { cuisines } = useTypedSelector(state => state.cuisines)
  const dispatch = useTypedDispatch()
  const handleGetRestaurantCallback = useCallback(handleGetRestaurant, [dispatch, id])
  const { showNotification } = useContext(NotifierContext)

  useEffect(() => {
    if (!id) history.push("/restaurants")
    if (!ObjectId.isValid(id)) history.push("/restaurants")
    dispatch(getCuisinesThunk())
    handleGetRestaurantCallback()
  }, [dispatch,
    handleGetRestaurantCallback, id])


  async function handleGetRestaurant() {
    dispatch(showLoader())
    const response = await getRestaurantByIdApi(id)
    if (response.data && response.status) {
      setRestaurant(response.data.restaurant)
      dispatch(hideLoader())
    } else {
      dispatch(showLoader())
      history.push("/restaurants")
    }
  }

  async function handleCreateMenuItem(data: CreateMenuDetailsFormProps, images: File[], menuSections: AddMenuSectionsFormProps[]) {
    dispatch(showLoader())
    let photos: string[] = []

    if (images.length) {
      const formData = new FormData()
      images.forEach(file => {
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

    const payload = {
      ...data, photos, menuSections
    }

    const response = await createMenuItemApi(payload, id)
    if (response.status && response.data) {
      showNotification({ message: "Successfully created menu item", type: "success", title: "Success!!" })
      history.push(`/restaurants/menu-items/${id}`)
    } else {
      showNotification({ message: response.message || DEFAULT_API_ERROR, type: "error", title: "Failed!!" })
    }
    dispatch(hideLoader())
  }

  return (
    <div className="create-menu-item-page">
      {restaurant &&
        <CreateMenuItemForm
          onCreateMenuItem={handleCreateMenuItem}
          customizers={restaurant.customizers}
          menuSections={restaurant.menuSections}
          cuisines={cuisines}
        />
      }
    </div>)
}