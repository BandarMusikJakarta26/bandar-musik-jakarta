// import Carousel from "./Carousel"
import Deskripsi from "./Deskripsi"
import Terbaru from "./Terbaru"
import Kategori from "./Kategori"
import Brand from "./Brand"
import Promo from "./Promo"
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { useEffect } from "react"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import banner1 from '/utils/bannerawal.png'
import { IoIosArrowDropdown } from "react-icons/io";

export default function Main(){
    gsap.registerPlugin(ScrollTrigger)
    
    useEffect(()=>{
        const tulisan = document.querySelector('.tulisan') as any
        const kotak1 = document.querySelector('.section1')
        const kotak2 = document.querySelector('.section2')

        gsap.to(tulisan, { y: -200 })

        const timeline = gsap.timeline({
            scrollTrigger: {
                trigger: kotak1,
                endTrigger: kotak2,
                start: "top",
                end: "bottom",
                scrub: 2,
                markers: false
            }
        });
        timeline.to(tulisan, { scale: 1, opacity: 1 })
        timeline.to(tulisan, { scale: 2, opacity: 0 })
    }, [])

    addEventListener('scroll', ()=>{
        const tulisan = document.querySelector('.tulisan') as any
        const arrow = document.querySelector('.arrow-btm') as any
        if(scrollY >= 520){
            arrow!.style.zIndex = -1
        } else {
            arrow!.style.zIndex = 110
        }
        if(scrollY >= 640){
            tulisan!.style.zIndex = -1
        } else {
            tulisan!.style.zIndex = 100
        }
    })

    function explore(): void{
        const terbaru = document.querySelector('.deskripsi')!
        terbaru.scrollIntoView()
    }
    
    return (
        <>
            <div className="kotak fixed z-[110] w-full top-0 left-0 h-full flex justify-center items-center arrow-btm">
                <a href="#content" className="mt-[300px]"><IoIosArrowDropdown size={58} className="text-third animate-bounce"/></a>
            </div>
            <div className="tulisan fixed w-full h-100vh left-0 top-[200px] z-[100] flex items-center">
                <img src={banner1} alt={banner1} height={1000} className="w-full h-100vh scale-125"/>
            </div>
            <div className="absolute w-full z-[95] bg-primary left-0 top-0">
                <div className="kotak w-full h-[300px] section1"></div>
                <div className="kotak w-full h-[300px] section2"></div>
            </div>
         {/* <Carousel/> */}
            <div className="content w-[86%] mx-auto md:w-full mt-[1000px]" id="content">

                <Deskripsi explore={explore}/>
                <motion.div initial={{ opacity: 0, y: 200 }} whileInView={{ opacity: 1, y: 0, transition: { duration: 0.5 } }} viewport={{ once: true }}>
                    <Promo/>
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 200 }} whileInView={{ opacity: 1, y: 0, transition: { duration: 0.5 } }} viewport={{ once: true }}>
                    <Terbaru/>
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 200 }} whileInView={{ opacity: 1, y: 0, transition: { duration: 0.5 } }} viewport={{ once: true }}>
                    <Kategori/>
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 200 }} whileInView={{ opacity: 1, y: 0, transition: { duration: 0.5 } }} viewport={{ once: true }}>
                    <Brand/>
                </motion.div>
            </div>
        </>
    )
}