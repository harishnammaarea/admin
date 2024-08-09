import { handleError } from "core/helpers/HandleError";
import { handleResponse } from "core/helpers/HanldeResponse";
import { AuthHttpClient } from "core/helpers/HttpClient";
import { Extras } from "core/models/restaurants";

export default function addRestaurantBasicDetails(data: any) {
  return AuthHttpClient.post("/restaurants/addRestaurantBasicDetails", data)
    .then(handleResponse)
    .catch(handleError)
}

export function updateRestaurantBasicDetailsApi(data: any, id: number | string) {
  return AuthHttpClient.put(`/restaurants/updateRestaurantBasicDetails/${id}`, data)
    .then(handleResponse)
    .catch(handleError)
}

export function addLocationDetailsApi(data: any, restaurantId: number) {
  return AuthHttpClient.post(`/restaurants/addRestaurantLocationDetails/${restaurantId}`)
    .then(handleResponse)
    .catch(handleError)
}

export function getRestuarantDetails(id: string | number) {
  return AuthHttpClient.get(`/restaurants/getRestaurantDetails/${id}`)
    .then(handleResponse)
    .catch(handleError)
}

export function getAreas() {
  return AuthHttpClient.get("/restaurants/getAreas")
    .then(handleResponse)
    .catch(handleError)
}

export function addMenuDetailsApi(data: any, restaurantId: number) {
  return AuthHttpClient.post(`/restaurants/addMenu/${restaurantId}}`, data)
    .then(handleResponse)
    .catch(handleError)
}

export function getAllMainCoursesApi() {
  return AuthHttpClient.get("/restaurants/admin/getAllMainCourses")
    .then(handleResponse)
    .catch(handleError)
}

export function getAllRestaurantsApi(page = 0, size = 2) {
  return AuthHttpClient.get(`/restaurants/admin/getAllRestaurants?page=${page}&size=${size}`)
    .then(handleResponse)
    .catch(handleError)
}

export function getAllCuisines() {
  return AuthHttpClient.get("/restaurants/getAllCuisines")
    .then(handleResponse)
    .catch(handleError)
}


export function getAllStatesApi() {
  return AuthHttpClient
    .get("/restaurants/getAllStates")
    .then(handleResponse)
    .catch(handleError)
}

export function startOnBoardingProcessApi(data: any) {
  return AuthHttpClient
    .post("/restaurants/startApplicationProcess", data)
    .then(handleResponse)
    .catch(handleError)
}

export function addMenuExtrasApi(data: Extras[], restaurantId: number) {
  return AuthHttpClient
    .post(`/restaurants/addMenuExtraItems/${restaurantId}`, data)
    .then(handleResponse)
    .catch(handleError)
}

export function getAllRestaurantsMenuItemsApi(restaurantId: number, page = 0, size = 10) {
  return AuthHttpClient
    .get(`/restaurants/get-all-restaurant-menu-items/${restaurantId}?page=${page}&size=${size}`)
    .then(handleResponse)
    .catch(handleError)
}

export function getAllRestaurantExtrasApi(restaurantId: number, page = 0, size = 10) {
  return AuthHttpClient
    .get(`/restaurants/admin/get-all-restaurant-extras/${restaurantId}?page=${page}&size=${size}`)
    .then(handleResponse)
    .catch(handleError)
}

export function updateRestaurantExtraDetailsApi(data: Extras[], id: number) {
  return AuthHttpClient
    .put(`/restaurants/admin/update-extra-details/${id}`, data)
    .then(handleResponse)
    .catch(handleError)
}

export function removeMenuExtraApi(id: number) {
  return AuthHttpClient
    .delete(`/restaurants/admin/remove-menu-extra/${id}`)
    .then(handleResponse)
    .catch(handleError)
}