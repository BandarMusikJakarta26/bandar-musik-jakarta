"use client"

import { useEffect, useState } from 'react';
import { getCategories } from '../../action/kategori.action';
import LoadingPage from '../../components/LoadingPage';
import MainKategori from './MainKategori';

export default function AllKategori(){
    const [ categories, setCategories ] = useState<any[] | any>([])
    const [ loading, setLoading ] = useState<boolean>(true)

    useEffect(()=>{ 
        setTimeout(()=>{
            getCategories(setCategories)
            setLoading(false)
        }, 1000)
    }, [])

    if(loading ) return <LoadingPage/>
    else if(categories.length > 0) return (
        <MainKategori categories={categories}/>
    )
}
