import { axios_instance } from "./axios"
import { AES } from "crypto-js"
import { encrypt } from "@/encryption/tools";

export const upload_txt_file = (path: string, content: string, name: string) => {
    const encrypted_content = encrypt(content);
    const encrypted_file_name = encrypt(name);

    const formData = new FormData();
    const file = new Blob([encrypted_content], { type: 'text/plain' });
    formData.append('file', file, encrypted_file_name);
    formData.append('path', path);
    console.log(formData.get("file"));


    return axios_instance.post("upload-file", formData, {
        headers: {
            'content-type': 'multipart/form-data'
        }
    })
}