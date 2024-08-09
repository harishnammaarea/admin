import { handleError } from "core/helpers/HandleError";
import { handleResponse } from "core/helpers/HanldeResponse";
import { AuthHttpClient } from "core/helpers/HttpClient";

export function startContest(contestDetails: any) {
  return AuthHttpClient.post("/contest/startContest", contestDetails)
    .then(handleResponse)
    .catch(handleError);
}

export function getContestFormOptions() {
  return AuthHttpClient.get("/contest/getContestFormOptions")
    .then(handleResponse)
    .catch(handleError);
}

export function getLiveContest() {
  return AuthHttpClient.get("/contest/getLiveContest")
    .then(handleResponse)
    .catch(handleError);
}

export function editContest(contestDetails: any) {
  return AuthHttpClient.put("/contest/editContest", contestDetails)
    .then(handleResponse)
    .catch(handleError);
}

export function pauseContest(contestId: any) {
  return AuthHttpClient.put(`/contest/pause/${contestId}`)
    .then(handleResponse)
    .catch(handleError);
}

export function resumeContest(contestId: any) {
  return AuthHttpClient.put(`/contest/resume/${contestId}`)
    .then(handleResponse)
    .catch(handleError);
}

export function stopContest(contestId: any) {
  return AuthHttpClient.put(`/contest/cancel/${contestId}`)
    .then(handleResponse)
    .catch(handleError);
}

export function getAllContests(page = 0, size = 2) {
  return AuthHttpClient.get(
    `/contest/admin/getAllContests?page=${page}&size=${size}`
  )
    .then(handleResponse)
    .catch(handleError);
}

export function getContestsToBeEvaluated() {
  return AuthHttpClient.get("/contest/admin/getContestsToBeEvaluated")
    .then(handleResponse)
    .catch(handleError);
}

export function getContestById(contestId: number) {
  return AuthHttpClient.get(`/contest/getContestById/${contestId}`)
    .then(handleResponse)
    .catch(handleError);
}


export function updateContestStage(contestId: number) {
  return AuthHttpClient.post("/contest/admin/updateContestStage", { contestId })
    .then(handleResponse)
    .catch(handleError)
}