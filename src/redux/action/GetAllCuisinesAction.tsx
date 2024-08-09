import { TypedDispatch, TypedThunk } from "App/Store";
import { GET_ALL_CUISINES } from "core/constants/Actions";
import { getAllCuisines } from "core/services/restaurants";

export default function getAllCuisinesAction(): TypedThunk {
  return async (dispatch: TypedDispatch): Promise<void> => {
    dispatch({ type: GET_ALL_CUISINES.REQUEST })
    const getAllCuisinesResponse = await getAllCuisines()
    if (getAllCuisinesResponse.status && getAllCuisinesResponse.data) {
      dispatch({ type: GET_ALL_CUISINES.SUCCESS, payload: getAllCuisinesResponse.data.allCuisines })
    }
    else {
      dispatch({ type: GET_ALL_CUISINES.FAILURE })
    }
  }
}