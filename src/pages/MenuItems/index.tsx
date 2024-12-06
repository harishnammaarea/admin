import history from "App/History"
import { NotifierContext } from "App/Notifier"
import { useTypedDispatch } from "App/Store"
import { ObjectId } from "bson"
import clsx from "clsx"
import CreateMenuItemsCustomizerForm, { CreateMenuComboFormMainDetails } from "components/CreateMenuItemsCustomizerForm"
import { CreateMenuComboOptiosForm } from "components/CreateMenuItemsCustomizerForm/CreateMenuItemsCustomizersOptionsForm"
import MenuCountCard from "components/MenuCountCard"
import MenuItemCustomizersCountCard from "components/MenuItemCustomizersCountCard"
import MenuItemsCustomizerList from "components/MenuItemsCustomizerList"
import MenuList from "components/MenuItemsList"
import MenuSectionsCountCard from "components/MenuSectionsCountCard"
import RestaurantInfoCard from "components/RestaurantInfoCard"
import { COLORS } from "core/constants/color"
import { DEFAULT_API_ERROR } from "core/constants/Defaults"
import { MenuItemsCustomizer, Menus } from "core/models/menu"
import { SelectOptions } from "core/models/Options"
import { Restaurants } from "core/models/restaurants"
import { createMenuItemsCustomizerApi, getAllCustomizerTypesApi, updateMenuItemsCustmizerApi } from "core/services/customizers"
import { getMenuItemsApi } from "core/services/menu"
import { getRestaurantByIdApi } from "core/services/restaurants"
import { useCallback, useContext, useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { getCuisinesThunk } from "redux-slices/getAllCuisinesSlice"
import { hideLoader, showLoader } from "redux-slices/loader"
import { Col, Grid, Row } from "rsuite"
import { RowDataType } from "rsuite/esm/Table"
import CommonModal from "shared/components/CommonModal"
import ArrowWithLineIcon from "shared/icons/ArrowWithLineIcon"

interface MenuItemsProps {
  className?: string
}

type Params = {
  id: string
}

export default function MenuItems({ className }: MenuItemsProps) {
  const { id } = useParams<Params>()
  const [menuItems, setMenuItems] = useState<Menus | null>(null)
  const [restaurant, setRestaurant] = useState<Restaurants | null>(null)
  const [createMenuItemsCustomizerModal, setCreateMenuItemsCustomizerModal] = useState<boolean>(false)
  const [customizerToUpdate, setCustomizerToUpdate] = useState<RowDataType<MenuItemsCustomizer> | null>(null)
  const [customizerTypes, setCustomizerTypes] = useState<SelectOptions[]>([])
  const dispatch = useTypedDispatch()
  const handleGetMenuItemsCallback = useCallback(handleGetMenuItems, [dispatch, id])
  const handleGetRestaurantCallback = useCallback(handleGetRestaurant, [dispatch, id])
  const handleGetAllCustomizerOptionsCallback = useCallback(handleGetAllCustomizerOptions, [dispatch])
  const { showNotification } = useContext(NotifierContext)

  useEffect(() => {
    if (!id) history.push("/restaurants")
    if (!ObjectId.isValid(id)) history.push("/restaurants")
    dispatch(getCuisinesThunk())
    handleGetMenuItemsCallback()
    handleGetRestaurantCallback()
    handleGetAllCustomizerOptionsCallback()
  }, [dispatch,
    handleGetAllCustomizerOptionsCallback,
    handleGetMenuItemsCallback, handleGetRestaurantCallback, id])

  async function handleGetMenuItems() {
    dispatch(showLoader())
    const response = await getMenuItemsApi(id, 0, 2)
    if (response.data && response.status) {
      setMenuItems(response.data.menuItems)
    }
    dispatch(hideLoader())
  }

  async function handleGetAllCustomizerOptions() {
    dispatch(showLoader())
    const response = await getAllCustomizerTypesApi()
    if (response.data && response.status) {
      setCustomizerTypes(response.data.customizerTypes)
    }
    dispatch(hideLoader())
  }

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

  function handleOnCloseCreateCustomizerModal() {
    setCreateMenuItemsCustomizerModal(false)
    setCustomizerToUpdate(null)
  }

  function handleOnCreateMenuItemsCustomizer() {
    setCreateMenuItemsCustomizerModal(true)
  }

  async function handleCreateMenuItemsCustomizer(data: CreateMenuComboFormMainDetails & { options: CreateMenuComboOptiosForm[] }) {
    dispatch(showLoader())
    const response = await createMenuItemsCustomizerApi(data, id)
    if (response.data && response.status) {
      showNotification({ type: "success", title: "Success", message: "Successfully create menu items customizer" })
      setCreateMenuItemsCustomizerModal(false)
    }
    else {
      showNotification({ type: "error", title: "Failed", message: response.message || DEFAULT_API_ERROR })
    }
    dispatch(hideLoader())
  }

  function handleOnSelectedCustomizerToUpdate(customizer: RowDataType<MenuItemsCustomizer>) {
    setCreateMenuItemsCustomizerModal(true)
    setCustomizerToUpdate(customizer)
  }

  async function handleOnUpdateCustomizer(data: CreateMenuComboFormMainDetails & { options: CreateMenuComboOptiosForm[] }) {
    dispatch(showLoader())
    if (customizerToUpdate) {
      const response = await updateMenuItemsCustmizerApi(data, customizerToUpdate._id)
      if (response.data && response.status) {
        showNotification({ type: "success", title: "Success", message: "Successfully Updated Customizer" })
        setCreateMenuItemsCustomizerModal(false)
        setCustomizerToUpdate(null)
      }
      else {
        showNotification({ type: "error", title: "Failed", message: response.message || DEFAULT_API_ERROR })
      }
    }
    dispatch(hideLoader())
  }

  return (
    <>
      {restaurant &&
        <>
          <CommonModal
            size="full"
            onClose={handleOnCloseCreateCustomizerModal}
            open={createMenuItemsCustomizerModal}>
            <CreateMenuItemsCustomizerForm
              customizerTypes={customizerTypes}
              customizerToUpdate={customizerToUpdate}
              onUpdateMenuItemsCustomizer={handleOnUpdateCustomizer}
              onCreateMenuItemsCustomizer={handleCreateMenuItemsCustomizer}
            />
          </CommonModal>
        </>
      }
      <div className={clsx("menu-items-page", className)}>
        {restaurant &&
          <>
            <RestaurantInfoCard
              name={restaurant.name}
              logo={restaurant.logo}
              createdAt={restaurant.createdAt}
              mobileNumber={restaurant.mobileNumber}
              email={restaurant.email}
              category={restaurant.category}
              cuisines={restaurant.cuisines}
              businessModal={restaurant.businessModel}
            />
            <div className="menu-section-page-analytics-container">
              <h1>Analytics</h1>
              <Grid fluid>
                <Row gutter={10}>
                  <Col xs={24} sm={24} md={24} lg={8} xl={8} xxl={8} >
                    <MenuCountCard
                      count={menuItems ? menuItems.items.length : 0}
                    />
                  </Col>
                  <Col xs={24} sm={24} md={24} lg={8} xl={8} xxl={8} >
                    <MenuSectionsCountCard
                      count={restaurant.menuSections.sections?.length || 0}
                    />
                  </Col>
                  <Col xs={24} sm={24} md={24} lg={8} xl={8} xxl={8} >
                    <MenuItemCustomizersCountCard
                      count={restaurant.customizers.length || 0}
                    />
                  </Col>
                </Row>
              </Grid>
            </div>
            <MenuItemsCustomizerList
              onUpdateMenuItemCustomizer={handleOnSelectedCustomizerToUpdate}
              onCreateMenuItemsCustomizer={handleOnCreateMenuItemsCustomizer}
              data={restaurant ? restaurant.customizers : []}
            />
            <>
              <MenuList
                showFilters={false}
                restaurantId={id}
                menuSectionCount={restaurant.menuSections.sections?.length || 0}
                data={menuItems ? menuItems.items : []}
              />
              <div className="menu-items-view-all-link-container">
                <Link to={`/restaurants/menu-items/view-all-menu-items/${id}`}>View All<ArrowWithLineIcon rotate={180} color={COLORS.PRIMARY_COLOR} /></Link>
              </div>
            </>
          </>
        }
      </div>
    </>
  )
}
