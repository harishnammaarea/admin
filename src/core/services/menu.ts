import { AddMenuSectionsFormProps } from "components/CreatedMenuItem/AddMenuItemMenuSections";
import { CreateMenuDetailsFormProps } from "components/CreatedMenuItem/CreateMenuItemForm";
import { CreateMenuSectionPayload, UpdateMenuSectionProps } from "components/CreateMenuSectionFormContainer";
import { handleError } from "core/helpers/HandleError";
import { handleResponse } from "core/helpers/HanldeResponse";
import { AuthHttpClient } from "core/helpers/HttpClient";
import { MenuSection } from "core/models/menu";

export default function getRestaurantMenuSectionsApi(id: string) {
  return AuthHttpClient.get(`/menu/getRestaurantMenuSections/${id}`)
    .then(handleResponse)
    .catch(handleError)
}

export function createRestaurantMenuSectionsApi(restaurantId: string, data: { sections: UpdateMenuSectionProps[] }) {
  return AuthHttpClient.post(`/menu/createMenuSection/${restaurantId}`, data)
    .then(handleResponse)
    .catch(handleError)
}

export function updateRestaurantMenuSectionApi(sectionId: string, data: UpdateMenuSectionProps) {
  return AuthHttpClient.put(`/menu/updateRestaurantMenuSection/${sectionId}`, data)
    .then(handleResponse)
    .catch(handleError)
}

export function updateMenuSectionSubSectionApi(id: string, data: any) {
  return AuthHttpClient.put(`/menu/updateRestaurantMenuSubSection/${id}`, data)
    .then(handleResponse)
    .catch(handleError)
}

export function addMenuSubSectionApi(id: string, data: CreateMenuSectionPayload) {
  return AuthHttpClient.post(`/menu/addRestaurantMenuSubSection/${id}`, data)
    .then(handleResponse)
    .catch(handleError)
}

export function getMenuItemsApi(id: string, page = 0, size = 10) {
  return AuthHttpClient.get(`/menu/getMenuItems/${id}?page=${page}&size=${size}`)
    .then(handleResponse)
    .catch(handleError)
}

export function getAllMenuItemsCustomizerApi(id: string) {
  return AuthHttpClient.get(`/menu/getAllMenuItemsCustomizer/${id}`)
    .then(handleResponse)
    .catch(handleError)
}

export function createMenuItemApi(data: CreateMenuDetailsFormProps & { photos: string[] } & { menuSections: AddMenuSectionsFormProps[] }, id: string) {
  return AuthHttpClient.post(`/menu/createMenuItem/${id}`, data)
    .then(handleResponse)
    .catch(handleError)
}

export function updateMenuItemBasicDetailsApi(data: CreateMenuDetailsFormProps & { photos: string[] } & { menuSections: MenuSection[] }, id: string) {
  return AuthHttpClient.put(`/menu/updateMenuItemBasicDetails/${id}`, data)
    .then(handleResponse)
    .catch(handleError)
}

export function getMenuItemById(menuId: string) {
  return AuthHttpClient.get(`/menu/getMenuItemById/${menuId}`)
    .then(handleResponse)
    .catch(handleError)
}

export function getMenuSectionById(sectionId: string) {
  return AuthHttpClient.get(`/menu/getMenuSectionById/${sectionId}`)
    .then(handleResponse)
    .catch(handleError)
}