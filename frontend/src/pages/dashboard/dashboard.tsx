import { lazy, Suspense, useEffect, useState } from "react"
import LoadingPage from "../../components/LoadingPage"
// import WelcomePage from "../../components/WelcomePage"

const Main = lazy(()=>import("./components/Main"))

export default function Dashboard(){
    const [ loading, setLoading ] = useState<boolean>(true)
    useEffect(()=>{
        setTimeout(()=>{
            setLoading(false)
        }, 4000)
    })

    if(loading) return <h1 className="w-full h-[100vh] text-[100px] flex items-center justify-center font-bold tracking-tight">Dalam Pengerjaan!</h1>
    else return (
        <>
            <Suspense fallback={<LoadingPage/>}>
                <Main/>
            </Suspense>
        </>
    )
}