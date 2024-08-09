import { handleError } from "core/helpers/HandleError";
import { handleResponse } from "core/helpers/HanldeResponse";
import { AuthHttpClient } from "core/helpers/HttpClient";

export function uploadSingleFile(files: FormData) {
  const headers = {
    contentType: "multipart/form-data"
  }
  return AuthHttpClient
    .post("/core/upload", files, { headers })
    .then(handleResponse)
    .catch(handleError)
}

export function uploadMultiplefiles(files: FormData) {
  const headers = {
    contentType: "multipart/form-data"
  }
  return AuthHttpClient
    .post("/core/uploadMultipleFiles", files, { headers })
    .then(handleResponse)
    .catch(handleError)
}
