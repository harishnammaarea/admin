import { AxiosError } from "axios"
import { ApiResponse } from "core/models/ApiResponse"

export function handleError(errorResponse: AxiosError<ApiResponse>): ApiResponse {
    if(errorResponse.response) {
        return errorResponse.response.data
    }
    else if (errorResponse.request) {
        return {
            status: 0,
            message: 'No response from server'
        }
    }
    else {
        return {
            status: 0,
            message: errorResponse.message
        }
    }
}