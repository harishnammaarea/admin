import { GET_CONTEST_BY_ID } from "core/constants/Actions";
import { Action } from "core/models/ActionTypes";
import { Contest } from "core/models/Contest";

const initialValues: { getContestByIdIsLoading: boolean, contest: Contest | null } = {
  getContestByIdIsLoading: false,
  contest: null
}

interface ActionTypes extends Action {
  payload: {
    contest: Contest
  }
}

export default function getContestByIdReducer(state = initialValues, action: ActionTypes) {
  switch (action.type) {
    case GET_CONTEST_BY_ID.REQUEST:
      return { ...state, ...initialValues, getContestByIdIsLoading: true }
    case GET_CONTEST_BY_ID.SUCCESS:
      const { contest } = action.payload
      return { contest, getContestByIdIsLoading: false }
    case GET_CONTEST_BY_ID.FAILURE:
      return { ...state,...initialValues, getContestByIdIsLoading: false }
    default:
      return state
  }
}