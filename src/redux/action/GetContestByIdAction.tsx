import { TypedDispatch, TypedThunk } from "App/Store";
import { GET_CONTEST_BY_ID } from "core/constants/Actions";
import { getContestById } from "core/services/contest";

export default function GetContestByIdAction(contestId: number): TypedThunk {

  return async (dispatch: TypedDispatch): Promise<void> => {
    dispatch({ type: GET_CONTEST_BY_ID.REQUEST })
    const getContestByIdResponse = await getContestById(contestId)
    if (getContestByIdResponse.status && getContestByIdResponse.data) {
      dispatch({
        type: GET_CONTEST_BY_ID.SUCCESS,
        payload: { contest: getContestByIdResponse.data.contest }
      })
    }
    else {
      dispatch({ type: GET_CONTEST_BY_ID.FAILURE })
    }
  }
}
