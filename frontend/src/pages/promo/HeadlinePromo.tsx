import JavaJazz from '../../../public/utils/JavaJazzBG.png'
import JavaJazzMobile from '../../../public/utils/JavaJazz.png'
import Walkin from '../../../public/utils/walkin.png'
import WalkinMobile from '../../../public/utils/walkinmobile.png'
import Kemerdekaan from '../../../public/utils/kemerdekaan.png'
import KemerdekaanMobile from '../../../public/utils/kemerdekaanmobile.png'
import CuciGudang from '../../../public/utils/cucigudang.png'
import CuciGudangMobile from '../../../public/utils/cucigudangmobile.png'
import AkhirTahun from '../../../public/utils/akhirtahun.png'
import AkhirTahunMobile from '../../../public/utils/akhirtahunmobile.png'
import { useEffect, useState } from 'react'
import responsivePage from '../../action/screen.action'

interface IPromo {
    title: string, duration?: string, img: string, mobile: string
}

const promos: IPromo[] = [
    {title: 'Java Jazz', duration: '29 Mei - 1 Juni', img: JavaJazz, mobile: JavaJazzMobile},
    {title: 'Walk-In', img: Walkin, mobile: WalkinMobile},
    {title: 'Kemerdekaan', img: Kemerdekaan, mobile: KemerdekaanMobile},
    {title: 'Cuci Gudang', img: CuciGudang, mobile: CuciGudangMobile},
    {title: 'Akhir Tahun', img: AkhirTahun, mobile: AkhirTahunMobile},
]

export default function HeadlinePromo(){
        const [screen, setScreen] = useState<number>(window.innerWidth)

        useEffect(()=>{ responsivePage(setScreen) }, [])
        
        const promoActive = promos as IPromo[]

        return promoActive.map((promo, index)=>{
            return (
                <div className="headline-promo flex flex-col md:gap-y-2" key={index}>
                <div className="text-header flex justify-between items-center">
                    <div className="title">
                        <p className="text-[14px] md:text-[24px] italic mb-[-8px] md:mb-[-16px]">Promo</p>
                        <h1 className="text-[20px] md:text-[48px] font-bold tracking-tight">{promo.title}</h1>
                    </div>
                    <div className="event">
                        {promo.duration && <p className="text-[12px] md:text-[26px] font-bold tracking-tight">{promo.duration}</p>}
                    </div>
                </div>
                <a href={`promo/${promo.title}`} target="_blank" className="relative group">
                    <img src={screen <= 768 ? promo.mobile : promo.img} alt={promo.title} className="group-hover:brightness-75 transition duration-300" height={1000}/>
                </a>
            </div>
            )
        })
    }