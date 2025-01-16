import axios from "axios"
import { useEffect, useState } from "react"
import { host } from "../../../libs/config"
import responsivePage from "../../action/screen.action"

export default function AllBrand(){
    const [brands, setBrands] = useState<any[]>([])
    const [filter, setFilter] = useState<string>('Semua')
    const [loading, setLoading] = useState<boolean>(true)
    const [screen, setScreen] = useState<number>(window.innerWidth)
    const alphabets = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']

    async function getAllBrand(){
        const response = await axios.get(`${host}/api/brand?name=true`)
        setBrands(response.data.brands.map((brand:{name: string})=>brand.name))
    }

    useEffect(()=>{
        getAllBrand()
        setLoading(false)
        responsivePage(setScreen)
    }, [])

    function getSelectedBrand(e: any){
        return setFilter(e.target.innerText)
     }

    function SelectOptions(){ 
        return alphabets.map((alphabet, index)=>{
            return <div key={index} onClick={getSelectedBrand} className={`${filter === alphabet ? 'font-bold opacity-100 bg-third text-primary rounded-full' : 'font-semibold opacity-70'} text-[14px] md:text-[18px] hover:cursor-pointer w-[30px] h-[30px] text-center leading-[30px] hover:font-bold hover:opacity-100 transition-all`}>{alphabet}</div>
        }
    )}

    function ShowBrandGroup({alphabet}:{alphabet: string}){
        return brands.map((brand,index)=>{
            if(brand.substring(0,1) === alphabet){
                return (
                    <div className="brand" key={index+5}>
                        <a href={`/brand/${brand}`}>{brand}</a>
                    </div> )
            }
        })
    }

    function BrandGroup(){
        return alphabets.map((alphabet, index)=>{
            if(filter !== "Semua" && filter == alphabet){
                return (
                    <div className={ `group-${alphabet} border-2 border-third rounded-[36px] flex items-center  gap-x-3 md:gap-x-16 px-6 md:px-10 md:py-4`} key={index}>
                        <div className="kotak-title w-[140px] md:h-[140px]">
                            <h1 className="text-[70px] md:text-[100px] font-black text-center leading-[130px]">{alphabet}</h1>
                        </div>
                        <div className="w-full grid grid-cols-2 md:grid-cols-3 text-[14px] md:text-[20px] gap-y-3">
                            <ShowBrandGroup alphabet={alphabet}/>
                        </div>
                    </div>
                )
            } else if( filter === "Semua" ) return (
            <div className={ `group-${alphabet} border-2 border-third rounded-[36px] flex items-center  gap-x-3 md:gap-x-16 px-6 md:px-10 md:py-4`} key={index}>
                <div className="kotak-title w-[140px] md:h-[140px]">
                    <h1 className="text-[70px] md:text-[100px] font-black text-center leading-[130px]">{alphabet}</h1>
                </div>
                <div className="w-full grid grid-cols-2 md:grid-cols-3 text-[14px] md:text-[20px] gap-y-3">
                    <ShowBrandGroup alphabet={alphabet}/>
                </div>
            </div>
            )
        })
    }

    function ShowElement(){
        return (
            <div className="flex flex-col gap-y-6 mt-3 px-8">
                <div className="title flex flex-col md:flex-row justify-between items-center">
    
                    <div className="title-text flex items-center md:block gap-x-5">
                        <h1 className="text-[40px] md:text-[60px] font-bold tracking-tight">Daftar Brand</h1>
                    </div>

                    <div className={`grid grid-cols-12 filter gap-y-1 md:gap-0 items-center md:flex md:flex-row mt-8 md:mt-3 top-[200px] right-[75px] bg-primary`}>
                        <div className={`${filter === document.querySelector('.semua')?.innerHTML ? 'font-bold opacity-100' : 'font-semibold opacity-70'} ${screen <= 768 ? 'absolute top-[207px] left-[142px]' : 'block'} semua text-[16px] md:text-[18px] hover:cursor-pointer h-[40px] text-center leading-[39px] px-2 hover:font-bold hover:opacity-100 transition-all`} onClick={getSelectedBrand}>Semua</div>
                        <SelectOptions/>
                    </div>
    
                </div>
    
                <div className="list flex flex-col gap-y-8">
                    <BrandGroup/>
                </div>
    
            </div>
        )
    }

    function LoadingPage(){
        return <h1>Loading</h1>
    }

    if(loading) return <LoadingPage/>
    else return <ShowElement/>
}