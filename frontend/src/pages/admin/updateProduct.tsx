import React, { useEffect, useState } from "react"
import { useLocation, useNavigate, useParams } from "react-router"
import { getBrands } from "../../action/brand.action"
import { getCategories } from "../../action/kategori.action"
import { FaPercent } from "react-icons/fa";
import { getProductByUrl, setCurrency } from "../../action/produk.action"
import LoadingPage from "../../components/LoadingPage"
import axiosClient from "../../../libs/axiosConfig";
import axios from "axios";

const UpdateProduct = function(){
   

    const apiKey= "45c165ab4a045f50b07dfac796b661d704f06269"
    const { url } = useParams()

    // const [ image, setImage ] = useState<number>(0)
    const [ brands, setBrand ] = useState<any[]>([])
    const [ urlName, setUrl ] = useState<string>('')
    const [ hargaOnline, setHargaOnline ] = useState<string>('')
    const [ hargaOffline, setHargaOffline ] = useState<string>('')
    const [ hargaPromo, setHargaPromo ] = useState<string>('')
    const [ hargaPrice, setHargaPrice ] = useState<string>('')
    const [ hargaDiskon, setDiskon ] = useState<string>('')
    const [ product, setProduct ] = useState<any>(null)

    const [ potongan, setPotongan ] = useState<any>(0)
    const [ stock, setStock ] = useState<any>(0)
    const [ categories, setCategories ] = useState<any[]>([])
    // const [ files, setFiles ] = useState<FileList | null>(null)
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

    console.log(panjang)
    console.log(lebar)
    console.log(tinggi)
    console.log(urlName)

    const navigate = useNavigate()
    const location = useLocation()

    const promos = ['Walk-in', 'Akhir Tahun', 'Cuci Gudang', 'Java Jazz']

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
        getProductByUrl(setProduct, url!)
    }, [])

    async function onUploadForm(){
        try{
            const el = document.querySelector('.formUpdate')! as any
            const upload = new FormData(el) as any

            if(upload.get('offlinePrice') == 0){
                upload.delete('offlinePrice')
            }

            if(hargaOffline && hargaOffline.includes('.')){
                const nominalOffline = hargaOffline.split('').filter((curr: any)=>curr!=='.')
                upload.delete('offlinePrice')
                upload.append('offlinePrice', nominalOffline.join(''))
            }
            
            if(product.offlinePrice && !hargaOffline){
                upload.delete('offlinePrice')
                upload.append('offlinePrice', product.offlinePrice)
            }

            console.log('submit', upload.get('offlinePrice'))
            console.log('display', hargaOffline)

            if(upload.get('pajak') == "on"){
                upload.delete('pajak')
                upload.append('pajak', 1)
            }else{
                upload.delete('pajak')
                upload.append('pajak', 0)
            }
            if(upload.get('kirim') == "on"){
                upload.delete('kirim')
                upload.append('kirim', 1)
            }else{
                upload.delete('kirim')
                upload.append('kirim', 0)
            }
            if(upload.get('pasang') == "on"){
                upload.delete('pasang')
                upload.append('pasang', 1)
            }else{
                upload.delete('pasang')
                upload.append('pasang', 0)
            }

            if((hargaPromo == "" && product.promo) && !upload.get('namaPromo')){ upload.append('namaPromo', 'Promo') }
            if((hargaPromo == "" && !product.promo) && upload.get('namaPromo')){ upload.delete('namaPromo') }

            if(upload.get('pricelist') && coretPrice){
                const pricelist = upload.get('pricelist')
                upload.delete('pricelist')
                upload.append('pricelist', `${pricelist} true`)
            }
            if(upload.get('offlinePrice') && coret){
                const offline = upload.get('offlinePrice')
                upload.delete('offlinePrice')
                upload.append('offlinePrice', `${offline} true`)
            }
            
            if(upload.get('stock') == "" || !upload.get('stock')){
                if(upload.get('preorder')){
                    upload.delete('stock')
                    upload.append('stock', "-1")
                }
                else{
                    upload.delete('stock')
                    upload.append('stock', "0")
                }
            }

            if(upload.get('offlinePrice') && parseInt(upload.get('offlinePrice')) > 0){
                const response = await axios.get(`https://api.getgeoapi.com/v2/currency/convert?api_key=${apiKey}&from=IDR&to=USD&amount=${upload.get('offlinePrice')}&format=json`)
                const offline = upload.get('offlinePrice')
                let usd = response.data.rates.USD.rate_for_amount as string
                usd = Number.parseFloat(usd).toFixed(2)
                upload.delete('offlinePrice')
                upload.append('offlinePrice', `${offline} ${usd}`)
                // upload.append('offlinePrice', `${offline}`)
               
            }else if(upload.get('offlinePrice') && hargaOffline == ""){
                const response = await axios.get(`https://api.getgeoapi.com/v2/currency/convert?api_key=${apiKey}&from=IDR&to=USD&amount=${product.offlinePrice.split(' ')[1] ? product.offlinePrice.split(' ')[0] : product.offlinePrice }&format=json`)
                let usd = response.data.rates.USD.rate_for_amount as string
                usd = Number.parseFloat(usd).toFixed(2)
                upload.delete('offlinePrice')
                upload.append('offlinePrice', `${product.offlinePrice} ${usd}`)
            }

            await axiosClient.post(`api/update/produk/${url!}`, upload)
            return navigate(location.state.previousUrl)
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
        const disc = document.querySelector('.hargadiskon')! as any
        disc.value = diskon
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
        const inputUrl = document.querySelector('.url')! as any
        inputUrl.value = formValue
        return setUrl(formValue)
    }

    if(!product) return <LoadingPage/>
    else {
        return (
            <div className="addProduct md:px-16 pt-16">
                <div className="w-full border-2 border-gray-300 rounded-3xl px-[20px] md:px-[100px] flex flex-col gap-y-10 bg-white my-10 py-8">
                    <h1 className="text-[30px] text-center md:text-[48px] font-bold tracking-tight">Ubah Produk</h1>
    
                    <div className="form flex flex-col gap-y-6 relative pb-36">
    
                        <form className="flex flex-col gap-y-6 formUpdate" onSubmit={(e)=>e.preventDefault()}>
    
                        <div className="input-top gap-x-12 gap-y-4 md:gap-y-0 mb-8">
                            <div className="input-group grid grid-cols-[6fr_1fr] gap-x-10">
                                <div className="nama">
    
                                <p className="opacity-70 italic indent-5">Nama Produk</p>

                                <input type="text" name="name" placeholder="Masukkan nama produk" className="name w-full text-[14px] md:text-[18px] tambah indent-0" onChange={generateUrlValue} defaultValue={product && product.name}/>
                                <input type="text" name="url" placeholder="Masukkan link url" defaultValue={product && product.url} readOnly className="w-full text-center italic text-[12px] md:text-[13px] opacity-80 indent-0 mt-1 bg-white url"/>
    
                                </div>
                                <div className="pajak flex gap-x-2 items-center relative -top-3">
                                    <p className="opacity-70 italic indent-5">Pajak</p>   
                                    <input type="checkbox" name="pajak" className="w-5 h-5 rounded-xl" defaultChecked={product.pajak == 1 ? true : false}/>
                                </div>
    
                            </div>
                        </div>
                        
                        <div className="input-group -mt-8">
                            <p className="opacity-70 italic indent-5">Deskripsi Produk</p>
                            <textarea name="description" placeholder="Masukkan deskripsi produk" className="h-[200px] indent-0 text-[14px] md:text-[18px] tambah resize-none w-full" defaultValue={product && product.description}/>
                        </div>
    
                        {/* Ukuran */}
                        <div className="dimensiheader flex gap-x-3 items-center mt-10">
                            <h1 className="text-[22px] font-semibold tracking-tight">Berat dan Ukuran</h1>
                        </div>
    
                        <div className="dimensi grid grid-cols-4 gap-x-10 -mt-3 mb-2">
    
                        <div className="berat relative">
                            <p className="opacity-70 italic indent-5">Berat</p>
                            <input type="text" name="berat" placeholder="Berat" className="name w-full text-[14px] md:text-[18px] tambah indent-0" defaultValue={product && product.berat}/>
                            <p className="opacity-60 absolute top-[37px] right-6">gram</p>
                        </div>
                        
                        <div className="input-group relative">
                                <p className="opacity-70 italic">Panjang</p>
                                <input type="text" name="panjang" placeholder="Panjang" onChange={(e)=>{
                                    setPanjang(e.target.value)
                                }} defaultValue={product && product.panjang} className="w-full text-[14px] md:text-[18px] indent-0 tambah"/>
                                <p className="opacity-60 absolute top-[37px] right-6">cm</p>
                        </div>
                        <div className="input-group relative">
                                <p className="opacity-70 italic">Lebar</p>
                                <input type="text" name="lebar" placeholder="Lebar" onChange={(e)=>{
                                    setLebar(e.target.value)
                                }} defaultValue={product && product.lebar} className="w-full text-[14px] md:text-[18px] indent-0 tambah"/>
                                <p className="opacity-60 absolute top-[37px] right-6">cm</p>
                        </div>
                        <div className="input-group relative">
                                <p className="opacity-70 italic">Tinggi</p>
                                <input type="text" name="tinggi" placeholder="Tinggi" onChange={(e)=>{
                                    setTinggi(e.target.value)
                                }} defaultValue={product && product.tinggi} className="w-full text-[14px] md:text-[18px] indent-0 tambah"/>
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
                                                if(coretPrice) setCoretPrice(false)
                                                else setCoretPrice(true)
                                            }} checked={coretPrice ? true : false}/>
                         
                                    </div>
                                </div>
                                <input type="text" name="pricelist" placeholder="0" onChange={(e)=>{
                                    setHargaPrice(e.target.value)
                                    setHargaDiskon(e.target.value)
                                }} defaultValue={product && product.pricelist ? product.pricelist.split(' ')[1] ? product.pricelist.split(' ')[0] : product.pricelist : hargaPrice } className={`w-full text-[14px] md:text-[18px] tambah indent-[30px] ${coretPrice ? 'line-through' : ''}`}/>
                                <p className={`opacity-60 mt-2 text-[14px] absolute top-[30px] right-5 ${coretPrice ? 'line-through' : ''}`}>{product && product.pricelist && hargaPrice == "" ? product.pricelist.split(' ')[1] ? setCurrency(product.pricelist.split(' ')[0]) : setCurrency(product.pricelist) : setCurrency(hargaPrice)}</p>
                                <p className="py-1 px-2 bg-gray-200 rounded-md absolute top-[32px] left-[8px]">Rp</p>
                            </div>
    
    
    <div className="input-group relative grid grid-cols-[4fr_1fr] gap-x-8">
    
        {/* Diskon */}
        <div className="diskon relative">
    
        <div className="offline-text flex gap-x-2">
            <p className="opacity-70 italic indent-5">Diskon</p>
        </div>
    
        <input type="text" name="hargaDiskon" placeholder="0" defaultValue={ product.pricelist && hargaDiskon == "" ? product.pricelist.split(' ')[0] : hargaDiskon } className={`w-full text-[14px] md:text-[18px] tambah indent-[30px] hargadiskon`} disabled/>
        <p className="opacity-60 mt-2 text-[14px] absolute top-[30px] right-5">{product && product.pricelist && hargaDiskon == "" ? product.pricelist.split(' ')[1] ? setCurrency(product.pricelist.split(' ')[0]) : setCurrency(product.pricelist) : setCurrency(hargaDiskon)}</p>
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
            if(hargaPrice || product.pricelist) setHargaDiskon(hargaPrice !== "" ? hargaPrice : product.pricelist.split(' ')[0], e.target.value)
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
                                <input type="text" name="onlinePrice" placeholder="0" onChange={(e)=>{setHargaOnline(e.target.value)}} defaultValue={product && product.onlinePrice} className="w-full text-[14px] md:text-[18px] tambah indent-[30px]"/>
                                <p className="opacity-60 mt-2 text-[14px] absolute top-[30px] right-5">{product && product.onlinePrice && hargaOnline == "" ? product.onlinePrice.split(' ')[1] ? setCurrency(product.onlinePrice.split(' ')[0]) : setCurrency(product.onlinePrice) : setCurrency(hargaOnline)}</p>
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
                                        }} checked={coret ? true : false}/>

                                    </div>
                                </div>

                                <input type="text" name="offlinePrice" placeholder={product.offlinePrice ? product.offlinePrice.split(' ')[0]
                                        .replace(/\D/g, "")
                                        .replace(/\B(?=(\d{3})+(?!\d))/g, ".") : 0}
                                        
                                    onChange={(e)=>{ 
                                    setHargaOffline(e.target.value
                                        .replace(/\D/g, "")
                                        .replace(/\B(?=(\d{3})+(?!\d))/g, "."))
                                }} 
                               
                                value={hargaOffline && hargaOffline}

                                defaultValue={product.offlinePrice ? product.offlinePrice.split(' ')[1] ? product.offlinePrice.split(' ')[0] : product.offlinePrice : hargaOffline }
                                
                                className={`w-full text-[14px] md:text-[18px] tambah indent-[30px] ${coret ? 'line-through' : ''}`}/>

                                <p className="py-1 px-2 bg-gray-200 rounded-md absolute top-[32px] left-[8px]">Rp</p>

                            </div>
                        </div>
    
                        <div className="promoheader flex gap-x-3 items-center mt-10">
                            <h1 className="text-[22px] font-semibold tracking-tight">Promo</h1>
                            <input type="checkbox" className="w-5 h-5" onClick={()=>{
                                if(usePromo) return activatePromo(false)
                                else return activatePromo(true)
                            }} checked={usePromo || product && product.promo ? true : false}/>
                        </div>
    
                        {/* Promo */}
                        <div className={`promo ${usePromo || product && product.promo ? 'block' : 'hidden'} grid grid-cols-3 gap-x-10 -mt-3`}>
    
                            <div className="input-group">
                                <p className="opacity-70 italic indent-5">Nama Promo</p>
                                <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 select-tambah" name="namaPromo" onChange={changePromo}>
                                    <option className="font-semibold text-gray-400" disabled selected>Promo</option>
                                    {product && product.namaPromo && !checkPromo ? <option value={product.namaPromo} selected>{product.namaPromo}</option> : false}
                                    <SelectPromo/>
                                </select>
                            </div>
                            <div className="input-group relative">
                                <p className="opacity-70 italic indent-5">{checkPromo ? checkPromo : 'Promo' }</p>
                                <input type="text" name="promo" placeholder="0" onChange={(e)=>{setHargaPromo(e.target.value)}} 
                                defaultValue={product && product.promo && hargaPromo == "" ? product.promo : hargaPromo }
                                className="w-full text-[14px] md:text-[18px] tambah indent-[30px]"/>
                                <p className="opacity-40 mt-2 text-[14px] absolute top-[30px] right-5">{product && product.promo && hargaPromo == "" ? setCurrency(product.promo) : setCurrency(hargaPromo)}</p>
                                <p className="py-1 px-2 bg-gray-200 rounded-md absolute top-[32px] left-[8px]">Rp</p>
                            </div>
                            <div className="input-group">
                            <div className="head-stock flex justify-between">
                                <p className="opacity-70 italic">Stock</p>
                                <div className="po flex items-center gap-x-1">
                                    <input type="checkbox" name="preorder" defaultChecked={product.stock == -1 ? true : false}/>
                                    <p className="text-[12px] italic text-gray-500">Pre-Order</p>
                                </div>
                            </div>
                                <input type="number" name="stock" placeholder="Stock" onChange={(e)=>{
                                    if(parseInt(e.target.value) < 0) setStock(0)
                                    else setStock(e.target.value)
                                }} defaultValue={product && product.stock >= 0 ? product.stock : stock} className="w-full text-[14px] md:text-[18px] indent-0 tambah"/>
                            </div>
                        </div>
    
                        {/* Category dan Brand */}
                        <div className="select grid grid-cols-2 gap-x-20 mt-10">
    
    <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 selectKategori select-tambah" name="kategori" onChange={changeCategory}>
        <option className="font-semibold text-gray-400" disabled>Kategori</option>
        {product && product.kategoriId && !checkCategory && <option value={product.kategoriId}>{product.kategoriId}</option> }
        <SelectCategory/>
    </select>
    
    <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 selectBrand select-tambah" name="brand" onChange={changeBrand}>
        <option className="font-semibold text-gray-400" value="brand" disabled>Brand</option>
        {product && product.brandId && !checkBrand && <option value={product.brandId}>{product.brandId}</option> }
        <SelectBrand/>
    </select>
    
                        </div>

                   {/* JASA */}
                   <div className="info-tambahan flex justify-between my-10">

                  
