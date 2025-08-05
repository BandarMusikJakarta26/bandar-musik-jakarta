import React, { useEffect, useState } from "react"
import HeadlinePromo from "./HeadlinePromo"
import { getPromos } from "../../action/promo.action"

export interface IPromo {
    title: string, description: string, images: any[]
}

const PromoPage = function({ login }: { login: boolean }){
    const [promo, setPromo] = useState<IPromo[] | any>(null)

    useEffect(()=>{getPromos(setPromo)}, [])

    return (
        <div className={`mobile px-6 md:px-0 flex flex-col gap-y-20 ${login ? 'pt-20': ''}`}>
            { login && <div className="admin">
                        <a href="admin/tambah/promo" className="px-6 py-2 border-[1px] rounded-lg border-third hover:bg-third hover:text-primary transition duration-200">Tambah Promo</a>
            </div> }
            {promo !== null && promo.length > 0 ? <HeadlinePromo promo={promo}/> : <h1>Loading</h1>}
        </div>
    )
}

export default React.memo(PromoPage)