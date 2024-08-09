import { TypedDispatch, TypedThunk } from "App/Store";
import { ALL_CONTESTS_ACTION } from "core/constants/Actions";
import { getAllContests } from "core/services/contest";

export  function allContestsAction(page?:number,size?:number):TypedThunk {
  return async (dispatch:TypedDispatch)=> {
    dispatch({type:ALL_CONTESTS_ACTION.REQUEST})
    const allContestsResponse=await getAllContests(page,size)
    if(allContestsResponse.data && allContestsResponse.status) {
        dispatch({type:ALL_CONTESTS_ACTION.SUCCESS,payload:{allContests:allContestsResponse.data.contests,
          count:allContestsResponse.data.count,
          storiesCount:allContestsResponse.data.storiesCount,
          stories:allContestsResponse.data.stories
        }})
    }
    else {
        dispatch({type:ALL_CONTESTS_ACTION.FAILURE})
    }
  }
}
