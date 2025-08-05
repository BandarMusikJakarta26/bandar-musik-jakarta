import { useEffect, useState } from 'react'
import responsivePage from '../../action/screen.action'
import { IPromo } from './PromoPage'
import { host } from '../../../libs/config'

export default function HeadlinePromo({ promo }: { promo: IPromo[] }){
        const [screen, setScreen] = useState<number>(window.innerWidth)

        useEffect(()=>{ responsivePage(setScreen) }, [])
        return promo.map((p: IPromo, index: number)=>{
            return (
                <div className="headline-promo flex flex-col md:gap-y-2" key={index}>
                <div className="text-header flex justify-between items-center">
                    <div className="title">
                        <p className="text-[14px] md:text-[24px] italic mb-[-8px] md:mb-[-16px]">Promo</p>
                        <h1 className="text-[20px] md:text-[48px] font-bold tracking-tight">{p.title}</h1>
                    </div>
                    <div className="event">
                        {p.description && <p className="text-[12px] md:text-[22px] font-bold tracking-tight">{p.description}</p>}
                    </div>
                </div>
                <a href={`promo/${p.title}`} target="_blank" className="relative group">
                    <img src={`${host}/storage/${screen <= 728 ? p.images[1] : p.images[0]}`} alt={p.title} className="group-hover:brightness-75 transition duration-300" height={1000}/>
                </a>
            </div>
            )
        })
    }