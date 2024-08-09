import { GET_RESTAURANT_DETAILS } from "core/constants/Actions";
import { Action } from "core/models/ActionTypes";
import { RestaurantDetails } from "core/models/restaurants";

const initialState: { isLoading: boolean, restuarantDetails: null } = {
  isLoading: false,
  restuarantDetails: null
}

interface ActionTypes extends Action {
  payload: {
    restuarantDetails: RestaurantDetails
  }
}

export default function getRestuarantDetailsReducer(state = initialState, action: ActionTypes) {
  switch (action.type) {
    case GET_RESTAURANT_DETAILS.REQUEST:
      return { ...initialState, ...state, isLoading: true }
    case GET_RESTAURANT_DETAILS.SUCCESS:
      const { payload } = action
      return { restuarantDetails: payload, isLoading: false }
    case GET_RESTAURANT_DETAILS.FAILURE:
      return { ...state, ...initialState, isLoading: false }
    default:
      return state
  }
}