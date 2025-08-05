import { useEffect, useState } from "react"
import axiosClient from "../../../libs/axiosConfig"
import { AxiosResponse } from "axios"
import { host } from "../../../libs/config"

interface INews {
    title: string, description: string, image: string
}

export default function NewsPage({ login }: { login: boolean }){
    const [news, setNews] = useState<INews[] | []>([])
    const [primary, setPrimary] = useState<INews | null>(null)

    useEffect(()=>{
        async function getNews(){
            try{
                const response = await axiosClient.get('/api/news') as AxiosResponse
                setPrimary(response.data.news[0])
                return setNews(response.data.news.filter((berita: INews, index: number)=>{
                    console.log(berita)
                    return index !== 0
                }))
            }catch(err: any){
                console.log(err.message)
            }
        }
        getNews()
    }, [])

    function ShowNews(){
        return news.map((berita, index)=>{
            return (
                <div className="news-sec relative rounded-2xl overflow-hidden" key={index}>
                <img className="news-photo w-full h-[300px] bg-red-500" src={`${host}/storage/${berita.image}`}/>

                <div className="texting absolute bottom-[50px] left-7 text-primary z-10">

                <h1 className="text-[30px] tracking-tight font-bold">{berita.title}</h1>
                <p className="text-[14px]">{berita.description}</p>


                </div>

                <div className="siluet bg-gradient-to-t from-gray-900 to-transparent w-full h-[200px] absolute bottom-0"></div>

                </div>
            )
        })
    }

    return (
        <div className={`main px-10 md:px-16 ${login && 'pt-[90px]'}`}>

            <div className="header flex flex-col md:flex-row md:justify-between md:items-center">
                <div className="kiri flex items-center gap-x-8">
                    <h1 className="text-[48px] font-extrabold tracking-tight">Topik Terkini</h1>
                    { login && <div className="admin">
                        <a href="admin/tambah/news" className="px-6 py-2 border-[1px] rounded-lg border-third hover:bg-third hover:text-primary transition duration-200">Tambah Berita</a>
                    </div>}
                </div>

                    { primary && <h1 className="text-[20px] font-semibold tracking-tight text-white bg-red-500 px-6 rounded-md py-1">Top News</h1> }
                   
            </div>
            


            { primary &&
            <>
            <div className="news-sec relative rounded-2xl overflow-hidden">

                <img className="news-photo w-full h-[300px]" src={`${host}/storage/${primary!.image}`}/>
                <div className="texting absolute bottom-[50px] left-7 text-primary z-10">

                <h1 className="text-[40px] tracking-tight font-bold">{primary!.title}</h1>
                <p className="text-[18px]">{primary!.description}</p>

                </div>

                <div className="siluet bg-gradient-to-t from-gray-900 to-transparent w-full h-[300px] bottom-0 absolute"></div>

            </div>
            </> }


            { news && news.length > 0 ?
            <>
                <h1 className="mt-10 text-[24px] mb-2 italic font-semibold tracking-tight">Related News</h1>
                <div className="sub-news grid md:grid-cols-3 md:gap-x-5">
                    <ShowNews/>
                </div>
            </>
            : null}
        </div>
    )
}