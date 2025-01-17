"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from "react-router"
import { useEffect, useState } from "react"

import { registerSchema, registerSchemaType } from "../../../libs/schema/register.schema"
import { registerAction } from "../../action/auth.action"

import RegisterField from "./components/RegisterField"
import AlreadyRegister from "./components/AlreadyRegister"
import LayoutAuth from "../../components/auth/LayoutAuth"
import LayoutAuthForm from "../../components/auth/LayoutAuthForm"
import LayoutAuthTitle from "../../components/auth/LayoutAuthTitle"
import LayoutAuthError from "../../components/auth/LayoutAuthError"
import LayoutSubmitAuth from "../../components/auth/LayoutSubmitAuth"


export default function Register({ login }: { login: boolean }){
    const navigate = useNavigate()

    const { register, handleSubmit, formState: { errors } } = useForm<registerSchemaType>({ resolver: zodResolver(registerSchema) })
    const [ loading, setLoading ] = useState(false)
    const [ error, setError ] = useState<string | null>(null)

    useEffect(()=>{ login && navigate('/') },[login])

    function onRegisterSubmit(data: registerSchemaType){ return registerAction(data, setLoading, setError, navigate) }

    return (
            <LayoutAuth>
                <LayoutAuthTitle>Buat Akun</LayoutAuthTitle>
                { error !== null && <LayoutAuthError error={error}/>}

                <LayoutAuthForm handleSubmit={handleSubmit} onFormSubmit={onRegisterSubmit}>
                    <RegisterField register={register} errors={errors}/>
                    <LayoutSubmitAuth loading={loading} tulisan="Daftar"/>
                </LayoutAuthForm>

                <AlreadyRegister/>
            </LayoutAuth>
    )
}