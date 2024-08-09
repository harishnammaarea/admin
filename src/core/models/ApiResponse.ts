import { AppliedSchools } from "./AppliedSchools";
import Option, { SelectOptions } from "./Options";
import { Contest } from "./Contest";
import { Judge } from "./Judges";
import { Stories } from "./stories";
import { Extras, MainCourses, Menus, RestaurantDetails } from "./restaurants";

export interface ResponseData {
    count: number,
    schools: AppliedSchools[],
    contestId: number,
    token: string,
    categories: Option[],
    durations: Option[],
    prizes: Option[],
    liveContest: Contest,
    url: string,
    countryCodes: Option[]
    countries: Option[]
    judges: Judge
    judge: Judge
    contests: Contest[]
    storiesCount: number
    message: string
    storiesEvaluatedCount: number
    stories: Stories[]
    isLive: boolean
    contest: Contest
    restaurantDetails: RestaurantDetails
    areas: SelectOptions[]
    urls: string[]
    mainCourses: MainCourses[]
    allRestaurants: RestaurantDetails[]
    allCuisines: string[]
    states: SelectOptions[]
    restaurantId:number
    menu:Menus[]
    extras:Extras[]
}

export interface ApiResponse {
    status: 0 | 1;
    data?: ResponseData;
    message?: string;
}