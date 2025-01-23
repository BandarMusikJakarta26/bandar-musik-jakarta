"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from "react"
import { useNavigate } from "react-router"

import { loginSchema, loginSchemaType } from '../../../libs/schema/login.schema'
import { loginAction } from "../../action/auth.action"

import LoginFields from "./components/LoginFields"
import LayoutAuth from "../../components/auth/LayoutAuth"
import LayoutAuthForm from "../../components/auth/LayoutAuthForm"
import LayoutAuthTitle from "../../components/auth/LayoutAuthTitle"
import LayoutAuthError from "../../components/auth/LayoutAuthError"
import LayoutSubmitAuth from "../../components/auth/LayoutSubmitAuth"
import Unregister from "./components/Unregister"
import { isLoginStore } from "../../../libs/store"

export default function Login({ login }:{ login:boolean }){
    const loggedIn = isLoginStore(state=>state.loggedIn)

    const navigate = useNavigate()
    
    const { register, handleSubmit, formState: { errors } } = useForm<loginSchemaType>({ resolver: zodResolver(loginSchema) })
    const [ loading, setLoading ] = useState<boolean>(false)
    const [ error, setError ] = useState<string | null>(null)

    useEffect(()=>{ login && navigate('/') },[login])

    function onLoginSubmit(data: loginSchemaType){ 
        return loginAction(data, setLoading, setError, navigate, loggedIn)
    }

     return (
        <LayoutAuth>
            <LayoutAuthTitle>Masuk Akun</LayoutAuthTitle>
            { error !== null && <LayoutAuthError error={error}/>}
            <LayoutAuthForm handleSubmit={handleSubmit} onFormSubmit={onLoginSubmit}>
                <LoginFields register={register} errors={errors}/>
                <LayoutSubmitAuth loading={loading} tulisan="Masuk"/>
            </LayoutAuthForm>
            <Unregister/>
        </LayoutAuth>
    )
}