import history from "App/History";
import { NotifierContext } from "App/Notifier";
import { useTypedDispatch, useTypedSelector } from "App/Store";
import AddRestaurantBasicDetailsForm from "components/AddRestaurantBasicDetailsForm";
import {
  ModifiedAddRestaurantBasicDetailsFormValues
} from "components/AddRestaurantBasicDetailsForm";
import { DEFAULT_API_ERROR } from "core/constants/Defaults";
import Option, { SelectOptions } from "core/models/Options";
import addRestaurantBasicDetails, { getAllStatesApi, getAreas } from "core/services/restaurants";
import { useContext, useEffect, useState } from "react";
import getAllCuisinesAction from "redux/action/GetAllCuisinesAction";
import GetAllMainCoursesAction from "redux/action/GetAllMainCoursesAction";
import { hideLoader, showLoader } from "redux/action/LoaderAction";

export default function UpdateRestaurantBasicDetails() {
  const { showNotification } = useContext(NotifierContext);
  const dispatch = useTypedDispatch();
  const [areas, setAreas] = useState < SelectOptions[] > ([]);
  const { mainCourses } = useTypedSelector((state) => state.mainCourses);
  const { allCuisines } = useTypedSelector(state => state.cuisines)
  const [states, setStates] = useState < Option[] > ([])

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

  async function handleGetStates() {
    const statesResponse = await getAllStatesApi()
    if (statesResponse.status && statesResponse.data) {
      setStates(statesResponse.data.states)
    }
  }

  async function onAddRestaurentBasicDetails(
    restaurantDetails: ModifiedAddRestaurantBasicDetailsFormValues
  ) {
    dispatch(showLoader());
    const response = await addRestaurantBasicDetails(restaurantDetails);
    if (response.data && response.status) {
      history.push("/");
      showNotification({
        type: "success",
        message: response.data.message,
        title: "successfully added restaurant details",
      });
    } else {
      showNotification({
        type: "error",
        message: response.message || DEFAULT_API_ERROR,
        title: "Failed to add restaurants details",
      });
    }
    dispatch(hideLoader());
  }

  async function handleGetAreas() {
    const areasResponse = await getAreas();
    if (areasResponse.data && areasResponse.status) {
      setAreas(areasResponse.data.areas);
    }
  }

  return (
    <div className="add-restaurant-basic-details-page-container">
      <AddRestaurantBasicDetailsForm
        states={states}
        cuisines={allCuisines}
        mainCourses={mainCourses}
        onAddRestaurantBasicDetails={onAddRestaurentBasicDetails}
        areas={areas}
        className="add-restaurant-basic-details-page-form-comp"
      />
    </div>
  );
}
