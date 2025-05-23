import { lazy, Suspense } from "react";
import LoadingPage from "../../components/LoadingPage";
const MainKategori = lazy(()=>import("./components/MainKategori"))

export default function Kategori({ login }: { login: boolean }){
    return (
        <Suspense fallback={<LoadingPage/>}>
            <MainKategori login={login}/>
        </Suspense>
    )
}