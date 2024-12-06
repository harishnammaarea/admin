import { CreateMenuComboFormMainDetails } from "components/CreateMenuItemsCustomizerForm";
import { CreateMenuComboOptiosForm } from "components/CreateMenuItemsCustomizerForm/CreateMenuItemsCustomizersOptionsForm";
import { handleError } from "core/helpers/HandleError";
import { handleResponse } from "core/helpers/HanldeResponse";
import { AuthHttpClient } from "core/helpers/HttpClient";

export function getAllCustomizerTypesApi() {
  return AuthHttpClient.get("/customizers/getAllCustomizerTypes")
    .then(handleResponse)
    .catch(handleError)
}

export function createMenuItemsCustomizerApi(data: CreateMenuComboFormMainDetails & { options: CreateMenuComboOptiosForm[] }, id: string) {
  console.log(data)
  return AuthHttpClient.put(`/customizers/createMenuItemsCustomizer/${id}`, data)
    .then(handleResponse)
    .catch(handleError)
}

export function updateMenuItemsCustmizerApi(data: CreateMenuComboFormMainDetails & { options: CreateMenuComboOptiosForm[] }, id: string) {
  return AuthHttpClient.put(`/customizers/updateMenuItemsCustomizer/${id}`, data)
    .then(handleResponse)
    .catch(handleError)
}