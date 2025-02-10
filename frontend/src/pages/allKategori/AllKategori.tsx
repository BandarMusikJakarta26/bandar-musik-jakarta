"use client"

import { useEffect, useState } from 'react';
import { getCategories } from '../../action/kategori.action';
import { host } from '../../../libs/config';
import LoadingPage from '../../components/LoadingPage';

export default function AllKategori(){
    const [ categories, setCategories ] = useState<any[] | any>([])
    const [ loading, setLoading ] = useState<boolean>(true)

    useEffect(()=>{ 
        setTimeout(()=>{
            getCategories(setCategories)
            setLoading(false)
        }, 1000)
    }, [])

    function CategoryComponent(){
        return categories.map((category: any, index: number)=>{
            return (
                <a className="card brightness-90 hover:brightness-100 transition-all rounded-3xl overflow-hidden" key={index} href={`/kategori/${category.title}`}>
                   <img src={`${host}/storage/${category.image}`} alt={category.title}/>
                </a>
            )
        })
    }

    if(loading) return <LoadingPage/>
    else return (
        <div className="main w-full grid md:grid-cols-3 gap-8 px-6">
            <CategoryComponent/>
        </div>
    )
}
