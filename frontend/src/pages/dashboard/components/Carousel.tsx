"use client"

import {Swiper, SwiperSlide} from 'swiper/react'
import SwiperCore, { Pagination, Navigation } from 'swiper'
import 'swiper/swiper-bundle.css'

import banner1 from '/utils/Slide1.png'
import SlideShow from './SlideShow'

const sliders = [
    { url: '/', img: banner1 },
    { url: '/about', img: banner1 },
    { url: '/about', img: banner1 },
]

SwiperCore.use([ Navigation, Pagination ])

export default function Carousel(){
    return ( <>
    { sliders.length > 0 ? 
        <Swiper
            slidesPerView={1}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            pagination={{clickable: true}}
            loop={true}>
            { sliders.map((slide, index)=>{ return <SwiperSlide tabIndex={index}><SlideShow slide={slide}/></SwiperSlide>}) }
        </Swiper> : <h1>Gada Slide!</h1> }
        </>

    )
}

