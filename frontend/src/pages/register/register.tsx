"use client"

import axios from "axios"
import { registerSchema, registerSchemaType } from "../../../libs/schema/register.schema"
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from "react"
import { NavigateFunction, useNavigate } from "react-router"

import RegisterField from "./components/RegisterField"
import RegisterButton from "./components/RegisterButton"
import AlreadyRegister from "./components/AlreadyRegister"
import RegisterTitle from "./components/RegisterTitle"
import RegisterError from "./components/RegisterError"
import RegisterForm from "./components/RegisterForm"
import LayoutAuth from "../../components/auth/LayoutAuth"

export default function Register(){
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors } } = useForm<registerSchemaType>({ resolver: zodResolver(registerSchema) })
    const [ loading, setLoading ] = useState(false)
    const [ error, setError ] = useState<string | null>(null)

    async function onFormSubmit(data: registerSchemaType): Promise<NavigateFunction | void>{
        setLoading(true)
        const response = await axios.post('http://localhost:5000/user/register', data)
        setLoading(false)
        if(response.data.status === 400) return setError(response.data.error)
        return navigate('/user/login')
    }

    return (
            <LayoutAuth>
                <RegisterTitle/>
                { error !== null && <RegisterError error={error}/>}
                <RegisterForm handleSubmit={handleSubmit} onFormSubmit={onFormSubmit}>
                    <RegisterField register={register} errors={errors}/>
                    <RegisterButton loading={loading}/>
                </RegisterForm>
                <AlreadyRegister/>
            </LayoutAuth>
    )
}