import { IPromo, promos } from "../../../libs/store"

export default function HeadlinePromo(){
        const promoActive = promos as IPromo[]
        return promoActive.map((promo, index)=>{
            return (
                <div className="headline-promo flex flex-col gap-y-2" key={index}>
                <div className="text-header flex justify-between items-center">
                    <div className="title">
                        <p className="text-[24px] mb-[-16px]">Promo</p>
                        <h1 className="text-[48px] font-bold tracking-tight">{promo.title}</h1>
                    </div>
                    <div className="event">
                        {promo.duration && <p className="text-[26px] font-bold tracking-tight">{promo.duration}</p>}
                    </div>
                </div>
                <a href={`promo/${promo.title}`} target="_blank" className="relative group">
                    <img src={promo.img} alt={promo.img} className="group-hover:brightness-75 transition duration-300"/>
                </a>
            </div>
            )
        })
    }