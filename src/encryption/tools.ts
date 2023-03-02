import { AES, enc } from "crypto-js"

export const LOCAL_KEY = "ENCRYTION_KEY"

export const encrypt = (a: string) => {
    const key = localStorage.getItem(LOCAL_KEY) as string
    const encrypted_text = AES.encrypt(a, 'secret key 123').toString();
    console.log(encrypted_text);

    return encrypted_text
}

export const decrypt = (a: string) => {
    const key = localStorage.getItem(LOCAL_KEY) as string
    const decrpyted = AES.decrypt(a, 'secret key 123').toString(enc.Utf8)

    return decrpyted
} 