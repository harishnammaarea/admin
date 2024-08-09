import { TypedDispatch, TypedThunk } from "App/Store";
import { STORIES_TO_BE_EVALUATED } from "core/constants/Actions";
import { getStoriestobeEvaluated } from "core/services/stories";

export function getStoriesToBeEvaluatedAction(contestId: number, page: number = 0, size: number = 0): TypedThunk {
  return async (dispatch: TypedDispatch): Promise<void> => {
    dispatch({ type: STORIES_TO_BE_EVALUATED.REQUEST })
    const storiesToBeEvaluatedResponse = await getStoriestobeEvaluated(contestId,page,size)
    if (storiesToBeEvaluatedResponse.data && storiesToBeEvaluatedResponse.status) {
      const { stories, count } = storiesToBeEvaluatedResponse.data
      dispatch({ type: STORIES_TO_BE_EVALUATED.SUCCESS, payload: { stories, count } })
    }
    else {
      dispatch({ type: STORIES_TO_BE_EVALUATED.FAILURE })
    }
  }
}