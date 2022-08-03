import {_get, _post, _put} from './commons'

export const login = async (data) => {
    return await _post("/api/login", data)
}

export const user = async () => {
    return await _get("/api/user")
}

export const csrf = async () => {
    return await _get("/sanctum/csrf-cookie")
}