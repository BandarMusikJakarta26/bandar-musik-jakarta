import { useEffect, useState } from "react"
import { getTerbaru } from "../../action/terbaru.action"
import { cloudSDK } from "../../../libs/config"
import { AdvancedImage } from "@cloudinary/react"

export default function AllTerbaru(){
    const [ terbaru, setTerbaru ] = useState<any[]>([])

    function ShowDataTerbaru(){
      return terbaru.map((update, index)=>{
        return (
          <a href={update.link} className="group w-full shadow-lg" key={index}>
            <div className="md:rounded-[32px] group-hover:brightness-75 transition-all">
              <AdvancedImage cldImg={cloudSDK.image(update.image)}/>
            </div>
            <div className="text-blog py-4 px-3">
              <h1 className="text-[21px] md:text-[36px] font-extrabold tracking-tight text-center md:text-left">{update.topik}</h1>
              <p className="text-[14px] md:text-[18px] text-center md:text-justify opacity-80 font-normal">{update.deskripsi}</p>
            </div>
          </a>
        )
      })
    }

    useEffect(()=>{ getTerbaru(setTerbaru) })

    return (
        <div className="terbaru mt-1 px-6">
        <div className="terbaru-text mb-8 flex flex-col items-center md:block">
          <h1 className="text-[60px] md:text-[72px] uppercase font-black tracking-tight">Terbaru</h1>
          <h1 className="text-[16px] md:text-[30px] font-light italic mt-[-14px]">Info terbaru dari Bandar Musik Jakarta</h1>
        </div>
        <div className="terbaru-list grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-4 md:gap-x-16">
          { terbaru.length > 0 && <ShowDataTerbaru/> }
        </div>
     </div>
    )
}