import React, { lazy, Suspense, useEffect, useState } from "react"
// import { host } from '../../../libs/config'
// import responsivePage from "../../action/screen.action";
// import { checkAdmin } from "../../action/auth.action";
// import BlankPage from "../blank";
import { getCategories } from "../../action/kategori.action";
import LoadingComponent from "../../components/LoadingComponent";

const DataCategory = lazy(()=>import("./category/DataCategory"))
const KategoriKosong = lazy(()=>import("./category/KategoriKosong"))

const GetCategory = function(){

    const [ categories, setCategories ] = useState<any[]>([])

    useEffect(()=>{
        async function fetchCategories(){
           return await getCategories(setCategories)
        }
        fetchCategories()
    }, [])

    // if(!admin) return <BlankPage/>
    return (
        <div className="w-full box-border pt-12 px-5 md:p-10">
            <div className="brandList w-full">
                <Suspense fallback={<LoadingComponent/>}>
                    { categories.length == 0 ? <KategoriKosong/> : <DataCategory categories={categories}/> }
                </Suspense>
            </div>
        </div>
    )
}

export default React.memo(GetCategory)