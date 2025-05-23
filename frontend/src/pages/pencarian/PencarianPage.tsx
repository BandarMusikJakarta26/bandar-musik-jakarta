import { useEffect, useState } from "react"
import { useSearchParams } from "react-router"
import axiosClient from "../../../libs/axiosConfig"
import { host } from "../../../libs/config"

export default function PencarianPage(){
    const [searchParams] = useSearchParams()
    const [result, setResult] = useState<{ products: any[], brands: any[], categories: any[] }>({ products: [], brands: [], categories: [] })

    useEffect(()=>{
        async function liveSearch(){
            const response = await axiosClient.get(`api/search/${searchParams.get('search')}`)
            if(!response.data.success || searchParams.get('search') == '' || !response) setResult({ products: [], brands: [], categories: [] })
            else setResult({ products: response.data.products, brands: response.data.brands, categories: response.data.categories })
        }
        liveSearch()
        return setResult({ products: [], brands: [], categories: [] })
    }, [])

    function PencarianBrand({ contents }: { contents: any[] }){
        return contents.map(content=>{
            return (
                <a className="list-content opacity-60 hover:opacity-100 transition-all" href={`/brand/${content.name}`}>
                    <img src={`${host}/storage/${content.image}`} alt="" width={1000}/>
                </a>
            )
        })
    }

    function PencarianKategori({ contents }: { contents: any[] }){
        return contents.map(content=>{
            return (
                <a className="list-content hover:brightness-90 transition-all" href={`/kategori/${content.title}`}>
                    <img src={`${host}/storage/${content.image}`} alt="" width={1000}/>
                </a>
            )
        })
    }

    function PencarianProduk({ contents }: { contents: any[] }){
        return contents.map(content=>{
            return (
                <div className="list-content flex items-center gap-x-10 border-[1px] border-gray-300">
                    <img src={`${host}/storage/${content.images[0]}`} alt="" width={320}/>
                    <div className="text">
                        <p>Produk</p>
                        <a href={`produk/${content.url}`} className="hover:underline transition-all">
                            <p className="text-[22px] font-bold" >{content.name}</p>
                            <p className="text-gray-500 font-normal">{content.url}</p>
                        </a>
                    </div>
                </div>
            )
        })
    }

    function DisplayPencarian({hasil}: { hasil: any }) {
        return (
            <div className="isi-pencarian flex flex-col">
                    
                <div className="brand-section grid grid-cols-3 my-10 gap-x-6">
                    { hasil.brands.length > 0 && <PencarianBrand contents={hasil.brands}/> }
                </div>

                <div className="category-section grid grid-cols-3 my-10 gap-x-6">
                    { hasil.categories.length > 0 && <PencarianKategori contents={hasil.categories}/> }
                </div>
                { hasil.products.length > 0 && <PencarianProduk contents={hasil.products}/> }
            </div>
        )
    }

    return (
        <div className="pencarian w-3/4 m-auto">
            <h1 className="text-[60px] font-bold tracking-tight">Hasil Pencarian</h1>
            <div className="main-content">
                <DisplayPencarian hasil={result}/>
            </div>
        </div>
    )
}