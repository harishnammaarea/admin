import { TypedDispatch } from "App/Store";
import { LIVE_CONTEST_STORIES } from "core/constants/Actions";
import { getLiveContestStories } from "core/services/stories";

export  function getLiveContestStoriesAction() {
  return async (dispatch: TypedDispatch): Promise<void> => {
    dispatch({type:LIVE_CONTEST_STORIES.REQUEST})
    const liveContestStoriesResponse=await getLiveContestStories()
    if(liveContestStoriesResponse.status && liveContestStoriesResponse.data) {
      const {stories,count,isLive}=liveContestStoriesResponse.data
      dispatch({type:LIVE_CONTEST_STORIES.SUCCESS,payload:{stories,count,isLive}})
    }
  }    
}