import { ApiResponse, axios_instance } from "./axios"

interface GetFilesRequest {
    path: string;
}

export interface FileRes {
    name: string;
    isDir: boolean;
}

export type GetFilesRes = ApiResponse<FileRes[]>
export const get_folders = (path: string) => {
    const body: GetFilesRequest = {
        path
    }
    return axios_instance.post<GetFilesRes>("get-files", body)
}