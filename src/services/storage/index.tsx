import { parseToken } from "../helper";

export const setItem = (key: string, value: any) => {
    localStorage.setItem(key, JSON.stringify(value))
}

export const getItem = (key: string) => {
    let value = localStorage.getItem(key)
    if (value) return JSON.parse(value)
    return null
}

export const clearStorage = () => {
    localStorage.clear()
}

export const saveUser = (jwtToken: string) => {
    setItem("token", jwtToken)
}

export const getUser = () => {
    let token = getItem("token")
    if (token) return parseToken(token)
    else return null
}

export const getToken = () => {
    let token = getItem("token")
    if (token) return token.access_token
    else return null
}