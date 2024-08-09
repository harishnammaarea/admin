import { handleError } from "core/helpers/HandleError";
import { handleResponse } from "core/helpers/HanldeResponse";
import { AuthHttpClient } from "core/helpers/HttpClient";

export function getStoriestobeEvaluated(contestId: number, page: number = 0, size: number = 2) {
  return AuthHttpClient
    .get(`/stories/admin/getStoriesTobeEvaluated/${contestId}?page=${page}&size=${size}`)
    .then(handleResponse)
    .catch(handleError)
}

export function getLiveContestStories() {
   return AuthHttpClient
   .get(`/stories/admin/getLiveContestStories`)
   .then(handleResponse)
   .catch(handleError)
}