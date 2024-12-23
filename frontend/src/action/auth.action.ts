import axios, { AxiosResponse } from "axios"
import { loginSchemaType } from "../../libs/schema/login.schema"
import { SetStateAction } from "react"
import { host } from "../../libs/config"
import { NavigateFunction } from "react-router"
import { registerSchemaType } from "../../libs/schema/register.schema"

async function doAuthAction(route: string, data: registerSchemaType | loginSchemaType, setLoading: SetStateAction<any>, setError: any, navigate: NavigateFunction){
    setLoading(true)
    const response = await axios.post(`${host}/user/` + route, data) as AxiosResponse
    setLoading(false)
    if(response.data.status === 400) return setError(response.data.error)
    if(route === "register") return navigate('/user/login')
    else return navigate('/')
}

export async function registerAction(data: registerSchemaType, setLoading: SetStateAction<any>, setError: any, navigate: NavigateFunction){
    await doAuthAction('register', data, setLoading, setError, navigate)
}

export async function loginAction(data: loginSchemaType, setLoading: SetStateAction<any>, setError: any, navigate: NavigateFunction){
    await doAuthAction('login', data, setLoading, setError, navigate)
}

export async function checkAdmin(): Promise<boolean>{
    const response = await axios.get(`${host}/admin/verify`)
    if(response.data.success) return true
    else return false
}

export async function isLogin(){
    const response = await axios.get(`${host}/token`) as AxiosResponse
    if(response.data.accessToken) return true
    else return false
}

export async function doLogout(navigate: NavigateFunction){
    await axios.get(`${host}/user/logout`)
    return navigate(0)
}