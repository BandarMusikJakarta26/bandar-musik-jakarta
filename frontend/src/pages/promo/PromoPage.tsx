import React from "react"
import HeadlinePromo from "./HeadlinePromo"
// import axiosClient from "../../../libs/axiosConfig"
// import { AxiosResponse } from "axios"

const PromoPage = function(){
    // useEffect(()=>{
    //     async function getPromos(){
    //         try{
    //             const promos = await axiosClient.get('/api/promo') as AxiosResponse
    //             console.log(promos)
    //         }catch(err: any){
    //             console.log(err)
    //         }
    //     }
    //     getPromos()
    // }, [])

    return (
        <div className="mobile px-6 md:px-0 flex flex-col gap-y-20">
            <HeadlinePromo/>
        </div>
    )
}

export default React.memo(PromoPage)