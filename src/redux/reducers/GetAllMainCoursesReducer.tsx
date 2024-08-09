import { GET_ALL_MAIN_COURSES } from "core/constants/Actions";
import { Action } from "core/models/ActionTypes";
import { MainCourses } from "core/models/restaurants";

const initialValues: { mainCourses: MainCourses[] | null, mainCoursesIsLoading: boolean } = {
  mainCourses: [],
  mainCoursesIsLoading: false
}

interface ActionTypes extends Action {
  payload: {
    mainCourses: MainCourses[]
  }
}

export default function getAllMainCoursesReducer(state = initialValues, action: ActionTypes) {
  switch (action.type) {
    case GET_ALL_MAIN_COURSES.REQUEST:
      return { ...initialValues, ...state, mainCoursesIsLoading: true }
    case GET_ALL_MAIN_COURSES.SUCCESS:
      const { mainCourses } = action.payload
      return { mainCourses, mainCoursesIsLoading: false }
    case GET_ALL_MAIN_COURSES.FAILURE:
      return { ...initialValues, ...state, mainCourses: false }
    default:
      return state
  }
}