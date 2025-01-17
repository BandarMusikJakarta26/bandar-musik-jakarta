import axios, { AxiosResponse } from "axios"
import { loginSchemaType } from "../../libs/schema/login.schema"
import { SetStateAction } from "react"
import { host } from "../../libs/config"
import { NavigateFunction } from "react-router"
import { registerSchemaType } from "../../libs/schema/register.schema"
import axiosClient from "../../libs/axiosConfig"

async function doAuthAction(route: string, data: registerSchemaType | loginSchemaType, setLoading: SetStateAction<any>, setError: any, navigate: NavigateFunction){
    setLoading(true)
    const response = await axiosClient.post(`api/` + route, data) as AxiosResponse
    setLoading(false)
    if(response.data.error) return setError(response.data.error)
    if(response.data.success === true && route === "login"){
        await axiosClient.get(`api/cookie/${response.data.accessToken}`) as AxiosResponse
        return navigate('/')
    } 
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
    const response = await axiosClient.get(`api/get-cookie`) as AxiosResponse
    if(response.data.success) return true
    else return false
}

export async function doLogout(navigate: NavigateFunction){
    await axiosClient.get(`api/logout`)
    return navigate(0)
}