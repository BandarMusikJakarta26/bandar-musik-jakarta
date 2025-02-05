import { lazy, Suspense } from "react"
import LoadingPage from "../../components/LoadingPage"

const Main = lazy(()=>import("./components/Main"))

export default function Dashboard(){
    return (
        <>
            <Suspense fallback={<LoadingPage/>}>
                <Main/>
            </Suspense>
        </>
    )
}