import { useEffect, useState } from "react";
import { PiPaperPlaneTiltBold } from "react-icons/pi"
import { FcLike } from "react-icons/fc"
import axiosClient from "../../../libs/axiosConfig";
import { AxiosResponse } from "axios";

export default function ParentDesktopUI({ product, according, index, children }: { product: any, according: string, index: number, children: any }){
    const [copied, setCopied] = useState<boolean>(false);
    const [cursor, setCursor] = useState<boolean>(false);
    const [like, setLike] = useState<boolean>(false)

    useEffect(()=>{
        async function likeAction(){
            try{
                const response = await axiosClient.get(`/wishlist`) as AxiosResponse
                console.log(response)
            }catch(err){
                console.log(err)
            }
        }
        likeAction()
    }, [like])

    function copyLink(){
        const el = document.createElement('input');
        el.value = `https://bandarmusikjakarta.com/produk/${product.url}`;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
        return setCopied(true)
    }

    if(according == "admin")return (
        <div className="group card p-[6px] relative flex flex-col gap-y-3 bg-[#efefef] rounded-xl transition-all" key={index}>
            <div className="share absolute bottom-[226px] right-[16px] z-20 border-[1px] border-gray-200 flex items-center p-2 rounded-full bg-white">
                <button onClick={()=>copyLink()}>
                    <PiPaperPlaneTiltBold size={18} className={`text-third ${copied && 'opacity-30'} transition duration-500`}/>
                </button>               
            </div>
            { children }
        </div>)
    else return (
        <div className="user relative">
                  <div className="absolute bottom-[226px] right-[54px] z-20 border-[1px] border-gray-200 flex items-center p-2 rounded-full bg-white">
                        <button onClick={()=>like ? setLike(false) : setLike(true)}>
                            <FcLike size={20} className={`text-third transition duration-300 ${like && 'hue-rotate-60 opacity-35'}`}/>
                        </button>               
                    </div>

                  <div className="share absolute bottom-[226px] right-[16px] z-20 border-[1px] border-gray-200 flex items-center p-2 rounded-full bg-white" onMouseOver={()=>setCursor(true)} onMouseLeave={()=>setCursor(false)} >
                        <button onClick={()=>copyLink()}>
                        <PiPaperPlaneTiltBold size={18} className={`text-third ${copied && 'opacity-30'} transition duration-500`}/>
                        </button>               
                    </div>

                    <div className={`absolute bottom-[264px] right-[4px] opacity-0 ${cursor && 'z-30 opacity-100'} text-[9px] bg-primary border-[1px] border-gray-300 italic rounded-lg transition duration-500 py-[1px] text-center w-[54px]`}>
                        <p>{copied ? 'Tersalin' : 'Salin'}</p>
                    </div>

                    <a className="group card relative flex flex-col px-[6px] py-[6px] gap-y-3 bg-[#efefef] rounded-xl transition-all" key={index} href={`/produk/${product.url}`}>
                        { children }
                    </a>
        </div>
    )
}