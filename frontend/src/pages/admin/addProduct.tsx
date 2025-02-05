import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { getBrands } from "../../action/brand.action"
import { getCategories } from "../../action/kategori.action"
import axiosClient from "../../../libs/axiosConfig"
import { FaPercent } from "react-icons/fa";
import { setCurrency } from "../../action/produk.action"

const AddProduct = function(){
    const [ image, setImage ] = useState<number>(0)
    const [ brands, setBrand ] = useState<any[]>([])
    const [ url, setUrl ] = useState<string>('')
    const [ hargaOnline, setHargaOnline ] = useState<string>('')
    const [ hargaOffline, setHargaOffline ] = useState<string>('')
    const [ hargaPromo, setHargaPromo ] = useState<string>('')
    const [ hargaPrice, setHargaPrice ] = useState<string>('')
    const [ hargaDiskon, setDiskon ] = useState<string>('')

    const [ potongan, setPotongan ] = useState<any>(0)
    const [ stock, setStock ] = useState<any>(0)
    const [ categories, setCategories ] = useState<any[]>([])
    const [ files, setFiles ] = useState<FileList | null>(null)
    const [ checkPromo, getPromo ] = useState<any>(null)
    const [ checkCategory, getCategory ] = useState<any>(null)
    const [ checkBrand, getBrand ] = useState<any>(null)
    const [ coret, setCoret ] = useState<boolean>(false)
    const [ usePromo, activatePromo ] = useState<boolean>(false)
    const [ coretPrice, setCoretPrice ] = useState<boolean>(false)
    const [ loading, setLoading ] = useState<boolean>(false)

    const [ panjang, setPanjang ] = useState<string>('')
    const [ lebar, setLebar ] = useState<string>('')
    const [ tinggi, setTinggi ] = useState<string>('')

    const navigate = useNavigate()

    const promos = ['Walk-in', 'Akhir Tahun', 'Cuci Gudang']

    async function getDataBrands(){
        if(brands.length > 0) setBrand(brands)
        return await getBrands(setBrand)
    }
    async function getDataCategories(){
        if(categories.length > 0) setCategories(categories)
        return await getCategories(setCategories)
    }

    function SelectBrand(){ return brands.map((brand, index)=><option value={brand.name} key={index} selected={ brand.name === checkBrand ? true : false }>{brand.name}</option> )}

    function SelectCategory(){ return categories.map((category, index)=><option value={category.title} key={index} selected={ category.title === checkCategory ? true : false } >{category.title}</option> )}

    function SelectPromo(){ return promos.map((promo, index)=><option value={promo} key={index} selected={ promo === checkPromo ? true : false } >{promo}</option> )}

    useEffect(()=>{
        getDataBrands()
        getDataCategories()
    }, [])

    async function onUploadForm(){
        try{
            const upload = new FormData(document.querySelector('form')!)

            const promo = upload.get('promo') as string
            if(promo.trim() == ""){ upload.append('promo', '') }
            if(hargaOnline.trim() == ""){ upload.append('onlinePrice', '') }
            if(hargaOffline.trim() == ""){ 
                setCoret(false)
                upload.append('offlinePrice', '')
            }
            if(hargaPrice.trim() == ""){ 
                setCoret(false)
                upload.append('pricelist', '')
            }

            if(stock == "" || !stock){
                upload.append('stock', "0")
            }else upload.append('stock', stock.toLocaleString())

            for(let i = 0; i < files!.length; i++){
                upload.append(`images[]`, files![i])
            }

            if(coret){
                let offline = hargaOffline
                offline = `${offline} true`
                upload.append('offlinePrice', offline)
            }
            if(coretPrice){
                let pricelist = hargaPrice
                pricelist = `${pricelist} true`
                upload.append('pricelist', pricelist)
            }

            await axiosClient.post(`api/tambah/produk`, upload)
            return navigate('/admin/produk')
        }catch(error:any){ console.log(error) }
        finally{
            setLoading(false)
        }
      
    }

    function setHargaDiskon(harga: string, potonganHarga?: string){
        const hargaSatuan = parseInt(harga) as number
        let diskon
        const potonganDiskon = potonganHarga || potongan
        if(!potonganDiskon || parseInt(potonganDiskon) == 0) diskon = hargaSatuan
        else {
            const potong = (hargaSatuan*parseInt(potonganDiskon))/100
            diskon = hargaSatuan - potong as any
        }
        setDiskon(diskon)
    }

    function changePromo(e:any){ getPromo(e.target.value) }
    function changeCategory(e:any){ getCategory(e.target.value) }
    function changeBrand(e:any){ getBrand(e.target.value) }
    function generateUrlValue(e:any){
        let formValue= e.target.value as any
        formValue = formValue.split(" ").join("-").toLowerCase()
        formValue = formValue.split("")
        formValue = formValue.filter((value:string)=>value!=="/").join("")
        return setUrl(formValue)
    }

    return (
        <div className="addProduct md:px-16 pt-16">
            <div className="w-full border-2 border-gray-300 rounded-3xl px-[20px] md:px-[100px] flex flex-col gap-y-10 bg-white my-10 py-8">
                <h1 className="text-[30px] text-center md:text-[48px] font-bold tracking-tight">Tambah Produk</h1>

                <div className="form flex flex-col gap-y-6 relative pb-36">

                    <form className="flex flex-col gap-y-6" onSubmit={(e)=>e.preventDefault()}>

                    <div className="input-top gap-x-12 gap-y-4 md:gap-y-0 mb-8">
                        <div className="input-group grid grid-cols-[6fr_1fr] gap-x-10">
                            <div className="nama">

                            <p className="opacity-70 italic indent-5">Nama Produk</p>
                            <input type="text" name="name" placeholder="Masukkan nama produk" className="name w-full text-[14px] md:text-[18px] tambah indent-0" onChange={generateUrlValue}/>
                            <input type="text" name="url" placeholder="Masukkan link url" value={url} readOnly className="w-full text-center italic text-[12px] md:text-[13px] opacity-80 indent-0 mt-1 bg-white"/>

                            </div>
                            <div className="berat relative">

                            <p className="opacity-70 italic indent-5">Berat</p>
                            <input type="text" name="berat" placeholder="Berat" className="name w-full text-[14px] md:text-[18px] tambah indent-0"/>
                            <p className="opacity-60 absolute top-[37px] right-6">gram</p>

                            </div>
                            

                        </div>
                    </div>
                    
                    <div className="input-group -mt-8">
                        <p className="opacity-70 italic indent-5">Deskripsi Produk</p>
                        <textarea name="description" placeholder="Masukkan deskripsi produk" className="h-[200px] indent-0 text-[14px] md:text-[18px] tambah resize-none w-full"/>
                    </div>

                    {/* Ukuran */}
                    <div className="dimensiheader flex gap-x-3 items-center mt-10">
                        <h1 className="text-[22px] font-semibold tracking-tight">Ukuran</h1>
                    </div>

                    <div className="dimensi grid grid-cols-3 gap-x-10 -mt-3 mb-2">

                    <div className="input-group relative">
                            <p className="opacity-70 italic">Panjang</p>
                            <input type="text" name="panjang" placeholder="Panjang" onChange={(e)=>{
                                setPanjang(e.target.value)
                            }} value={panjang} className="w-full text-[14px] md:text-[18px] indent-0 tambah"/>
                            <p className="opacity-60 absolute top-[37px] right-6">cm</p>
                    </div>
                    <div className="input-group relative">
                            <p className="opacity-70 italic">Lebar</p>
                            <input type="text" name="lebar" placeholder="Lebar" onChange={(e)=>{
                                setLebar(e.target.value)
                            }} value={lebar} className="w-full text-[14px] md:text-[18px] indent-0 tambah"/>
                            <p className="opacity-60 absolute top-[37px] right-6">cm</p>
                    </div>
                    <div className="input-group relative">
                            <p className="opacity-70 italic">Tinggi</p>
                            <input type="text" name="tinggi" placeholder="Tinggi" onChange={(e)=>{
                                setTinggi(e.target.value)
                            }} value={tinggi} className="w-full text-[14px] md:text-[18px] indent-0 tambah"/>
                            <p className="opacity-60 absolute top-[37px] right-6">cm</p>
                    </div>

                    </div>

                    {/* Harga */}
                    <div className="promoheader flex gap-x-3 items-center mt-10">
                        <h1 className="text-[22px] font-semibold tracking-tight">Harga</h1>
                    </div>

                    <div className="harga grid grid-cols-2 gap-x-8 -mt-3">

                        {/* Pricelist */}
                        <div className="input-group relative">
                            <div className="price-title flex justify-between">
                                <p className="opacity-70 italic indent-5">Pricelist</p>
                                <div className="coret flex items-center gap-x-2 pr-4">
                                    <span className="opacity-70 italic text-[14px]">Coret</span>
                                    <input type="checkbox" name="coretPrice" onClick={()=>{
                                        if(coretPrice) return setCoretPrice(false)
                                        else return setCoretPrice(true)
                                    }}/>
                                </div>
                            </div>
                            <input type="text" name="pricelist" placeholder="0" onChange={(e)=>{
                                setHargaPrice(e.target.value)
                                setHargaDiskon(e.target.value)
                            }} value={hargaPrice} className={`w-full text-[14px] md:text-[18px] ${coretPrice ? 'line-through' : ''} tambah indent-[30px]`}/>
                            <p className={`opacity-60 mt-2 text-[14px] absolute top-[30px] right-5 ${coretPrice ? 'line-through' : ''}`}>{setCurrency(hargaPrice)}</p>
                            <p className="py-1 px-2 bg-gray-200 rounded-md absolute top-[32px] left-[8px]">Rp</p>
                        </div>


<div className="input-group relative grid grid-cols-[4fr_1fr] gap-x-8">

    {/* Diskon */}
    <div className="diskon relative">

    <div className="offline-text flex gap-x-2">
        <p className="opacity-70 italic indent-5">Diskon</p>
    </div>

    <input type="text" name="hargaDiskon" placeholder="0" value={hargaDiskon} className={`w-full text-[14px] md:text-[18px] tambah indent-[30px]`} disabled/>
    <p className="opacity-60 mt-2 text-[14px] absolute top-[30px] right-5">{setCurrency(hargaDiskon)}</p>
    <p className="py-1 px-2 bg-gray-200 rounded-md absolute top-[32px] left-[8px]">Rp</p>

    </div>

    {/* Potongan */}
    <div className="potongan gap-x-10 relative">

<div className="input-group">
    <p className="opacity-70 italic">Potongan</p>
    <input type="text" name="potongan" placeholder="0" onChange={(e)=>{
        if(parseInt(e.target.value) < 0) setPotongan(0)
        else if(parseInt(e.target.value) > 100) setPotongan(100)
        else setPotongan(e.target.value)
        if(hargaPrice) setHargaDiskon(hargaPrice, e.target.value)
    }} value={potongan} className="w-full text-[14px] md:text-[18px] indent-0 tambah"/>
</div>

    <FaPercent size={13} className="text-third absolute top-[41px] right-[20px]"/>

    </div>

</div>

                    </div>

                    {/* Harga Online Offline */}
                    <div className="input-top grid md:grid-cols-2 gap-x-10 md:gap-y-0">
                        <div className="input-group relative">
                            <p className="opacity-70 italic indent-5">Harga Online</p>
                            <input type="text" name="onlinePrice" placeholder="0" onChange={(e)=>{setHargaOnline(e.target.value)}} value={hargaOnline} className="w-full text-[14px] md:text-[18px] tambah indent-[30px]"/>
                            <p className="opacity-60 mt-2 text-[14px] absolute top-[30px] right-5">{setCurrency(hargaOnline)}</p>
                            <p className="py-1 px-2 bg-gray-200 rounded-md absolute top-[32px] left-[8px]">Rp</p>
                        </div>

                        <div className="input-group relative">
                            <div className="offline-text flex justify-between">
                                
                                <p className="opacity-70 italic indent-5">Harga Offline</p>
                                <div className="coret flex items-center gap-x-2 pr-4">
                                    <span className="opacity-70 italic text-[14px]">Coret</span>
                                    <input type="checkbox" name="coret" onClick={()=>{
                                        if(coret) return setCoret(false)
                                        else return setCoret(true)
                                    }}/>
                                </div>
                            </div>
                            
                            <input type="text" name="offlinePrice" placeholder="0" onChange={(e)=>{ setHargaOffline(e.target.value)}} value={hargaOffline} className={`w-full text-[14px] md:text-[18px] ${coret ? 'line-through' : ''} tambah indent-[30px]`}/>
                            <p className={`opacity-60 mt-2 text-[14px] absolute top-[30px] right-5 ${coret ? 'line-through' : ''}`}>{setCurrency(hargaOffline)}</p>
                            <p className="py-1 px-2 bg-gray-200 rounded-md absolute top-[32px] left-[8px]">Rp</p>
                        </div>
                    </div>

                    <div className="promoheader flex gap-x-3 items-center mt-10">
                        <h1 className="text-[22px] font-semibold tracking-tight">Promo</h1>
                        <input type="checkbox" className="w-5 h-5" onClick={()=>{
                            if(usePromo) return activatePromo(false)
                            else return activatePromo(true)
                        }} checked={usePromo ? true : false}/>
                    </div>

                    {/* Promo */}
                    <div className={`promo ${usePromo ? 'block' : 'hidden'} grid grid-cols-3 gap-x-10 -mt-3`}>

                        <div className="input-group">
                            <p className="opacity-70 italic indent-5">Nama Promo</p>
                            <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 select-tambah" name="namaPromo" onChange={changePromo}>
                                <option className="font-semibold text-gray-400" disabled selected>Promo</option>
                                <SelectPromo/>
                            </select>
                        </div>
                        <div className="input-group relative">
                            <p className="opacity-70 italic indent-5">Harga {checkPromo !== '' ? checkPromo : 'Promo' }</p>
                            <input type="text" name="promo" placeholder="0" onChange={(e)=>{setHargaPromo(e.target.value)}} value={hargaPromo} className="w-full text-[14px] md:text-[18px] tambah indent-[30px]"/>
                            <p className="opacity-40 mt-2 text-[14px] absolute top-[30px] right-5">{setCurrency(hargaPromo)}</p>
                            <p className="py-1 px-2 bg-gray-200 rounded-md absolute top-[32px] left-[8px]">Rp</p>
                        </div>
                        <div className="input-group">
                            <p className="opacity-70 italic">Stock</p>
                            <input type="number" name="stock" placeholder="Stock" onChange={(e)=>{
                                if(parseInt(e.target.value) < 0) setStock(0)
                                else setStock(e.target.value)
                            }} value={stock} className="w-full text-[14px] md:text-[18px] indent-0 tambah"/>
                        </div>
                    </div>

                    {/* Category dan Brand */}
                    <div className="select grid grid-cols-2 gap-x-20 mt-10">

<select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 selectKategori select-tambah" name="kategori" onChange={changeCategory}>
    <option className="font-semibold text-gray-400" disabled>Kategori</option>
    <SelectCategory/>
</select>

<select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 selectBrand select-tambah" name="brand" onChange={changeBrand}>
    <option className="font-semibold text-gray-400" value="brand" disabled>Brand</option>
    <SelectBrand/>
</select>

                    </div>

                    <div className="input-btm absolute w-full bottom-16">
                        <button type="submit" className="border-2 border-third rounded-full text-[20px] font-semibold py-2 hover:bg-third hover:text-primary transition-all px-8 w-full" onClick={()=>{
                            setLoading(true)
                            return onUploadForm()
                        }} disabled={loading}>{loading ? "Loading" : "Upload"}</button>
                    </div>

                    </form>

                    <div className="flex items-center justify-center w-full">
                    <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500">
                        {!image && <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                            </svg>
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Masukkan Gambar </span>atau drag and drop</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG or JPEG (MAX. 800x800px)</p>
                        </div>}
                        {image > 0 && <h1 className="text-[30px] italic opacity-60">{image} file diupload</h1> }
                        <input type="file" className="hidden" name="images[]" multiple onChange={(e)=>{
                            setFiles(e.target.files!)
                            setImage(e.target.files!.length)
                        }}/>
                    </label>
                    </div> 

                </div>

            </div>
        </div>
    )

}

export default React.memo(AddProduct)