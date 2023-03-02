import { ApiResponse, axios_instance } from "./axios"

interface CreateDirRequest {
    path: string;
}


export const create_folder = (path: string) => {
    const body: CreateDirRequest = {
        path
    }
    return axios_instance.post("create-dir", body)
}