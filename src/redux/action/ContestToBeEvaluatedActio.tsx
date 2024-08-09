import { TypedDispatch, TypedThunk } from "App/Store";
import { ALL_CONTESTS_ACTION, CONTEST_TO_BE_EVALUATED_ACTION } from "core/constants/Actions";
import { getContestsToBeEvaluated } from "core/services/contest";

export default function contestsToBeEvaluatedAction(): TypedThunk {
  return async (dispatch: TypedDispatch): Promise<void> => {
    dispatch({ type: CONTEST_TO_BE_EVALUATED_ACTION.REQUEST })
    const response = await getContestsToBeEvaluated()
    if (response.data && response.status) {
      dispatch({
        type: CONTEST_TO_BE_EVALUATED_ACTION.SUCCESS,
        payload: {
          contests: response.data.contests,
          count: response.data.count,
          evaluatedStories: response.data.storiesEvaluatedCount
        }
      })
    }
    else {
      dispatch({ type: ALL_CONTESTS_ACTION.FAILURE })
    }
  }
}