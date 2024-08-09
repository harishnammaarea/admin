import { GET_ALL_RESTAURANTS } from "core/constants/Actions";
import { Action } from "core/models/ActionTypes";
import { RestaurantDetails } from "core/models/restaurants";

const initialValues: { allRestaurants: null, count: number, isLoadingAllRestaurants: boolean } = {
  allRestaurants: null,
  count: 0,
  isLoadingAllRestaurants: false
}

interface ActionTypes extends Action {
  payload: {
    allRestaurants: RestaurantDetails[],
    count: number
  }
}

export default function GetAllRestaurantsReducer(state = initialValues, action: ActionTypes) {
  switch (action.type) {
    case GET_ALL_RESTAURANTS.REQUEST:
      return { ...initialValues, ...state, isLoadingAllRestaurants: true }
    case GET_ALL_RESTAURANTS.SUCCESS:
      const { allRestaurants, count } = action.payload
      return { allRestaurants, count, isLoadingAllRestaurants: false }
    case GET_ALL_RESTAURANTS.FAILURE:
      return { ...initialValues, ...state, isLoadingAllRestaurants: false }
    default:
      return state
  }
}