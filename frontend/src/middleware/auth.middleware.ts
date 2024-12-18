import axios, { AxiosResponse } from 'axios'
import { NavigateFunction } from 'react-router'

export default async function isAuth(navigate: NavigateFunction){
    const response = await axios.get('http://localhost:5000/token') as AxiosResponse
    if(response.data.accessToken) return navigate('/')
}