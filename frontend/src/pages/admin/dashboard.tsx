import { useEffect, useState } from "react"
import { getBrands } from "../../action/brand.action"
import { getCategories } from "../../action/kategori.action"
import { getProducts } from "../../action/produk.action"

const dataSet= [
    { data: 'Brand', jumlah: 0 },
    { data: 'Kategori', jumlah: 0 },
    { data: 'Produk', jumlah: 0 },
    { data: 'In-Stock', jumlah: 0 },
    { data: 'On-Stock', jumlah: 0 },
    { data: 'Pre-Order', jumlah: 0 },
]

export default function AdminDashboard(){
    const [ dataGroup, setDataGroup ] = useState<typeof dataSet | any[]>(dataSet)

    async function getTotalData(){
        const jumlahBrand = await getBrands()
        const jumlahKategori = await getCategories()
        const jumlahProduk = await getProducts()

        return setDataGroup([
            { data: 'Brand', jumlah: jumlahBrand },
            { data: 'Kategori', jumlah: jumlahKategori },
            { data: 'Produk', jumlah: jumlahProduk.inStock + jumlahProduk.onStock + jumlahProduk.preOrder },
            { data: 'In-Stock', jumlah: jumlahProduk.inStock },
            { data: 'On-Stock', jumlah: jumlahProduk.onStock },
            { data: 'Pre-Order', jumlah: jumlahProduk.preOrder },
        ])
    }


    useEffect(()=>{ getTotalData() },[])


    function DisplayData(){
        return dataGroup.map((satuan, index)=>{
            return (
                <div className="card flex flex-col items-center" key={index}>
                    <div className="angka w-full border-2 border-third text-[30px] tracking-tight rounded-xl text-center font-extrabold h-[95px] leading-[95px]">{satuan.jumlah}</div>
                    <h1>{satuan.data}</h1>
                </div>
            )
        })
    }

    return (
        <div className="dashboard pt-[44px] px-4">
            <h1 className="text-[30px] font-bold tracking-tight">Halo Admin!</h1>

            <div className={`statistik grid grid-cols-3 gap-x-6 gap-y-10 mt-3`}>
                <DisplayData/>
            </div>
        </div>
    )
}