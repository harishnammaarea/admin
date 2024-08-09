import { LOADER_ACTION } from 'core/constants/Actions'
import { Action } from 'core/models/ActionTypes'

export function showLoader(): Action {
  return {
    type: LOADER_ACTION.SET
  }
}

export function hideLoader(): Action {
  return {
    type: LOADER_ACTION.CLEAR
  }
}