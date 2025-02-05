"use client"

import { useEffect, useState } from 'react';
import { getCategories } from '../../action/kategori.action';
import { host } from '../../../libs/config';

export default function AllKategori(){
    const [ categories, setCategories ] = useState<any[] | any>([])

    useEffect(()=>{ getCategories(setCategories) }, [])

    function CategoryComponent(){
        return categories.map((category: any, index: number)=>{
            return (
                <a className="card brightness-90 hover:brightness-100 transition-all rounded-3xl overflow-hidden" key={index} href={`/kategori/${category.title}`}>
                   <img src={`${host}/storage/${category.image}`} alt={category.title}/>
                </a>
            )
        })
    }

    return (
        <div className="main w-full grid md:grid-cols-3 gap-8 px-6">
            <CategoryComponent/>
        </div>
    )
}
