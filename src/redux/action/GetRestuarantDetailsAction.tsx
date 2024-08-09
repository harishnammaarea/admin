import history from "App/History";
import { TypedDispatch, TypedThunk } from "App/Store";
import { GET_RESTAURANT_DETAILS } from "core/constants/Actions";
import { getRestuarantDetails } from "core/services/restaurants";

export default function getRestuarantDetailsAction(id: string | number, route: string = ""): TypedThunk {
  return async (dispatch: TypedDispatch) => {
    dispatch({ type: GET_RESTAURANT_DETAILS.REQUEST })
    const restaurantDetails = await getRestuarantDetails(id)
    if (restaurantDetails.data && restaurantDetails.status) {
      dispatch({
        type: GET_RESTAURANT_DETAILS.SUCCESS,
        payload: restaurantDetails.data.restaurantDetails,
        isLoading: false
      })
    }
    else {
      dispatch({ type: GET_RESTAURANT_DETAILS.FAILURE })
      if (route) {
        history.push(route)
      }
    }
  }
}