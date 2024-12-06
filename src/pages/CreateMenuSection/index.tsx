import history from "App/History";
import { NotifierContext } from "App/Notifier";
import { useTypedDispatch } from "App/Store";
import { ObjectId } from "bson";
import CreateMenuSectionFormContainer, { CreateMenuSectionPayload } from "components/CreateMenuSectionFormContainer";
import { DEFAULT_API_ERROR } from "core/constants/Defaults";
import { createRestaurantMenuSectionsApi } from "core/services/menu";
import { getRestaurantByIdApi } from "core/services/restaurants";
import { useCallback, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { hideLoader, showLoader } from "redux-slices/loader";

type Params = {
  id: string
}

export default function CreateMenuSection() {
  const { id } = useParams<Params>()
  const dispatch = useTypedDispatch()
  const { showNotification } = useContext(NotifierContext)

  const handleGetRestaurantByIdCallback = useCallback(handleGetRestaurantById, [dispatch, id, showNotification])

  useEffect(() => {
    if (id && !ObjectId.isValid(id)) history.push("/restaurants")
    handleGetRestaurantByIdCallback()
  }, [handleGetRestaurantByIdCallback, id])

  async function handleGetRestaurantById() {
    dispatch(showLoader())
    const response = await getRestaurantByIdApi(id)
    if (!response.status) {
      showNotification({ message: "Restaurant not found", title: "Failed", type: "error" })
      history.push("/restaurants")
    }
    dispatch(hideLoader())
  }

  async function handleCreateMenuSection(values: CreateMenuSectionPayload) {
    dispatch(showLoader())
    const data = { sections: [values] }
    const response = await createRestaurantMenuSectionsApi(id, data)
    if (response.data && response.status) {
      showNotification({ message: "Successfully created menu section", title: "Success", type: "success" })
      history.push(`/restaurants/menu-sections/${id}`)
    }
    else {
      showNotification({ message: response.message || DEFAULT_API_ERROR, title: "Failed", type: "error" })
    }

    dispatch(hideLoader())
  }

  return (
    <div className="create-menu-section-page">
      <CreateMenuSectionFormContainer
        onCreateMenuSection={handleCreateMenuSection}
        className="create-menu-section-form-container"
      />
    </div>)
}