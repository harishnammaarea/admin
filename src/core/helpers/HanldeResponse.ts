import { AxiosResponse } from "axios";
import { ApiResponse } from "core/models/ApiResponse";

export function handleResponse(apiResponse: AxiosResponse<ApiResponse>) {
    return apiResponse.data
}