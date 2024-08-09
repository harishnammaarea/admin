import { LIVE_CONTEST_STORIES } from "core/constants/Actions";
import { Action } from "core/models/ActionTypes";
import { Stories } from "core/models/stories";

const initialState:{stories:Stories[], liveContestStoriesIsLoading:boolean,count:number,isLive:Boolean}={
    stories:[],
    liveContestStoriesIsLoading:false,
    count:0,
    isLive:false
}

interface ActionType extends Action {
  payload:{
    stories:Stories[],
    count:number,
    isLive:boolean
  }
}

export default function getLiveContestStoriesReducer(state=initialState,action:ActionType) {
    switch (action.type) {
        case LIVE_CONTEST_STORIES.REQUEST :
            return {...state, liveContestStoriesIsLoading:true}
        case LIVE_CONTEST_STORIES.SUCCESS:
          const {stories,count,isLive}=action.payload
          return {stories,count,isLive, liveContestStoriesIsLoading:false}
          case LIVE_CONTEST_STORIES.FAILURE:
          return {...state,...initialState, liveContestStoriesIsLoading:false}
        default:
            return state
    }
}