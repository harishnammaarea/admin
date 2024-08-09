import { handleError } from "core/helpers/HandleError";
import { handleResponse } from "core/helpers/HanldeResponse";
import { AuthHttpClient } from "core/helpers/HttpClient";

export default function upload(files:FormData) {
  return AuthHttpClient
  .post("/core/upload",files)
  .then(handleResponse)
  .catch(handleError)
}