"use client"

import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Autoplay, EffectCoverflow } from 'swiper'

import "swiper/swiper-bundle.css";
import "swiper/components/effect-coverflow";

import { useEffect, useState } from 'react';
import { ShowKategori } from './ShowKategori';
import { getCategories } from '../../../action/kategori.action';

SwiperCore.use([EffectCoverflow, Autoplay]);

export default function KategoriSlides(){
    const [ categories, setCategories ] = useState<any[]>([])

    useEffect(()=>{ getCategories(setCategories) }, [])

    return (
        <div className="kategori-slide mt-6">
            { categories.length > 0 ?
               <Swiper
               effect={'coverflow'}
               slidesPerView={3}
               grabCursor={true}
               centeredSlides={true}
               coverflowEffect={{rotate: 0, stretch: -50, depth: 150, modifier: 2.5, slideShadows: true}}
               loop={true}
               autoplay={{ delay: 2000 }} >
                  { categories.map((category, index)=>{
                    return <SwiperSlide tabIndex={index}><ShowKategori category={category}/></SwiperSlide>
                  }) }
               </Swiper> : <h1>Gada Kategori!</h1>
            }
        </div>
    )
}
