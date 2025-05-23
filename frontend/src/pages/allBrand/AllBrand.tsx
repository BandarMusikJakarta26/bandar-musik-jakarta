import axios from "axios"
import { useEffect, useState } from "react"
import { host } from "../../../libs/config"
import responsivePage from "../../action/screen.action"
import LoadingPage from "../../components/LoadingPage"

export default function AllBrand(){
    const [brands, setBrands] = useState<any[]>([])
    const [filter, setFilter] = useState<string>('Semua')
    const [loading, setLoading] = useState<boolean>(true)
    const [screen, setScreen] = useState<number>(window.innerWidth)
    const alphabets = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']

    function getAllBrand(){
        return setTimeout(async()=>{
            const response = await axios.get(`${host}/api/brand?name=true`)
            setLoading(false)
            return setBrands(response.data.brands.map((brand:{name: string})=>brand.name))
        }, 1000)
    }

    useEffect(()=>{
        getAllBrand()
        responsivePage(setScreen)
    }, [])

    function getSelectedBrand(e: any){
        return setFilter(e.target.innerText)
     }

    function SelectOptions(){ 
        return alphabets.map((alphabet, index)=>{
            return <div key={index} onClick={getSelectedBrand} className={`${filter === alphabet ? 'font-bold opacity-100 bg-third text-primary rounded-full' : 'font-semibold opacity-70'} text-[14px] md:text-[16px] hover:cursor-pointer w-[30px] h-[30px] text-center leading-[30px] hover:font-bold hover:opacity-100 transition-all`}>{alphabet}</div>
        }
    )}

    function ShowBrandGroup({alphabet}:{alphabet: string}){
        return brands.map((brand,index)=>{
            if(brand.substring(0,1) === alphabet){
                return (
                    <div className="brand flex gap-x-3 items-center translate-x-[-20px] group-hover:translate-x-0 transition-all" key={index}>
                        <a href={`/brand/${brand}`} className="underline md:no-underline font-medium transition-all text-[11px] md:text-[14px] md:hover:font-bold">
                            {brand}
                        </a>
                    </div> )
            }
        })
    }

    function BrandGroup(){
        return alphabets.map((alphabet, index)=>{
            if(filter !== "Semua" && filter == alphabet){
                return (
                    <div className={ `group-${alphabet} border-b-[1px] border-third flex items-center  gap-x-4 md:gap-x-8 px-6 md:px-10 md:py-4 relative group`} key={index}>
                    <div className="kotak-title absolute md:static md:w-[180px] md:h-[140px] top-1 md:top:0">
                        <h1 className="text-[30px] md:text-[80px] font-black text-center group-hover:-rotate-6 group-hover:scale-[1.35] group-hover:hue-rotate-60 transition duration-300">{alphabet}</h1>
                    </div>
                    <div className="w-full grid grid-cols-2 md:grid-cols-6 gap-y-2 md:gap-y-[10px] gap-x-3 md:gap-x-0 py-8 md:py-0 mt-5 md:mt-0">
                        <ShowBrandGroup alphabet={alphabet}/>
                    </div>
                    </div>
                )
            } else if( filter === "Semua" ) return (
            <div className={ `group-${alphabet} border-b-[1px] border-third flex items-center  gap-x-4 md:gap-x-8 px-6 md:px-10 md:py-4 relative group`} key={index}>
                <div className="kotak-title absolute md:static md:w-[180px] md:h-[140px] top-1 md:top:0">
                    <h1 className="text-[30px] md:text-[80px] font-black text-center group-hover:-rotate-6 group-hover:scale-[1.35] group-hover:hue-rotate-60 transition duration-300">{alphabet}</h1>
                </div>
                <div className="w-full grid grid-cols-2 md:grid-cols-6 gap-y-2 md:gap-y-[10px] gap-x-3 md:gap-x-0 py-8 md:py-0 mt-5 md:mt-0">
                    <ShowBrandGroup alphabet={alphabet}/>
                </div>
            </div>
            )
        })
    }

    function ShowElement(){
        return (
            <div className="flex flex-col gap-y-0 mt-3 px-8">
                <div className="title flex flex-col md:flex-row justify-between items-center">
    
                    <div className="title-text flex items-center md:block gap-x-5">
                        <h1 className="text-[40px] md:text-[44px] font-semibold tracking-tight">Daftar <span className="font-bree-serif text-[50px] italic" >Brand</span></h1>
                    </div>

                    <div className={`grid grid-cols-12 filter gap-y-1 md:gap-0 items-center md:flex md:flex-row mt-8 md:mt-3 top-[200px] right-[75px] bg-primary`}>
                        <div className={`${filter === document.querySelector('.semua')?.innerHTML ? 'font-bold opacity-100' : 'font-normal opacity-70'} ${screen <= 768 ? 'absolute top-[207px] left-[142px]' : 'block'} semua text-[16px] md:text-[16px] hover:cursor-pointer h-[40px] text-center leading-[39px] px-2 hover:font-bold hover:opacity-100 transition-all`} onClick={getSelectedBrand}>Semua</div>
                        <SelectOptions/>
                    </div>
    
                </div>
    
                <div className="list flex flex-col">
                    <BrandGroup/>
                </div>
    
            </div>
        )
    }

    if(loading) return <LoadingPage/>
    else return <ShowElement/>
}