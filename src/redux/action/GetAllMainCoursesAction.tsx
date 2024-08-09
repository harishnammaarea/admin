import { TypedDispatch, TypedThunk } from "App/Store";
import { GET_ALL_MAIN_COURSES } from "core/constants/Actions";
import { getAllMainCoursesApi } from "core/services/restaurants";

export default function GetAllMainCoursesAction(): TypedThunk {
    return async (dispatch: TypedDispatch) => {
        dispatch({ type: GET_ALL_MAIN_COURSES.REQUEST })

        const mainCourseResponse = await getAllMainCoursesApi()
        if (mainCourseResponse.status && mainCourseResponse.data) {
            dispatch({ type: GET_ALL_MAIN_COURSES.SUCCESS, payload: { mainCourses: mainCourseResponse.data.mainCourses } })
        }
        else {
            dispatch({ type: GET_ALL_MAIN_COURSES.FAILURE })
        }
    }
}