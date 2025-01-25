// import { useEffect } from "react"
// import { getTerbaru } from "../../../action/terbaru.action"
import { PiCursorFill } from "react-icons/pi";
import banner from '/utils/Slide1.png'

export default function Terbaru(){
  // const [ terbaru, setTerbaru ] = useState<any[]>([])
  
  // function ShowDataTerbaru(){
  //   return terbaru.map((update, index)=>{
  //     return (
  //       <a href={update.link} className="group w-full" key={index}>
  //         <div className="md:rounded-[32px] group-hover:brightness-75 transition-all">
  //           <AdvancedImage cldImg={cloudSDK.image(update.image)}/>
  //         </div>
  //         <div className="text-blog pt-2">
  //           <h1 className="text-[21px] md:text-[36px] font-bold tracking-tight text-center md:text-left">{update.topik}</h1>
  //           <p className="text-[14px] md:text-[22px] text-center md:text-justify opacity-80 font-normal">{update.deskripsi}</p>
  //         </div>
  //       </a>
  //     )
  //   })
  // }

  // useEffect(()=>{ getTerbaru(setTerbaru, 2) }, [])

    return (
      <>
        <div className="terbaru mt-[-120px] md:mt-[140px] mb-[-30px] md:mb-[140px] rounded-3xl p-12 relative overflow-hidden flex justify-center items-center flex-col md:flex-col">
          
          <img src={banner} alt={banner} className="w-full scale-150 block md:hidden rounded-2xl border-[1px] border-third hover:brightness-75 transition-all mb-1 md:mb-0"/>

          <div className="terbaru-text flex flex-col items-center relative z-10 bg-none md:bg-primary md:w-[30%] py-6 rounded-3xl">

            <h1 className="text-[24px] md:text-[36px] uppercase font-light italic tracking-tight">Apa Yang</h1>
            <h1 className="text-[60px] md:text-[80px] font-black tracking-tight -mt-[26px] md:-mt-[30px] font-bree-serif">Terbaru?</h1>
            <a href="/terbaru" className="text-[16px] md:text-[24px] border-2 border-third px-4 md:px-10 py-1 md:py-2 hover:bg-third hover:text-primary transition-all">Lihat Terbaru</a>
            <PiCursorFill size={40} className="bg-third text-primary rounded-full p-2 relative top-[-22px] md:left-[110px] left-[72px]"/>
          </div>

          <img src={banner} alt={banner} className="absolute md:top-[-140px] left-0 brightness-75 animation animate-[zoom-in_3s_ease_infinite] hidden md:block"/>
          <p className="bg-third w-[40px] h-[40px] leading-[40px] md:w-[100px] md:h-[100px] text-center md:leading-[100px] absolute rounded-full font-extrabold text-[12px] md:text-[24px] text-primary top-2 md:top-[30px] md:left-[530px] -rotate-6 z-20">New</p>
        </div>
      </>
    )
}