import { useJsApiLoader } from "@react-google-maps/api";
import history from "App/History";
import { NotifierContext } from "App/Notifier";
import { useTypedDispatch, useTypedSelector } from "App/Store";
import StartOnBoardingProcessProgress from "components/StartOnBoardingProcessProgressIndicator";
import AddRestaurantBasicDetailsForm, { ModifiedAddRestaurantBasicDetailsFormValues } from "components/AddRestaurantBasicDetailsForm";
import AddRestaurantLocationDetailsForm, { AddLocationReduxFormProps } from "components/AddRestaurantLocationDetailsForm";
import AddRestaurantOwnerDetailsForm, { CombinedOwnerDetails } from "components/AddRestaurantOwnerDetailsForm";
import { START_ON_BOARDING_PROCESS_STAGES } from "core/constants/OnBoarding";
import { addMenuExtrasApi, getAllRestaurantExtrasApi, getAllRestaurantsMenuItemsApi, getAllStatesApi, getAreas, removeMenuExtraApi, startOnBoardingProcessApi, updateRestaurantExtraDetailsApi } from "core/services/restaurants";
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import getAllCuisinesAction from "redux/action/GetAllCuisinesAction";
import GetAllMainCoursesAction from "redux/action/GetAllMainCoursesAction";
import { locateAddressApi } from "core/services/others";
import AddRestaurantBankDetailsForm, { BankDetailsReducFormProps } from "components/AddRestaurantBankDetailsForm";
import AddRestaurantCoverPhotos from "components/AddRestaurantCoverPhotos";
import Button from "shared/components/Button";
import ArrowWithLineIcon from "shared/icons/ArrowWithLineIcon";
import { uploadMultiplefiles } from "core/services/core";
import { CoverPhotos, Extras, Menus } from "core/models/restaurants";
import { SelectOptions } from "core/models/Options";
import AddOpeningHoursForm, { AddOpeningHoursReduxFormProps } from "components/AddOpeningHoursForm";
import AddMenuSectionsForm, { AddMenuSectionReduxForm } from "components/AddMenuSectionsForm";
import { DEFAULT_API_ERROR } from "core/constants/Defaults";
import { RESTAURANT_TYPES, WEEK_DAYS } from "core/constants/options";
import MenuList from "components/MenuList";
import ExtrasList from "components/ExtrasList";
import CommonPagination from "shared/components/CommonPagination";

type Stages = {
  stage: "basic-details"
  | "location-details"
  | "owner-details"
  | "bank-details"
  | "cover-photos"
  | "opening-hours"
  | "menu-sections"
  | "menu-extras"
  | "menu-items"
}

type Pagination = {
  page: number,
  size: number
}


