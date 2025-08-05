"use client"

import {Swiper, SwiperSlide} from 'swiper/react'
import 'swiper/swiper-bundle.css'

import banner1 from '/utils/Slide1.png'
import SlideShow from './SlideShow'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'

const sliders = [
    { url: '/', img: banner1 },
    { url: '/about', img: banner1 },
    { url: '/about', img: banner1 },
]

export default function Carousel(){
    return ( <>
    { sliders.length > 0 ? 
        <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            slidesPerView={1}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            pagination={{clickable: true}}
            loop={true}>
            { sliders.map((slide, index)=>{ return <SwiperSlide tabIndex={index}><SlideShow slide={slide}/></SwiperSlide>}) }
        </Swiper> : <h1>Gada Slide!</h1> }
        </>

    )
}

