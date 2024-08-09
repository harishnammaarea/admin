import { TypedDispatch, TypedThunk } from "App/Store";
import { LIVE_CONTEST_ACTION } from "core/constants/Actions";
import { getLiveContest } from "core/services/contest";

export function LiveContestAction(): TypedThunk {
  return async (dispatch: TypedDispatch): Promise<void> => {
    dispatch({ type: LIVE_CONTEST_ACTION.REQUEST })
    const apiResponse = await getLiveContest()
    if (apiResponse.data && apiResponse.status) {
      dispatch({
        type: LIVE_CONTEST_ACTION.SUCCESS,
        payload: { contest: apiResponse.data.liveContest }
      })
    }
    else {
      dispatch({ type: LIVE_CONTEST_ACTION.FAILURE })
    }
  }
}