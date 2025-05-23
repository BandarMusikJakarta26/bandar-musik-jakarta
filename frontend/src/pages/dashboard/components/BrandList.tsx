import { useEffect, useState } from "react";
import ShowBrands from "./ShowBrands";
import { BsArrowLeftSquare, BsArrowRightSquare } from "react-icons/bs";
import responsivePage from "../../../action/screen.action";

export default function BrandList({ brands }: { brands: any[] }){
    const [ current, setCurrent ] = useState<number>(1)
    const [ screen, setScreen ] = useState<number>(window.innerWidth)

    useEffect(()=>responsivePage(setScreen), [])

    const brandPerPage = 36
    const totalPage = Math.ceil(brands.length/brandPerPage)
    const lastBrandIndex = current * brandPerPage
    const firstBrandIndex = lastBrandIndex - brandPerPage
    const currentBrands = brands.slice(firstBrandIndex, lastBrandIndex)

    return (
        <>
        <div className="item-slides flex gap-x-0 md:gap-x-6 relative">
            { current == 1 && <button onClick={()=>setCurrent(totalPage)} className={`text-third static top-0 left-0 ${screen <= 768 && 'absolute top-[-58px] left-0'}`}>
                <BsArrowLeftSquare size={30}/>
            </button> }
            { current !== 1 && <button onClick={()=>setCurrent(current-1)} className={`text-third static top-0 left-0 ${screen <= 768 && 'absolute top-[-58px] left-0'}`}>
                <BsArrowLeftSquare size={30}/>
            </button> }
            <div className="brand-list grid md:grid-cols-12 grid-cols-4 gap-[6px] md:gap-5">
                { brands && brands.length != 0 ? <ShowBrands brands={currentBrands}/> : false }
            </div>
            { current == totalPage && <button onClick={()=>setCurrent(1)} className={`text-third ${screen <= 768 ? 'absolute top-[-58px] right-0' : 'relative top-0 right-0'}`}>
                <BsArrowRightSquare size={30}/>
            </button> }
            { current !== totalPage && <button onClick={()=>setCurrent(current+1)} className={`text-third ${screen <= 768 ? 'absolute top-[-58px] right-0' : 'relative top-0 right-0'}`}>
                <BsArrowRightSquare size={30}/>
            </button> }
        </div>
        <div className="brand-line w-full bg-third py-[1px]"></div>
        </>
    )
}