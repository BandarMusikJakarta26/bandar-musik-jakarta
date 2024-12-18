"use client"

import {Swiper, SwiperSlide} from 'swiper/react'
import SwiperCore, { Pagination, Navigation } from 'swiper'
import 'swiper/swiper-bundle.css'

import banner1 from '/utils/Slide1.png'

// const slider = [
//     { url: '/about', img: banner1 },
//     { url: '/about', img: banner1 },
//     { url: '/about', img: banner1 },
// ]

// function SliderCarousel(){
//     return slider.map((slide, index)=>{
//         return (
//             <SwiperSlide key={index}>
//                 <Link className='container grid grid-cols-2 w-full h-[670px] relative' href={slide.url}>
//                     <img src={slide.img} fill alt='gitar' className='relative -z-10'/>
//                 </Link>
//             </SwiperSlide>
//         )
//     })
// }

SwiperCore.use([ Navigation, Pagination ])

export default function Carousel(){
    return ( <>
        <Swiper
            slidesPerView={1}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            pagination={{clickable: true}}
            loop={true}
            navigation
        >
            {/* <SliderCarousel/> */}
            <SwiperSlide>
                <a className='w-full h-[670px] hover:brightness-90 hover:scale-[1.03] transition-all' href={'/terbaru'}>
                    <img src={banner1} alt='gitar' className='relative -z-10' width="100%" height="auto"/>
                </a>
            </SwiperSlide>
         
            <SwiperSlide>
                <a className='w-full h-[670px] hover:brightness-90 hover:scale-[1.03] transition-all' href={'/terbaru'}>
                    <img src={banner1} alt='gitar' className='relative -z-10' width="100%" height="auto"/>
                </a>
            </SwiperSlide>
         
            <SwiperSlide>
                <a className='w-full h-[670px] hover:brightness-90 hover:scale-[1.03] transition-all' href={'/terbaru'}>
                    <img src={banner1} alt='gitar' className='relative -z-10' width="100%" height="auto"/>
                </a>
            </SwiperSlide>
         
        </Swiper>
        </>

    )
}

