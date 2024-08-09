import { AppliedSchools } from "core/models/AppliedSchools";
import { Action } from 'core/models/ActionTypes'
import { APPLIED_SCHOOL_LIST_ACTION } from "core/constants/Actions";


const initalState: { appliedSchools: [], count: number, isLoading: boolean } = {
    appliedSchools: [],
    count: 0,
    isLoading: false
}

interface ActionType extends Action {
    payload: {
        appliedSchools: AppliedSchools,
        count: string | number
    }
}


export default function getAppliedSchoolsReducer(state = initalState, action: ActionType) {
    switch (action.type) {
        case APPLIED_SCHOOL_LIST_ACTION.REQUEST:
            return { ...state, isLoading: true }

        case APPLIED_SCHOOL_LIST_ACTION.SUCCESS:
            const { appliedSchools, count } = action.payload;
            return { ...state, appliedSchools, count, isLoading: false }

        case APPLIED_SCHOOL_LIST_ACTION.FAILURE:
            return { ...state, ...initalState }

        default:
            return state
    }
}