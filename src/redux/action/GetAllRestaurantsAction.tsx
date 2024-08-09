import { TypedDispatch, TypedThunk } from "App/Store";
import { GET_ALL_RESTAURANTS } from "core/constants/Actions";
import { getAllRestaurantsApi } from "core/services/restaurants";

export default function GetAllRestaurantsAction(page: number, size: number): TypedThunk {
  return async (dispatch: TypedDispatch): Promise<void> => {
    dispatch({ type: GET_ALL_RESTAURANTS.REQUEST })
    const allRestaurantsResponse = await getAllRestaurantsApi(page, size)
    if (allRestaurantsResponse.data && allRestaurantsResponse.status) {
      dispatch({
        type: GET_ALL_RESTAURANTS.SUCCESS,
        payload: { allRestaurants: allRestaurantsResponse.data.allRestaurants, count: allRestaurantsResponse.data.count }
      })
    }
    else {
      dispatch({ type: GET_ALL_RESTAURANTS.FAILURE })
    }
  }
}