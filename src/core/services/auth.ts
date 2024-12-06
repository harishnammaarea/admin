import { handleError } from "core/helpers/HandleError";
import { handleResponse } from "core/helpers/HanldeResponse";
import { AuthHttpClient } from "core/helpers/HttpClient";

export function areaAdminLoginApi(data: any) {
  return AuthHttpClient.post("/auth/superAdminLogin", data)
    .then(handleResponse)
    .catch(handleError)
}

