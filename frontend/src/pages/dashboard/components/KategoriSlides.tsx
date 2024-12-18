"use client"

import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { EffectCoverflow } from 'swiper'

import "swiper/swiper-bundle.css";
import "swiper/components/effect-coverflow";

import kategori from '../../../../public/utils/GitarKoleksi.png'

SwiperCore.use([EffectCoverflow]);

export default function KategoriSlides(){
    return ( <>
        <div className="kategori-slide mt-6">
            <Swiper
            effect={'coverflow'}
            slidesPerView={3}
            grabCursor={true}
            centeredSlides={true}
            coverflowEffect={{rotate: 0, stretch: -50, depth: 150, modifier: 2.5, slideShadows: false}}
            loop={true}
        >

            <SwiperSlide>
                <a className='w-full h-[260px]' href={'/terbaru'}>
                    <img src={kategori} alt='gitar' className='relative -z-10' width={500} height="auto"/>
                </a>
            </SwiperSlide>
            <SwiperSlide>
                <a className='w-full h-[260px]' href={'/terbaru'}>
                    <img src={kategori} alt='gitar' className='relative -z-10' width={500} height="auto"/>
                </a>
            </SwiperSlide>
            <SwiperSlide>
                <a className='w-full h-[260px]' href={'/terbaru'}>
                    <img src={kategori} alt='gitar' className='relative -z-10' width={500} height="auto"/>
                </a>
            </SwiperSlide>
            <SwiperSlide>
                <a className='w-full h-[260px]' href={'/terbaru'}>
                    <img src={kategori} alt='gitar' className='relative -z-10' width={500} height="auto"/>
                </a>
            </SwiperSlide>
            <SwiperSlide>
                <a className='w-full h-[260px]' href={'/terbaru'}>
                    <img src={kategori} alt='gitar' className='relative -z-10' width={500} height="auto"/>
                </a>
            </SwiperSlide>
            </Swiper>
        </div>
        </>

    )
}
