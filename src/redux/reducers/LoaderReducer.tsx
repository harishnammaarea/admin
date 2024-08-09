import { LOADER_ACTION } from 'core/constants/Actions'
import { Action } from 'core/models/ActionTypes'

const initialState = {
  isLoading: false
}

export default function loaderReducer(state = initialState, action: Action) {
  switch (action.type) {
    case LOADER_ACTION.SET:
      return { ...state, isLoading: true }

    case LOADER_ACTION.CLEAR:
      return { ...state, isLoading: false }

    default:
      return state
  }
}
