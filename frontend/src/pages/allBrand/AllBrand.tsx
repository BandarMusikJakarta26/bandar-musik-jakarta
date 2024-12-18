import axios from "axios"
import { useEffect, useState } from "react"
import { host } from "../../../libs/config"

export default function AllBrand(){
    const [brands, setBrands] = useState<any[]>([])
    const [filter, setFilter] = useState<string>('Semua')
    const alphabets = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']


    async function getAllBrand(){
        const response = await axios.get(`${host}/admin/brand?name=true`)
        setBrands(response.data.brands.map((brand:{name: string})=>brand.name))
    }

    useEffect(()=>{ getAllBrand() }, [])

    function getSelectedBrand(e: any){
        return setFilter(e.target.innerText)
     }

    function SelectOptions(){ 
        return alphabets.map((alphabet, index)=>{
            return <div key={index} onClick={getSelectedBrand} className={`${filter === alphabet ? 'font-bold opacity-100 bg-third text-primary rounded-full' : 'font-semibold opacity-70'} text-[18px] hover:cursor-pointer w-[40px] h-[40px] text-center leading-[40px] hover:font-bold hover:opacity-100 transition-all`}>{alphabet}</div>
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
                    <div className={ `group-${alphabet} border-2 border-third rounded-[36px] flex items-center gap-x-16 px-10 py-4 `} key={index}>
                        <div className="kotak-title w-[140px] h-[140px]">
                            <h1 className="text-[100px] font-black text-center leading-[130px]">{alphabet}</h1>
                        </div>
                        <div className="w-full grid grid-cols-3 text-[20px] gap-y-3">
                            <ShowBrandGroup alphabet={alphabet}/>
                        </div>
                    </div>
                )
            } else if( filter === "Semua" ) return (
            <div className={ `group-${alphabet} border-2 border-third rounded-[36px] flex items-center gap-x-16 px-10 py-4 `} key={index}>
                <div className="kotak-title w-[140px] h-[140px]">
                    <h1 className="text-[100px] font-black text-center leading-[130px]">{alphabet}</h1>
                </div>
                <div className="w-full grid grid-cols-3 text-[20px] gap-y-3">
                    <ShowBrandGroup alphabet={alphabet}/>
                </div>
            </div>
            )
        })
    }

    return (
        <div className="flex flex-col gap-y-6">
            <div className="title flex justify-between items-center">

                <h1 className="text-[60px] font-bold tracking-tight">Daftar Brand</h1>
                <div className="filter flex mt-3">
                    <div className={`${filter === document.querySelector('.semua')?.innerHTML ? 'font-bold opacity-100' : 'font-semibold opacity-70'} semua text-[18px] hover:cursor-pointer h-[40px] text-center leading-[39px] px-2 hover:font-bold hover:opacity-100 transition-all`} onClick={getSelectedBrand}>Semua</div>
                    <SelectOptions/>
                </div>

            </div>

            <div className="list flex flex-col gap-y-8">
                <BrandGroup/>
            </div>

        </div>
    )
}