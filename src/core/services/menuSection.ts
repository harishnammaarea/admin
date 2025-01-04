import { UpdateMenuSectionProps } from "components/CreateMenuSectionFormContainer";
import { handleError } from "core/helpers/HandleError";
import { handleResponse } from "core/helpers/HanldeResponse";
import { AuthHttpClient } from "core/helpers/HttpClient";

export default function updateMenuSectionApi(data:UpdateMenuSectionProps,id: string) {
  return AuthHttpClient.put(`/menu/updateRestaurantMenuSection/${id}`,data)
    .then(handleResponse)
    .catch(handleError)
}