<h1 className="text-[22px] font-semibold tracking-tight -mt-[6px]">Jasa</h1>

<div className="kotak-jasa flex gap-x-8">

<div className="pajak flex gap-x-2 items-center relative">
        <p className="opacity-70 italic indent-5">Gratis Pengiriman</p>   
        <input type="checkbox" name="kirim" className="w-5 h-5 rounded-xl" defaultChecked={product.kirim == 1 ? true : false}/>
</div>
<div className="pajak flex gap-x-2 items-center">
        <p className="opacity-70 italic indent-5">Gratis Pemasangan</p>   
        <input type="checkbox" name="pasang" className="w-5 h-5 rounded-xl" defaultChecked={product.pasang == 1 ? true : false}/>
</div>

</div>

</div>

    
                        <div className="input-btm absolute w-full bottom-16">
                            <button type="submit" className="border-2 border-third rounded-full text-[20px] font-semibold py-2 hover:bg-third hover:text-primary transition-all px-8 w-full" onClick={()=>{
                                setLoading(true)
                                return onUploadForm()
                            }} disabled={loading}>{loading ? "Loading" : "Save"}</button>
                        </div>

                        </form>

    
                        {/* <div className="flex items-center justify-center w-full">
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
                        </div>  */}
    
                    </div>
    
                </div>
            </div>
        )
    }

}

export default React.memo(UpdateProduct)