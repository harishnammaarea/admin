import history from "App/History";
import { NotifierContext } from "App/Notifier";
import { useTypedDispatch, useTypedSelector } from "App/Store";
import clsx from "clsx";
import AddRestaurantBasicDetailsForm, {
  ModifiedAddRestaurantBasicDetailsFormValues,
} from "components/AddRestaurantBasicDetailsForm";
import { DEFAULT_API_ERROR } from "core/constants/Defaults";
import Option, { SelectOptions } from "core/models/Options";
import { getAllStatesApi, getAreas, updateRestaurantBasicDetailsApi } from "core/services/restaurants";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import getAllCuisinesAction from "redux/action/GetAllCuisinesAction";
import GetAllMainCoursesAction from "redux/action/GetAllMainCoursesAction";
import getRestuarantdetailsAction from "redux/action/GetRestuarantDetailsAction";
import { hideLoader, showLoader } from "redux/action/LoaderAction";

interface EditRestaurantprops {
  className?: string;
}

interface Params {
  id: string;
}
export default function EditRestaurantBasicDetails({ className }: EditRestaurantprops) {
  const dispatch = useTypedDispatch();
  const [areas, setAreas] = useState<SelectOptions[]>([])
  const { id } = useParams<Params>();
  const { restuarantDetails } = useTypedSelector(
    (state) => state.restaurantDetails
  );
  const { allCuisines } = useTypedSelector(state => state.cuisines)
  const { mainCourses } = useTypedSelector((state) => state.mainCourses)
  const [states, setStates] = useState<Option[]>([])
  const { showNotification } = useContext(NotifierContext)

  useEffect(() => {
    dispatch(getRestuarantdetailsAction(id))
  }, [dispatch, id]);

  useEffect(() => {
    handleGetAreas()
    handleGetStates()
  }, []);

  useEffect(() => {
    dispatch(getAllCuisinesAction())
  }, [dispatch])

  async function handleGetStates() {
    const statesResponse = await getAllStatesApi()
    if (statesResponse.status && statesResponse.data) {
      setStates(statesResponse.data.states)
    }
  }

  async function handleGetAreas() {
    const areasResponse = await getAreas();
    if (areasResponse.data && areasResponse.status) {
      setAreas(areasResponse.data.areas);
    }
  }

  useEffect(() => {
    dispatch(GetAllMainCoursesAction());
  }, [dispatch]);


  async function handleUpdateRestaurantDetails(values: ModifiedAddRestaurantBasicDetailsFormValues) {
    dispatch(showLoader())
    const updateRestaurantBasicDetailsResponse = await updateRestaurantBasicDetailsApi(values, id)
    if (updateRestaurantBasicDetailsResponse.status && updateRestaurantBasicDetailsResponse.data) {
      showNotification({ type: "success", message: "Successfully updated restaurant basic Details", title: "Success" })
      history.push("/overview")
    }
    else {
      showNotification({ type: "error", message: updateRestaurantBasicDetailsResponse.message || DEFAULT_API_ERROR, title: "Failed" })
    }
    dispatch(hideLoader())
  }

  return (
    <div className={clsx("edit-restaurant-page-main-container", className)}>
      <AddRestaurantBasicDetailsForm
        states={states}
        cuisines={allCuisines}
        onAddRestaurantBasicDetails={handleUpdateRestaurantDetails}
        mainCourses={mainCourses}
        areas={areas}
      />
    </div>
  );
}
