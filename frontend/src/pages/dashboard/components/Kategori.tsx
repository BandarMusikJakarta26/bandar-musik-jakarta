import { lazy, Suspense } from "react";

import KategoriHeader from "./KategoriHeader";
import LoadingComponent from "../../../components/LoadingComponent";
const KategoriSlides = lazy(()=>import("./KategoriSlides"))

export default function Kategori(){
    return (
        <div className="kategori">
            <KategoriHeader/>
            <Suspense fallback={<LoadingComponent/>}>
                <KategoriSlides/>
            </Suspense>
        </div>
    )
}