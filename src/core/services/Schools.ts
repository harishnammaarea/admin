import { handleError } from "core/helpers/HandleError";
import { handleResponse } from "core/helpers/HanldeResponse";
import { AuthHttpClient } from "core/helpers/HttpClient";

export function addApiSchool() {
    return AuthHttpClient
        .post('/appliedschools/addSchool')
        .then(handleResponse)
        .catch(handleError)
}

export function getAppliedSchools(pagination: any) {
    return AuthHttpClient
        .get('/appliedschools/appliedSchoolList', { params: { ...pagination } })
        .then(handleResponse)
        .catch(handleError)
}