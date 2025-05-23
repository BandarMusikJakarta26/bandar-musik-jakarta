"use client"

import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Autoplay, EffectCoverflow, Navigation } from 'swiper'

import "swiper/swiper-bundle.css";
import "swiper/components/effect-coverflow";

import { useEffect, useState } from 'react';
import { ShowKategori } from './ShowKategori';
import { getCategories } from '../../../action/kategori.action';
import responsivePage from '../../../action/screen.action';
import { LuCircleChevronLeft, LuCircleChevronRight } from "react-icons/lu";

SwiperCore.use([EffectCoverflow, Autoplay, Navigation]);

export default function KategoriSlides(){
    const [ categories, setCategories ] = useState<any[]>([])
    const [screen, setScreen] = useState<number>(window.innerWidth)

    useEffect(()=>{
        getCategories(setCategories)
        responsivePage(setScreen)
     }, [])

    return (
        <div className="kategori-slide mt-6 flex gap-x-6">
            <button className='tombol-kiri'><LuCircleChevronLeft size={48} className='text-third'/></button>
            { categories.length > 0 ?
               <Swiper
               effect={'coverflow'}
               slidesPerView={screen <= 768 ? 1 : 3}
               grabCursor={true}
               centeredSlides={true}
               coverflowEffect={{rotate: 0, stretch: -50, depth: 150, modifier: 2.5, slideShadows: true}}
               loop={true}
               navigation={{ prevEl: '.tombol-kiri', nextEl: '.tombol-kanan' }}
               autoplay={{ delay: 2000 }} >
                  { categories.map((category, index)=>{
                      return <SwiperSlide tabIndex={index}><ShowKategori category={category}/></SwiperSlide>
                    }) }
               </Swiper> : false
            }
            <button className='tombol-kanan'><LuCircleChevronRight size={48} className='text-third'/></button>
        </div>
    )
}
