import history from "App/History"
import { NotifierContext } from "App/Notifier"
import { useTypedDispatch } from "App/Store"
import { ObjectId } from "bson"
import CreateMenuSectionFormContainer, { UpdateMenuSectionProps } from "components/CreateMenuSectionFormContainer"
import { MenuSection } from "core/models/menu"
import { getMenuSectionById } from "core/services/menu"
import { useCallback, useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { hideLoader, showLoader } from "redux-slices/loader"

type Params = {
  id: string
}

export default function UpdateMenuSection() {
  const { id } = useParams<Params>()
  const dispatch = useTypedDispatch()
  const { showNotification } = useContext(NotifierContext)
  const [menuSection, setMenuSection] = useState<MenuSection | null>(null)

  const handleMenuSectionByIdCallback = useCallback(handleGetMenuSectionById, [dispatch, id, showNotification])

  useEffect(() => {
    if (id && !ObjectId.isValid(id)) history.push("/restaurants")
    handleMenuSectionByIdCallback()
  }, [handleMenuSectionByIdCallback, id])

  async function handleUpdateMenuSection(values: UpdateMenuSectionProps) {
    console.log(values)
  }

  async function handleGetMenuSectionById() {
    dispatch(showLoader())
    const response = await getMenuSectionById(id)
    
    if (response.data && response.status) {
      setMenuSection(response.data.menuSection)
    } else {
      showNotification({ message: "Menu section does not exists", title: "Failed", type: "error" })
    }
    dispatch(hideLoader())
  }

  return (
    <div className="create-menu-section-page">
      <CreateMenuSectionFormContainer
        data={menuSection}
        onCreateMenuSection={handleUpdateMenuSection}
        className="create-menu-section-form-container"
      />
    </div>
  )
}