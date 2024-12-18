import { IoIosArrowDropdown } from "react-icons/io";
import { MdVerified } from "react-icons/md";

export default function Deskripsi({explore}:any){
    return (
        <div className="deskripsi grid grid-cols-5 mt-6 gap-6">
        <div className="kotak flex flex-col justify-center items-center">
          <h1 className="text-[36px] font-extrabold tracking-tighter">100%</h1>
          <p className="text-[18px] -mt-3">Original</p>
        </div>
        <div className="kotak flex flex-col justify-center items-center">
          <MdVerified size={60} color="white"/>
          <p className="text-[18px] -mt-3">Terpercaya</p>
        </div>
        <div className="explore-button flex justify-center items-center">
          <IoIosArrowDropdown size={60} className="hover:cursor-pointer hover:scale-105 transition-all" onClick={explore}/>
        </div>
        <div className="kotak flex flex-col justify-center items-center">
          <MdVerified size={60} color="white"/>
          <p className="text-[18px] -mt-3">Terlengkap</p>
        </div>
        <div className="kotak flex flex-col justify-center items-center">
          <MdVerified size={60} color="white"/>
          <p className="text-[18px] -mt-3">Terlengkap</p>
        </div>
      </div>
    )
}