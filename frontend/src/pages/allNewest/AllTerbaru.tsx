import { useEffect, useState } from "react"
// import { getTerbaru } from "../../action/terbaru.action"
import { getNewestProduct } from "../../action/produk.action"
import ShowAllProducts from "../../components/ShowAllProducts"
import { useSearchParams } from "react-router"

export default function AllTerbaru(){
    const [ terbaru, setTerbaru ] = useState<any[]>([])
    const [ searchParams ] = useSearchParams()

    useEffect(()=>{ getNewestProduct(setTerbaru, searchParams.get('kategori')!, searchParams.get('brand')!)}, [])

  console.log(terbaru)

    // useEffect(()=>{ getTerbaru(setTerbaru) })

    return (
        <div className="terbaru mt-1 px-6">
        <div className="terbaru-text mb-8 flex flex-col items-center md:block">
          <h1 className="text-[60px] md:text-[72px] uppercase font-black tracking-tight">Terbaru</h1>
          <h1 className="text-[16px] md:text-[30px] font-light italic mt-[-14px]">Produk terbaru dari Bandar Musik Jakarta</h1>
        </div>
        <div className="terbaru-list">
          { terbaru.length > 0 && <ShowAllProducts products={terbaru} according='Terbaru' deleteAction={false} setProducts={setTerbaru} login={false} /> }
        </div>
        </div>
    )
}