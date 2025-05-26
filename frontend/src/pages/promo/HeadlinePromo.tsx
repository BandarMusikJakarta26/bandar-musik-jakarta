import { promos } from "../../../libs/store"
import JavaJazz from '../../../public/utils/JavaJazzBG.png'

export default function HeadlinePromo(){
        const promoActive = promos as string[]
        return promoActive.map((promo, index)=>{
            return (
                <div className="headline-promo flex flex-col gap-y-2" key={index}>
                <div className="text-header flex justify-between items-center">
                    <h1 className="text-[48px] font-bold tracking-tight">Promo {promo}</h1>
                    <div className="event">
                        <p className="text-[18px] tracking-tight mb-[-5px] text-right font-semibold">Java Jazz Festival</p>
                        <p className="text-[26px] font-bold tracking-tight">30 Mei - 1 Juni</p>
                    </div>
                </div>
                <a href={`promo/${promo}`} target="_blank" className="relative group">
                    <img src={JavaJazz} alt={JavaJazz} className="group-hover:brightness-75 transition duration-300"/>
                </a>
            </div>
            )
        })
    }