import { CONTEST_TO_BE_EVALUATED_ACTION } from "core/constants/Actions";
import { Action } from "core/models/ActionTypes";
import { Contest } from "core/models/Contest";

const initialState: { contestTobeEvaluatedIsLoading: boolean, contests: Contest[], count: number, evaluatedStories:number } = {
	contestTobeEvaluatedIsLoading: false,
	contests: [],
	count: 0,
	evaluatedStories:0
}

interface ActionType extends Action {
	payload: {
		count: number,
		contests: Contest[]
    evaluatedStories:number
	}
}

export default function contestToBeEvaluatedReducer(state = initialState, action: ActionType) {
	switch (action.type) {
		case CONTEST_TO_BE_EVALUATED_ACTION.REQUEST: {
			return { ...state,contestTobeEvaluatedIsLoading : true }
		}
		case CONTEST_TO_BE_EVALUATED_ACTION.SUCCESS: {
			const { contests, count, evaluatedStories } = action.payload
			return { contests, count, contestTobeEvaluatedIsLoading: false, evaluatedStories }
		}
		case CONTEST_TO_BE_EVALUATED_ACTION.FAILURE: {
			return { ...state, ...initialState, isLoading: false }
		}
		default: return state
	}
}