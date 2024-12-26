import { desks } from '../../../../libs/desk.list'

export default function Deskripsi({explore}:any){
  function DeskripsiList(){ 
    return desks.map((desk, index)=>{
      return (
        <div className="kotak flex flex-col justify-center items-center" key={index}>
          { typeof desk.icon == 'string' ? <h1 className="text-[38px] font-extrabold tracking-tighter">{desk.icon}</h1> : desk.text !== 'Explore' ? <desk.icon size={40}/> : false }
          { desk.text == "Explore" ? <desk.icon size={60} className="hover:cursor-pointer hover:scale-105 transition-all" onClick={explore}/> : <p className={`text-[18px] ${typeof desk.icon == 'string' ? '-mt-[12px]' : false} `}>{desk.text}</p> }
        </div>
      )
    })
  }

    return (
        <div className="deskripsi grid grid-cols-5 mt-6 gap-6">
          <DeskripsiList/>
      </div>
    )
}