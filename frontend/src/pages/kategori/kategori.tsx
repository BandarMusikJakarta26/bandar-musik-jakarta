import { lazy, Suspense } from "react";
import LoadingPage from "../../components/LoadingPage";
const MainKategori = lazy(()=>import("./components/MainKategori"))

export default function Kategori(){
    return (
        <Suspense fallback={<LoadingPage/>}>
            <MainKategori/>
        </Suspense>
    )
}