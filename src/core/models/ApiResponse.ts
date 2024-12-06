import { AppliedSchools } from "./AppliedSchools";
import Option, { SelectOptions } from "./Options";
import { Contest } from "./Contest";
import { Judge } from "./Judges";
import { Stories } from "./stories";
import { Cuisine, Extras, MainCourses, RestaurantDetails, Restaurants } from "./restaurants";
import {  MenuItem, MenuItemsCustomizer, Menus, MenuSection } from "./menu";

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
    areas: SelectOptions[]
    urls: string[]
    mainCourses: MainCourses[]
    allRestaurants: RestaurantDetails[]
    allCuisines: string[]
    states: SelectOptions[]
    restaurantId:number
    menuItems:Menus
    menuItem:MenuItem
    extras:Extras[]
    cuisines:Cuisine[]
    restaurants:Restaurants[]
    restaurant:Restaurants
    menuSections:MenuSection
    menuSection:MenuSection
    menuItemsCount:number
    customizers:MenuItemsCustomizer[]
    customizerTypes:SelectOptions[]
}

export interface ApiResponse {
    status: 0 | 1;
    data?: ResponseData;
    message?: string;
}