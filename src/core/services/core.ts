import { handleError } from "core/helpers/HandleError";
import { handleResponse } from "core/helpers/HanldeResponse";
import { AuthHttpClient } from "core/helpers/HttpClient";

export function uploadSingleFileApi(files: FormData) {
  const headers = {
    contentType: "multipart/form-data"
  }
  return AuthHttpClient
    .post("/core/upload", files, { headers })
    .then(handleResponse)
    .catch(handleError)
}

export function uploadfilesApi(files: FormData) {
  const headers = {
    contentType: "multipart/form-data"
  }
  return AuthHttpClient
    .post("/core/uploadFiles", files, { headers })
    .then(handleResponse)
    .catch(handleError)
}
