import { GET_ALL_CUISINES } from "core/constants/Actions";
import { Action } from "core/models/ActionTypes"

const initialState: { allCuisines: string[] | null, isLoadingAllCuisines: boolean } = {
  allCuisines: [],
  isLoadingAllCuisines: false
}

interface ActionTypes extends Action {
  payload: {
    allCuisines: string[]
  }
}
export default function GetAllCuisinesReducer(state = initialState, action: ActionTypes) {
  switch (action.type) {
    case GET_ALL_CUISINES.REQUEST:
      return { ...initialState, ...state, isLoadingAllCuisines: true }
    case GET_ALL_CUISINES.SUCCESS:
      const allCuisines = action.payload
      return { allCuisines, isLoadingAllCuisines: false }
    case GET_ALL_CUISINES.FAILURE:
      return { ...initialState, ...state, isLoadingAllCuisines: false }
    default:
      return state
  }
}