import { useEffect, useState } from "react"
import { checkAdmin } from "../../action/auth.action"
import BlankPage from "../blank"
import { getBrands } from "../../action/brand.action"
import { getCategories } from "../../action/kategori.action"
import { getProducts } from "../../action/produk.action"

const dataSet= [
    { data: 'Brand', jumlah: 0 },
    { data: 'Kategori', jumlah: 0 },
    { data: 'Produk', jumlah: 0 },
]

export default function AdminDashboard(){
    const [ dataGroup, setDataGroup ] = useState<typeof dataSet>([])
    const [ admin, isAdmin ] = useState<boolean>(false) 
    const [ brands, setBrands ] = useState<any[]>([])
    const [ categories, setCategories ] = useState<any[]>([])
    const [ products, setProducts ] = useState<any[]>([])
    
    async function adminValidation() { return await isAdmin(await checkAdmin()) }
    adminValidation()

    async function getTotalData(){
        await getBrands(setBrands)
        await getCategories(setCategories)
        await getProducts(setProducts)
        
        return setDataGroup([
            { data: 'Brand', jumlah: brands.length },
            { data: 'Kategori', jumlah: categories.length },
            { data: 'Produk', jumlah: products.length },
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


    if(!admin) return <BlankPage/>
    else return (
        <div className="dashboard pt-[44px] px-4">
            <h1 className="text-[30px] font-bold tracking-tight">Halo Admin!</h1>

            <div className="statistik grid grid-cols-3 gap-x-6 mt-3">
                <DisplayData/>
            </div>
        </div>
    )
}