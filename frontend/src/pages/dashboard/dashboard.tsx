import Carousel from "./components/Carousel"
import Deskripsi from "./components/Deskripsi"
import Terbaru from "./components/Terbaru"
import Kategori from "./components/Kategori"
import Brand from "./components/Brand"
import { motion } from 'framer-motion'

export default function Dashboard(){

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