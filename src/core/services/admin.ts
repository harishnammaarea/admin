import { handleError } from "core/helpers/HandleError";
import { handleResponse } from "core/helpers/HanldeResponse";
import { AuthHttpClient } from "core/helpers/HttpClient";

export function adminLogin(data: any) {
  return AuthHttpClient.post("/admin/login", data)
    .then(handleResponse)
    .catch(handleError);
}

export function getCountryCodes() {
  return AuthHttpClient.get("/user/getCountryCodes")
    .then(handleResponse)
    .catch(handleError);
}

export function getCountries() {
  return AuthHttpClient.get("/user/getUserCountries")
    .then(handleResponse)
    .catch(handleError);
}

export function adminMobileOtpLogin(data:any) {
  return AuthHttpClient.post("/admin/mobileOtpLogin",data)
    .then(handleResponse)
    .catch(handleError);
}
