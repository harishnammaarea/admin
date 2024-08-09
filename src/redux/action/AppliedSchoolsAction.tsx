import { TypedDispatch, TypedThunk } from 'App/Store'
import { APPLIED_SCHOOL_LIST_ACTION } from 'core/constants/Actions'
import { Pagination } from 'core/models/pagination'
import { getAppliedSchools } from 'core/services/Schools'

export function getAppliedSchoolListAction(params: Pagination): TypedThunk {
    return async (dispatch: TypedDispatch): Promise<void> => {
        dispatch({ type: APPLIED_SCHOOL_LIST_ACTION.REQUEST })
        const apiResponse = await getAppliedSchools(params)
        if (apiResponse.status && apiResponse.data) {
            dispatch({
                type: APPLIED_SCHOOL_LIST_ACTION.SUCCESS,
                payload: { appliedSchools: apiResponse.data.schools, count: apiResponse.data.count }
            })
        } else {
            dispatch({
                type: APPLIED_SCHOOL_LIST_ACTION.FAILURE
            })
        }
    }
}