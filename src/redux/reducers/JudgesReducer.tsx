import { JUDGE_ACTION } from "core/constants/Actions";
import { Action } from "core/models/ActionTypes";
import { Judge } from "core/models/Judges";

const initialState: { judges: Judge[], isLoading: boolean, count: number } = {
  judges: [],
  isLoading: false,
  count: 0
}

interface ActionType extends Action {
  payload: {
    judges: Judge[]
    count: number
  }
}

export default function judgesReducer(state = initialState, action: ActionType) {
  switch (action.type) {
    case JUDGE_ACTION.REQUEST:
      return { ...state, isLoading: true }
    case JUDGE_ACTION.SUCCESS:
      const { judges, count } = action.payload
      return { ...state, judges: judges, count: count, isLoading: false }
    case JUDGE_ACTION.FAILURE:
      return { ...initialState, ...state }
    default: return state
  }
} 