export default function StartOnBoardingProcess() {
  const { isLoaded } = useJsApiLoader({
    // googleMapsApiKey: process.env.REACT_APP_GOOGLE_KEY || "",
    googleMapsApiKey: "",
  })

  const { stage } = useParams < Stages > ()
  const { showNotification } = useContext(NotifierContext);
  const dispatch = useTypedDispatch()
  const routeUrl = "/onboarding/start-onboarding-process/"
  const [areas, setAreas] = useState < SelectOptions[] > ([])
  const [coordsUpdated, setCoorsUpdated] = useState(false)
  const [basicDetails, setBasicDetails] = useState < ModifiedAddRestaurantBasicDetailsFormValues | null > (null)
  const [locationDetails, setLocationDetails] = useState < null | AddLocationReduxFormProps > (null)
  const [openingHoursDetails, setOpeningHoursDetails] = useState < AddOpeningHoursReduxFormProps | null > (null)
  const [uploadedCoverPhotosUrls, setUploadedCoverPhotosUrls] = useState < CoverPhotos[] > ([])
  const [ownerDetails, setOwnerDetails] = useState < CombinedOwnerDetails | null > (null)
  const [bankDetails, setBankDetails] = useState < null | BankDetailsReducFormProps > (null)
  const { mainCourses } = useTypedSelector((state) => state.mainCourses)
  const { allCuisines } = useTypedSelector(state => state.cuisines)
  const [states, setStates] = useState < SelectOptions[] > ([])
  const [menuSections, setMenuSections] = useState < AddMenuSectionReduxForm | null > (null)
  const [modifiedAppliedDays, setModifiedAppliedDays] = useState < SelectOptions[] > ([])
  const [location, setLocation] = useState < { lat: number, lng: number } > ({ lat: 12.971599, lng: 77.594566 })
  const [categories, setCategories] = useState < SelectOptions[] > ([])
  const [restaurantId, setRestaurantId] = useState < null | number > (20)
  const [extras, setExtras] = useState < Extras[] > ([])
  const [menuExtrasCount, setMenuExtrasCount] = useState < number > (0)
  const [isAddMenu, setIsAddMenu] = useState < boolean > (false)
  const [menuCount, setMenuCount] = useState < number > (0)
  const [pagination, setPagination] = useState < Pagination > ({ page: 0, size: 10 })
  const [menus, setMenus] = useState < Menus[] > ([])
  const [addExtraModal, setAddExtraModal] = useState < boolean > (false)
  const [extraDetails, setExtraDetails] = useState < Extras | null > (null)
  const [editExtra, setEditExtra] = useState < boolean > (false)

  useEffect(() => {
    handleGetAreas()
    handleGetStates()
  }, []);

  useEffect(() => {
    dispatch(getAllCuisinesAction())
  }, [dispatch])

  useEffect(() => {
    dispatch(GetAllMainCoursesAction());
  }, [dispatch]);

  useEffect(() => {
    if (stage === START_ON_BOARDING_PROCESS_STAGES.openingHours && !basicDetails) {
      history.push(`${routeUrl}${START_ON_BOARDING_PROCESS_STAGES.basicDetails}`)
    }

    if (stage === START_ON_BOARDING_PROCESS_STAGES.locationDetails && !openingHoursDetails) {
      history.push(`${routeUrl}${START_ON_BOARDING_PROCESS_STAGES.openingHours}`)
    }

    if (stage === START_ON_BOARDING_PROCESS_STAGES.ownerDetails && !locationDetails) {
      history.push(`${routeUrl}${START_ON_BOARDING_PROCESS_STAGES.locationDetails}`)
    }

    if (stage === START_ON_BOARDING_PROCESS_STAGES.bankDetails && !ownerDetails) {
      history.push(`${routeUrl}${START_ON_BOARDING_PROCESS_STAGES.ownerDetails}`)
    }

    if (stage === START_ON_BOARDING_PROCESS_STAGES.coverPhotos && !bankDetails) {
      history.push(`${routeUrl}${START_ON_BOARDING_PROCESS_STAGES.bankDetails}`)
    }

    if (stage === START_ON_BOARDING_PROCESS_STAGES.menuSections && !uploadedCoverPhotosUrls.length) {
      history.push(`${routeUrl}${START_ON_BOARDING_PROCESS_STAGES.coverPhotos}`)
    }

    if (stage === START_ON_BOARDING_PROCESS_STAGES.menuExtras && !restaurantId) {
      history.push("/onboarding")
    }

    if (stage === START_ON_BOARDING_PROCESS_STAGES.menuItems && !restaurantId) {
      history.push("/onboarding")
    }
  }, [
    bankDetails,
    basicDetails,
    locationDetails,
    openingHoursDetails,
    ownerDetails,
    stage,
    restaurantId,
    uploadedCoverPhotosUrls.length])

  useEffect(() => {
    if (stage === START_ON_BOARDING_PROCESS_STAGES.menuExtras) {
      getAllRestaurantExtras()
    }

    if (stage === START_ON_BOARDING_PROCESS_STAGES.menuItems) {
      getAllRestaurantMenuItems()
    }
  }, [stage, pagination])

  async function handleGetStates() {
    const statesResponse = await getAllStatesApi()
    if (statesResponse.status && statesResponse.data) {
      setStates(statesResponse.data.states)
    }
  }

  async function handleGetAreas() {
    const areasResponse = await getAreas()
    if (areasResponse.data && areasResponse.status) {
      setAreas(areasResponse.data.areas);
    }
  }

  function handleShowFormStage() {
    switch (stage) {
      case START_ON_BOARDING_PROCESS_STAGES.basicDetails:
        return (
          <AddRestaurantBasicDetailsForm
            onAddRestaurantBasicDetails={handleAddRestaurantBasicDetails}
            states={states}
            cuisines={allCuisines}
            mainCourses={mainCourses}
            areas={areas}
            basicDetails={basicDetails}
            className="start-on-boarding-process-basic-details"
          />)

      case START_ON_BOARDING_PROCESS_STAGES.locationDetails:
        return (
          <AddRestaurantLocationDetailsForm
            onAddLocationDetails={handleAddLocationDetails}
            isLoaded={isLoaded}
            location={location}
            locationDetails={locationDetails}
            areas={areas}
            onConfirmAddress={handleConfirmLocation}
            className="start-on-boarding-process-location-details"
          />
        )

      case START_ON_BOARDING_PROCESS_STAGES.ownerDetails:
        return (
          <AddRestaurantOwnerDetailsForm
            ownerDetails={ownerDetails}
            onAddOwnerDetails={handleAddOwnerDetails}
          />)

      case START_ON_BOARDING_PROCESS_STAGES.bankDetails:
        return (
          <AddRestaurantBankDetailsForm
            onAddBankDetails={handleAddBankDetails}
            states={states}
            bankDetails={bankDetails}
          />
        )

      case START_ON_BOARDING_PROCESS_STAGES.coverPhotos:
        return (
          <>
            <AddRestaurantCoverPhotos
              onImagesToUpload={handleAddRestaurantCoverPhotos}
              urls={uploadedCoverPhotosUrls}
            />
            <div className="start-on-boarding-process-cover-photos-route-to-next-stage">
              <Link to={`${routeUrl}${START_ON_BOARDING_PROCESS_STAGES.bankDetails}`}>
                <Button label="Previous"
                  icon={<ArrowWithLineIcon color="#ffffff" />}
                  iconPosition="start"
                  onClick={() => { setUploadedCoverPhotosUrls([]) }}
                />
              </Link>
              <Button label="Next"
                icon={<ArrowWithLineIcon color="#ffffff" rotate={180} />}
                iconPosition="end"
                onClick={handleNextStageRoute}
              />
            </div>
          </>
        )

      case START_ON_BOARDING_PROCESS_STAGES.openingHours:
        return (
          <AddOpeningHoursForm
            appliedDays={modifiedAppliedDays}
            onAddOpeningHours={handleAddOpeningHours}
            openingHoursDetails={openingHoursDetails}
          />)

      case START_ON_BOARDING_PROCESS_STAGES.menuSections:
        return (
          <AddMenuSectionsForm
            onAddMenuSections={startOnBoardingProcess}
            menuSections={menuSections}
          />
        )

      case START_ON_BOARDING_PROCESS_STAGES.menuExtras:
        return (
          <>
            <ExtrasList
              addExtraModal={addExtraModal}
              onOpenAddExtraModal={handleOpenAddExtraModal}
              onCloseAddExtraModal={handleCloseAddExtraModal}
              extras={extras}
              category={basicDetails?.category || "Both"}
              onAddMenuExtras={editExtra ? handleUpdateExtrasDetails : handleAddExtras}
              onInitilizeAddExtraForm={handleInitilizeAddExtraForm}
              extraDetails={extraDetails}
              editExtraDetails={editExtra}
            />
            <div className="start-on-boarding-process-menu-extras-route-to-next-stage">
              <CommonPagination
                total={menuExtrasCount}
                limit={pagination.size}
                activePage={pagination.page + 1}
                onChangePage={handlePagination}
                className="start-on-boarding-process-menu-extras-route-to-next-stage-pagination"
              />
              <Button
                label={"Skip"}
                icon={<ArrowWithLineIcon color="#ffffff" rotate={180} />}
                iconPosition="end"
                onClick={handleNextStageRoute}
              />
            </div>
          </>
        )

      case START_ON_BOARDING_PROCESS_STAGES.menuItems:
        return (
          <>
            <MenuList
              menuList={menus}
              category={[]}
              extras={[]}
              cuisines={[]}
              menuSections={[]}
              count={0}
            />
          </>
        )

      default:
        return (
          <AddRestaurantBasicDetailsForm
            onAddRestaurantBasicDetails={handleAddRestaurantBasicDetails}
            states={states}
            cuisines={allCuisines}
            mainCourses={mainCourses}
            areas={areas}
            className="start-on-boarding-process-basic-details"
          />)
    }
  }

  function handlePagination(page: number) {
    setPagination({ ...pagination, page: page - 1 })
  }

  function handleOpenAddExtraModal() {
    setAddExtraModal(true)
    setEditExtra(false)
    setExtraDetails(null)
  }

  function handleCloseAddExtraModal() {
    setAddExtraModal(false)
  }

  async function getAllRestaurantMenuItems() {
    const { page, size } = pagination
    if (restaurantId) {
      const menuListResponse = await getAllRestaurantsMenuItemsApi(restaurantId, page, size)
      if (menuListResponse.status && menuListResponse.data) {
        const { menu, count } = menuListResponse.data;
        setMenuCount(count)
        setMenus(menu)
      }
    }
  }

  async function getAllRestaurantExtras() {
    const { page, size } = pagination
    if (restaurantId) {
      const extrasResponse = await getAllRestaurantExtrasApi(restaurantId, page, size)
      if (extrasResponse.status && extrasResponse.data) {
        setExtras(extrasResponse.data.extras)
        setMenuExtrasCount(extrasResponse.data.count)
      }
    }
  }

  async function handleAddExtras(extra: Extras) {
    if (restaurantId) {
      const addExtrasResponse = await addMenuExtrasApi([{ ...extra, price: Number(extra.price) }], restaurantId)
      if (addExtrasResponse.status) {
        showNotification({ type: "success", message: "Successfully added menu extra", title: "Success" })
        setAddExtraModal(false)
        setPagination({ ...pagination, page: 0 })
      } else {
        showNotification({ type: "error", message: addExtrasResponse.message || DEFAULT_API_ERROR, title: "Error" })
      }
    }
  }

  async function handleInitilizeAddExtraForm(extraDetails: Extras) {
    setExtraDetails(extraDetails)
    setEditExtra(true)
    setAddExtraModal(true)
  }

  async function handleUpdateExtrasDetails(extra: Extras) {
    const { id } = extra
    const updateExtraResponse = await updateRestaurantExtraDetailsApi([{ ...extra }], id)
    if (updateExtraResponse.data && updateExtraResponse.status) {
      showNotification({ type: "success", message: "Successfully added menu extra", title: "Success" })
      setAddExtraModal(false)
      setPagination({ ...pagination, page: 0 })
    }
    else {
      showNotification({ type: "error", message: updateExtraResponse.message || DEFAULT_API_ERROR, title: "Error" })

    }
  }

  async function handleRemoveMenuExtra(id: number) {
    const removeExtraResponse = await removeMenuExtraApi(id)
    if (removeExtraResponse.data && removeExtraResponse.status) {

    } else {

    }
  }

  async function startOnBoardingProcess(menuSections: AddMenuSectionReduxForm) {
    const openingHours = openingHoursDetails?.openingHours.map(values => (
      {
        openingTime: values.openingTime.length === 5 ? `${values.openingTime}:00` : values.openingTime,
        closingTime: values.closingTime.length === 5 ? `${values.closingTime}:00` : values.closingTime,
        appliedDays: values.appliedDays.join(",")
      }))

    const restaurantDetails: any = {
      ...basicDetails,
      ...locationDetails,
      ...ownerDetails,
      ...menuSections,
      ...bankDetails,
      lat: location.lat.toString(),
      lng: location.lng.toString(),
      openingHours,
      coverPhotoUrls: uploadedCoverPhotosUrls.map(urls => urls.url)
    }

    const startOnBoardingProcessResponse = await startOnBoardingProcessApi(restaurantDetails)
    if (startOnBoardingProcessResponse.status && startOnBoardingProcessResponse.data) {
      showNotification({ type: "success", message: "Successfully started on boarding process", title: "Success" })
      setRestaurantId(startOnBoardingProcessResponse.data.restaurantId)
      if (basicDetails?.category === "Both") {
        const options: SelectOptions[] = []
        RESTAURANT_TYPES.forEach(type => {
          if (type.value !== "Both") {
            options.push(type)
          }
        });

        setCategories(options)
      }
    }
    else {
      showNotification({
        type: "error", message: startOnBoardingProcessResponse.message
          || DEFAULT_API_ERROR, title: "Failed"
      })
      setMenuSections(menuSections)
    }
  }

  function handleAddOpeningHours(values: AddOpeningHoursReduxFormProps) {
    setOpeningHoursDetails(values)
    handleNextStageRoute()
  }

  async function handleAddRestaurantCoverPhotos(images: File[]) {
    const formData = new FormData()
    images.map(file => formData.append("files", file))
    const coverPhotosResponse = await uploadMultiplefiles(formData)
    if (coverPhotosResponse.data && coverPhotosResponse.status) {
      const urls = coverPhotosResponse.data.urls.map((url, index) => ({ url, id: index }))
      const currenturls = [...uploadedCoverPhotosUrls]
      urls.map(url => currenturls.push(url))
      setUploadedCoverPhotosUrls(currenturls)
    } else {
      showNotification({ type: "error", message: "Failed to add cover photos", title: "Failed" })
    }
  }

  function handleAddBankDetails(values: BankDetailsReducFormProps) {
    setBankDetails(values)
    handleNextStageRoute()
  }

  function handleAddRestaurantBasicDetails(values: ModifiedAddRestaurantBasicDetailsFormValues) {
    const { closedOn } = values
    const appliedDaysOptions: SelectOptions[] = []
    if (closedOn) {
      const closedOnArray = closedOn.split(",")
      WEEK_DAYS.forEach(value => {
        if (!closedOnArray.includes(value)) {
          appliedDaysOptions.push({ label: value, value })
        }
      })
      setModifiedAppliedDays(appliedDaysOptions)
    }
    else {
      setModifiedAppliedDays(WEEK_DAYS.map(item => ({ label: item, value: item })))
    }
    setBasicDetails(values)
    handleNextStageRoute()
  }

  function handleAddLocationDetails(values: AddLocationReduxFormProps) {
    setLocationDetails(values)
    handleNextStageRoute()
  }

  function handleAddOwnerDetails(values: CombinedOwnerDetails) {
    setOwnerDetails(values)
    handleNextStageRoute()
  }

  async function handleConfirmLocation(address: string) {
    const response = await locateAddressApi(address);
    if (response.data.results.length > 0 && response.data.status === "OK") {
      const location = response.data.results[0].geometry.location;
      setLocation(location);
      setCoorsUpdated(true)
    } else {
      showNotification({
        type: "error",
        message: "Failed to locate address on map",
        title: "Failed",
      });
    }
  }

  async function handleNextStageRoute() {
    switch (stage) {
      case START_ON_BOARDING_PROCESS_STAGES.basicDetails:
        history.push(`${routeUrl}${START_ON_BOARDING_PROCESS_STAGES.openingHours}`)
        break;
      case START_ON_BOARDING_PROCESS_STAGES.openingHours:
        history.push(`${routeUrl}${START_ON_BOARDING_PROCESS_STAGES.locationDetails}`)
        break;
      case START_ON_BOARDING_PROCESS_STAGES.locationDetails:
        history.push(`${routeUrl}${START_ON_BOARDING_PROCESS_STAGES.ownerDetails}`)
        break;
      case START_ON_BOARDING_PROCESS_STAGES.ownerDetails:
        history.push(`${routeUrl}${START_ON_BOARDING_PROCESS_STAGES.bankDetails}`)
        break;
      case START_ON_BOARDING_PROCESS_STAGES.bankDetails:
        history.push(`${routeUrl}${START_ON_BOARDING_PROCESS_STAGES.coverPhotos}`)
        break;
      case START_ON_BOARDING_PROCESS_STAGES.coverPhotos:
        if (!uploadedCoverPhotosUrls.length) {
          showNotification({
            type: "info",
            message: "Atleast one cover photo is required",
            title: "Required"
          })
        }
        else {
          history.push(`${routeUrl}${START_ON_BOARDING_PROCESS_STAGES.menuSections}`)
        }
        break
      case START_ON_BOARDING_PROCESS_STAGES.menuSections:
        history.push(`${routeUrl}${START_ON_BOARDING_PROCESS_STAGES.menuExtras}`)
        break
      case START_ON_BOARDING_PROCESS_STAGES.menuExtras:
        history.push(`${routeUrl}${START_ON_BOARDING_PROCESS_STAGES.menuItems}`)
        break
      default:
        return stage
    }
  }

  return (
    <div className="start-on-boarding-process-page">
      <StartOnBoardingProcessProgress
        openingHours={openingHoursDetails}
        basicDetails={basicDetails}
        locationDetails={locationDetails}
        coverPhotos={uploadedCoverPhotosUrls.length}
        ownerDetails={ownerDetails}
        bankDetails={bankDetails}
        nextExtras={isAddMenu}
      />
      {handleShowFormStage()}
    </div>)
}