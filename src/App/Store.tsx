import { applyMiddleware, combineReducers } from 'redux'
import { legacy_createStore as createStore } from 'redux';
import thunkMiddleware, { ThunkAction, ThunkDispatch } from 'redux-thunk'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { reducer as reduxFormReducer } from 'redux-form'

import { Action } from '../core/models/ActionTypes'
import getAppliedSchoolsReducer from 'redux/reducers/AppliedSchoolsReducer'
import {
    allContestReducer,
    contestToBeEvaluatedReducer,
    judgesReducer,
    liveContestReducer,
    loaderReducer,
    getStoriesToBeEvaluatedReducer,
    getLiveContestStoriesReducer,
    getContestByIdReducer,
    getRestuarantDetailsReducer,
    getAllMainCoursesReducer,
    GetAllRestaurantsReducer,
    GetAllCuisinesReducer,
} from 'redux/reducers'

const reducer = combineReducers({
    form: reduxFormReducer,
    appliedSchools: getAppliedSchoolsReducer,
    loader: loaderReducer,
    liveContest: liveContestReducer,
    judges: judgesReducer,
    allContests: allContestReducer,
    contestTobeEvaluated: contestToBeEvaluatedReducer,
    storiesTobeEvaluated: getStoriesToBeEvaluatedReducer,
    liveContestStories: getLiveContestStoriesReducer,
    contest: getContestByIdReducer,
    restaurantDetails: getRestuarantDetailsReducer,
    mainCourses: getAllMainCoursesReducer,
    allRestaurants: GetAllRestaurantsReducer,
    cuisines:GetAllCuisinesReducer
})

const middlewares = [thunkMiddleware]

const store = createStore(reducer, applyMiddleware(...middlewares))

export default store

export type Store = ReturnType<typeof reducer>
export type TypedDispatch = ThunkDispatch<Store, any, Action>;
export type TypedThunk<ReturnType = void> = ThunkAction<ReturnType, Store, unknown, Action>;

export const useTypedDispatch = () => useDispatch<TypedDispatch>();
export const useTypedSelector: TypedUseSelectorHook<Store> = useSelector;