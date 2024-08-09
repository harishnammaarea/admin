import { LIVE_CONTEST_ACTION } from "core/constants/Actions";
import { Action } from "core/models/ActionTypes";
import { Contest } from "core/models/Contest";

const initialState: {contest:Contest | null ,liveContestIsLoading:boolean} = {
    contest:null,
    liveContestIsLoading: false
}

interface ActionType extends Action {
   payload:{
    contest:Contest
   }
}

export default function liveContestReducer(state = initialState, action: ActionType) {
    switch (action.type) {
        case LIVE_CONTEST_ACTION.REQUEST:
            return { ...state, liveContestIsLoading: true }

        case LIVE_CONTEST_ACTION.SUCCESS:
            const { contest } = action.payload;
            return { ...state, contest, liveContestIsLoading: false }

        case LIVE_CONTEST_ACTION.FAILURE:
            return {...state,...initialState}    

        default: return state
    }
}