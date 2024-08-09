import { useJsApiLoader } from "@react-google-maps/api";
import history from "App/History";
import { NotifierContext } from "App/Notifier";
import AddRestaurantLocationDetailsForm, { AddLocationReduxFormProps } from "components/AddRestaurantLocationDetailsForm";
import { SelectOptions } from "core/models/Options";
import { locateAddressApi } from "core/services/others";
import { getAreas } from "core/services/restaurants";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

type Params = {
  restaurantId: string
}

export default function UpdateRestaurantLocationDetails() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "",
  })
  const [location, setLocation] = useState < { lat: number, lng: number } > ({ lat: 12.971599, lng: 77.594566 })
  const [areas, setAreas] = useState < SelectOptions[] > ([]);
  const { showNotification } = useContext(NotifierContext)
  const [coordsUpdated, setCoorsUpdated] = useState(false)
  const { restaurantId } = useParams < Params > ()

  useEffect(() => {
    if (!restaurantId || isNaN(Number(restaurantId))) {
      history.push("/restaurants")
    }
    else {
      handleGetAreas()
    }
  }, [])


  async function handleGetAreas() {
    const areasResponse = await getAreas();
    if (areasResponse.data && areasResponse.status) {
      setAreas(areasResponse.data.areas);
    }
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

  async function handleOnAddLocationDetails(values: AddLocationReduxFormProps) {
    if (!coordsUpdated) {
      showNotification({ type: "warning", message: "Please updated the coords!", title: "Request" })
      return
    }
  }

  return (
    <div className="add-restaurant-location-details-page">
      <AddRestaurantLocationDetailsForm
        locationDetails={null}
        isLoaded={isLoaded}
        location={location}
        onConfirmAddress={handleConfirmLocation}
        areas={areas}
        onAddLocationDetails={handleOnAddLocationDetails}

      />
    </div>)
}