import { handleError } from "core/helpers/HandleError";
import { handleResponse } from "core/helpers/HanldeResponse";
import { AuthHttpClient } from "core/helpers/HttpClient";
import { Judge } from "core/models/Judges";

export function addJudge(data: any) {
  return AuthHttpClient.post("/judge/admin/addJudge", data)
    .then(handleResponse)
    .catch(handleError);
}

export function judgeLogin(data: any) {
  return AuthHttpClient.post("/auth/admin/judgeLogin", data)
    .then(handleResponse)
    .catch(handleError);
}

export function getAllJudges() {
  return AuthHttpClient.get("/judge/admin/getAllJudges")
    .then(handleResponse)
    .catch(handleError);
}

export function getJudgeDetails(judgeId:number) {
  return AuthHttpClient.get(`/judge/admin/getJudgeDetails/${judgeId}`)
  .then(handleResponse)
  .catch(handleError)
}

export function updateJudgeDetails(data:Judge) {
 return AuthHttpClient.put("/judge/updateJudgeDetails",data)
 .then(handleResponse)
 .catch(handleError)
}
