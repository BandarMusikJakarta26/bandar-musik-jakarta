import Carousel from "./Carousel"
import Deskripsi from "./Deskripsi"
import Terbaru from "./Terbaru"
import Kategori from "./Kategori"
import Brand from "./Brand"
import Promo from "./Promo"
import { motion } from 'framer-motion'

export default function Main(){
    function explore(): void{
        const terbaru = document.querySelector('.deskripsi')!
        terbaru.scrollIntoView()
    }
    
    return (
        <>
         <Carousel/>
            <div className="content w-[86%] mx-auto md:w-full">
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