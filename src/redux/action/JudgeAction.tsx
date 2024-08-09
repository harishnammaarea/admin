import { TypedDispatch, TypedThunk } from "App/Store";
import { JUDGE_ACTION } from "core/constants/Actions";
import { getAllJudges } from "core/services/judges";

export function JudgeAction(): TypedThunk {
  return async (dispatch: TypedDispatch): Promise<void> => {
    dispatch({ type: JUDGE_ACTION.REQUEST })
    const judgesResponse = await getAllJudges()
    if (judgesResponse.data && judgesResponse.status) {
      dispatch({ type: JUDGE_ACTION.SUCCESS, payload: { judges: judgesResponse.data.judges, count: judgesResponse.data.count } })
    }
    else {
      dispatch({ type: JUDGE_ACTION.FAILURE })
    }
  }
}
