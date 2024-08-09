import { STORIES_TO_BE_EVALUATED } from "core/constants/Actions";
import { Action } from "core/models/ActionTypes";
import { Stories } from "core/models/stories";

const initialValues: { stories: Stories[], storiesToBeEvaluatedCount: number, storiesToBeEvaluatedIsLoading: boolean } = {
  stories: [],
  storiesToBeEvaluatedCount: 0,
  storiesToBeEvaluatedIsLoading: false
}

interface ActionType extends Action {
  payload: {
    stories: Stories[],
    count: number
  }
}

export default function getStoriesToBeEvaluatedReducer(state = initialValues, action: ActionType) {
  switch (action.type) {
    case STORIES_TO_BE_EVALUATED.REQUEST:
      return { ...state, storiesToBeEvaluatedisLoading: true }
    case STORIES_TO_BE_EVALUATED.SUCCESS:
      const { stories, count } = action.payload
      return { stories, storiesToBeEvaluatedCount: count, storiesToBeEvaluatedIsLoading: false }
    case STORIES_TO_BE_EVALUATED.FAILURE:
      return { ...initialValues, ...state, storiesToBeEvaluated: false }
    default: return state
  }
}