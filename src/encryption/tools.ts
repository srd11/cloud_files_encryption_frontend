import { AES, enc, format } from "crypto-js"
import { env } from "process";

export const LOCAL_KEY = "ENCRYTION_KEY"

export const encrypt = (a: string) => {
    const key = localStorage.getItem(LOCAL_KEY) as string
    let encrypted_text = AES.encrypt(JSON.stringify({ a }), key ?? "").toString();
    encrypted_text = Buffer.from(encrypted_text).toString("hex")

    return encrypted_text

}

export const decrypt = (a: string) => {

    const key = localStorage.getItem(LOCAL_KEY) as string
    a = Buffer.from(a, "hex").toString("utf8")
    const decrpyted = AES.decrypt(a, key ?? "").toString(enc.Utf8)
    if (!decrpyted) return ""
    return JSON.parse(decrpyted).a
} 