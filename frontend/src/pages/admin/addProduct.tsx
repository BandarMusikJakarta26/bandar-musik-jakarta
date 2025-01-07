import { useEffect, useState } from "react"
import { host } from "../../../libs/config"
import axios, { AxiosResponse } from "axios"
import { useNavigate } from "react-router"
import BlankPage from "../blank"
import { checkAdmin } from "../../action/auth.action"

export default function AddProduct(){
    const [ admin, isAdmin ] = useState<boolean>(false) 
    async function adminValidation() { return await isAdmin(await checkAdmin()) }
    adminValidation()

    const [ brands, setBrand ] = useState<any[]>([])
    const [ categories, setCategories ] = useState<any[]>([])
    const [ file, setFile ] = useState<File | null>(null)
    const [ checkCategory, getCategory ] = useState<any>(null)
    const [ checkBrand, getBrand ] = useState<any>(null)
    const navigate = useNavigate()

    async function getBrands(){
        const response = await axios.get(`${host}/admin/brand`) as AxiosResponse
        response.data.brands.length > 0 ? setBrand(response.data.brands) : setBrand([])
    }

    async function getCategories(){
        const response = await axios.get(`${host}/admin/kategori`) as AxiosResponse
        response.data.categories.length > 0 ? setCategories(response.data.categories) : setCategories([])
    }

    function SelectBrand(){ return brands.map((brand, index)=><option value={brand.name} key={index} selected={ brand.name === checkBrand ? true : false }>{brand.name}</option> )}
    function SelectCategory(){ return categories.map((category, index)=><option value={category.name} key={index} selected={ category.name === checkCategory ? true : false } >{category.name}</option> )}

    useEffect(()=>{
        getBrands()
        getCategories()
    }, [])

    async function onUploadForm(){
        const upload = new FormData(document.querySelector('form')!)
        upload.append('file', file!)
        await axios.post(`${host}/admin/tambah/produk`, upload)
        return navigate(0)
    }

    function changeCategory(e:any){ getCategory(e.target.value) }
    function changeBrand(e:any){ getBrand(e.target.value) }

    if(!admin) return <BlankPage/>
    else return (
        <div className="addProduct px-16 mt-[6px]">
            <div className="w-full ml-[60px] shadow-xl px-[50px] flex flex-col gap-y-2">
                <h1 className="text-[48px] font-bold tracking-tight ">Tambah Produk</h1>

                <div className="form flex flex-col gap-y-6 relative h-[500px]">

                    <form className="flex flex-col gap-y-6" onSubmit={(e)=>e.preventDefault()}>

                    <div className="input-top grid grid-cols-[2fr_1fr] gap-x-20">
                    <input type="text" name="name" placeholder="Masukkan nama produk..." className="name"/>
                    <input type="text" name="harga" placeholder="Masukkan harga brand..."/>
                    </div>
                    <input type="text" name="deskripsi" placeholder="Masukkan deskripsi produk"/>

                    <div className="select grid grid-cols-2 gap-x-20">

<select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 selectKategori" name="kategori" onChange={changeCategory}>
    <option className="font-semibold text-gray-400" disabled>Kategori</option>
    <SelectCategory/>
</select>

<select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 selectBrand" name="brand" onChange={changeBrand}>
    <option className="font-semibold text-gray-400" value="brand" disabled>Brand</option>
    <SelectBrand/>
</select>

                    </div>

                    <div className="input-btm grid grid-cols-[2fr_1fr] gap-x-20 absolute w-full bottom-8">
                    <input type="text" name="tokped" placeholder="Masukkan link tokopedia"/>
                    <button type="submit" className="border-2 border-third rounded-full text-[20px] font-semibold py-2 hover:bg-third hover:text-primary transition-all" onClick={onUploadForm}>Upload</button>
                    </div>

                    </form>
                    

                    <div className="flex items-center justify-center w-full">
                    <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                        </svg>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                </div>
                <input type="file" className="hidden" name="file" onChange={(e)=>{setFile(e.target.files![0])}}/>
                </label>
                    </div> 

                </div>

            </div>
        </div>
    )

}