"use client"

import axios, { AxiosResponse } from "axios"
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from "react"
import { loginSchema, loginSchemaType } from '../../libs/schema/login.schema'
import { useNavigate } from "react-router"
import isAuth from "../middleware/auth.middleware"

export default function Login(){
    const { register, handleSubmit, formState: { errors } } = useForm<loginSchemaType>({ resolver: zodResolver(loginSchema) })
    const [ loading, setLoading ] = useState(false)
    const [ error, setError ] = useState<string | null>(null)

    type TypeField = {
        name: string, type: string, placeholder: string
    }

    const fields: TypeField[] = [
        {  name: "username", type: 'text', placeholder: 'username' },
        {  name: "password", type: 'password', placeholder: '******' }
    ]
    
    const navigate = useNavigate()
    console.log(setLoading)

    useEffect(()=>{
        isAuth(navigate)
    })

    async function onLoginSubmit(data: loginSchemaType){
        const response = await axios.post('http://localhost:5000/user/login', data) as AxiosResponse
        if(response.data.error) return setError(response.data.error)
        return navigate('/')
    }

    function InputField(){
        return fields.map((field, index)=>{
            return (
                <div className="input-field" key={index}>
                    <label htmlFor={field.name} className="text-[20px] capitalize font-normal">{field.name}</label>
                    <input {...register(field.name === "username" ? "username" : "password")} type={field.type} name={field.name} placeholder={field.placeholder} className=" w-full text-[20px] py-3 px-4 border-b-2 border-third bg-primary"/>
                    { errors && ( errors.username || errors.password ) ? <p>{ errors.username?.message || errors.password?.message }</p> : false  }
                </div>
            )
        })
    }  

    return (
        <div className="layout w-full flex justify-center h-[80vh] py-16">
            <div className="w-[40%] shadow-xl rounded-3xl border-2 border-third">
            <div className="register px-10 py-6 flex flex-col gap-y-4 h-full justify-center">
            <h1 className="text-[60px] font-extrabold tracking-tighter">Masuk Akun</h1>
            { error !== null && <p className="text-red-500 font-semibold text-[17px] text-center bg-red-200 rounded-2xl py-3">{error}</p> }
            <form method="post" onSubmit={handleSubmit(onLoginSubmit)} className="flex flex-col gap-y-6">
                <InputField/>
                <button type="submit" disabled={!loading ? false : true} className="border-2 border-third bg-third text-primary text-[22px] py-2 rounded-3xl hover:brightness-75 transition-all">Kirim</button>
            </form>
            <p className="text-[17px] text-center">Belum mempunyai akun? <a href='/user/register' className="underline opacity-70 hover:opacity-100 transition-all font-bold">Buat</a> akun.</p>
        </div>
            </div>
        </div>
       
    )
}