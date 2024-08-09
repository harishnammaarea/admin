import { ALL_CONTESTS_ACTION } from "core/constants/Actions";
import { Action } from "core/models/ActionTypes";
import { Contest } from "core/models/Contest";
import { Stories } from "core/models/stories";

const initialState: {
  allContests: Contest[],
  count: number,
  allContestsIsLoading: boolean
  , storiesCount: number,
  stories: Stories[]
} = {
  allContests: [],
  count: 0,
  allContestsIsLoading: false,
  storiesCount: 0,
  stories: []
}

interface ActionType extends Action {
  payload: {
    allContests: Contest[],
    count: number,
    storiesCount: number
    stories: Stories[]
  }
}
export default function allContestReducer(state = initialState, action: ActionType) {
  switch (action.type) {
    case ALL_CONTESTS_ACTION.REQUEST:
      return { ...state, allContestsIsLoading: true }
    case ALL_CONTESTS_ACTION.SUCCESS:
      const { allContests, count, storiesCount, stories } = action.payload
      return { ...state, allContests, count, allContestsIsLoading: false, storiesCount, stories }
    case ALL_CONTESTS_ACTION.FAILURE:
      return { ...state, ...initialState }
    default: return state
  }
}