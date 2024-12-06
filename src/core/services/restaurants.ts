import { handleError } from "core/helpers/HandleError";
import { handleResponse } from "core/helpers/HanldeResponse";
import { AuthHttpClient } from "core/helpers/HttpClient";

export function createRestaurantApi(data: any) {
  return AuthHttpClient.post("/restaurants/createRestaurant", data)
    .then(handleResponse)
    .catch(handleError)
}

export function getCuisinesApi() {
  return AuthHttpClient.get("/restaurants/getAllCusines")
    .then(handleResponse)
    .catch(handleError)
}

export function getRestaurantsApi(size = 0, limit = 5) {
  return AuthHttpClient.get(`restaurants/getAllRestaurants?size=${size}&limit=${limit}`)
    .then(handleResponse)
    .catch(handleError)
}

export function getRestaurantByIdApi(id: string) {
  return AuthHttpClient.get(`/restaurants/getRestaurantById/${id}`)
    .then(handleResponse)
    .catch(handleError)
}

export function updateRestaurantByIdApi(id: string, data: any) {
  return AuthHttpClient.put(`/restaurants/updateRestaurant/${id}`, data)
    .then(handleResponse)
    .catch(handleError)
}

export function updateRestaurantLogoApi(id: string, data: { logo: string }) {
  return AuthHttpClient.put(`/restaurants/updateRestaurantLogo/${id}`, data)
    .then(handleResponse)
    .catch(handleError)
}