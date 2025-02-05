import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import { getBrands } from "../../action/brand.action"
import { getCategories } from "../../action/kategori.action"
import axiosClient from "../../../libs/axiosConfig"
import { setCurrency } from "../../action/produk.action"
import { FaPercent } from "react-icons/fa"
import { AxiosResponse } from "axios"

export default function UpdateProduct(){
    const [ image, setImage ] = useState<number>(0)
    const { url } = useParams()

    const [ product, setProduct ] = useState<any>(null)
    const [ brands, setBrand ] = useState<any[]>([])
    const [ urlBaru, setUrl ] = useState<string>('')
    const [ nameProduct, setNameProduct ] = useState<string>('')
    const [ hargaOnline, setHargaOnline ] = useState<string>('Rp.')
    const [ hargaOffline, setHargaOffline ] = useState<string>('Rp.')
    const [ hargaPromo, setHargaPromo ] = useState<string>('Rp.')
    const [ hargaPrice, setHargaPrice ] = useState<string>('Rp.')
    const [ hargaDiskon, setDiskon ] = useState<string>('Rp.')
    const [ deskripsi, setDeskripsi ] = useState<string>('')
    // const [ diskon, setDiskon ] = useState<string>('')
    const [ potongan, setPotongan ] = useState<any>(0)
    const [ stock, setStock ] = useState<any>(0)
    const [ categories, setCategories ] = useState<any[]>([])
    const [ files, setFiles ] = useState<FileList | null>(null)
    // const [ video, setVideo ] = useState<File | null>(null)
    const [ checkCategory, getCategory ] = useState<any>(null)
    const [ checkBrand, getBrand ] = useState<any>(null)

    const [ priceKosong, setPriceKosong ] = useState<boolean>(false)
    const [ onlineKosong, setOnlineKosong ] = useState<boolean>(false)
    const [ offlineKosong, setOfflineKosong ] = useState<boolean>(false)
    const [ promoKosong, setPromoKosong ] = useState<boolean>(false)

    const [ coret, setCoret ] = useState<boolean>(false)
    const [ coretPrice, setCoretPrice ] = useState<boolean>(false)
    const navigate = useNavigate()

    // console.log(video)
    console.log(nameProduct)
    console.log(urlBaru)
    async function getDataBrands(){ return await getBrands(setBrand) }
    async function getDataCategories(){ return await getCategories(setCategories) }

    function SelectBrand(){ return brands.map((brand, index)=><option value={brand.name} key={index} selected={ brand.name === checkBrand ? true : false }>{brand.name}</option> )}

    function SelectCategory(){ return categories.map((category, index)=><option value={category.title} key={index} selected={ category.title === checkCategory ? true : false } >{category.title}</option> )}

    async function getProductByUrl(setProduct: React.SetStateAction<any[] | any>, url: string){
        const response = await axiosClient.get(`api/produk/url/${url}`) as AxiosResponse

        return setProduct(response.data.produk)
    }

    console.log(files)

    useEffect(()=>{
        getDataBrands()
        getDataCategories()
        getProductByUrl(setProduct, url!)
    }, [])
    
    async function onUploadForm(){
        try{
            const upload = new FormData(document.querySelector('form')!) as any
            
            if(upload.get('newDescription') !== ""){
                upload.delete('description')
                upload.append('description', deskripsi)
            }
            if(upload.get('newPricelist') && upload.get('newPricelist')!.split('Rp.')[1]){
                upload.delete('pricelist')
                if(coretPrice){
                    let pricelist = hargaPrice
                    pricelist = `${pricelist} true`
                    upload.append('pricelist', pricelist)
                }else upload.append('pricelist', hargaPrice)
            }else if((!upload.get('newPricelist') || upload.get('newPricelist') == "" || upload.get('newPricelist') == "Rp.") && priceKosong){
                upload.delete('pricelist')
                upload.append('pricelist', '')
            }else if((!upload.get('newPricelist') || upload.get('newPricelist') == "" || upload.get('newPricelist') == "Rp.") && !priceKosong){
                upload.delete('pricelist')
                upload.append('pricelist', product.pricelist ? product.pricelist : '')
            }

            if(upload.get('newOnlinePrice') && upload.get('newOnlinePrice')!.split('Rp.')[1]){
                upload.delete('onlinePrice')
                upload.append('onlinePrice', hargaOnline)
            }else if((!upload.get('newOnlinePrice') || upload.get('newOnlinePrice') == "" || upload.get('newOnlinePrice') == "Rp.") && onlineKosong){
                upload.delete('onlinePrice')
                upload.append('onlinePrice', '')
            }else if((!upload.get('newOnlinePrice') || upload.get('newOnlinePrice') == "" || upload.get('newOnlinePrice') == "Rp.") && !onlineKosong){
                upload.delete('onlinePrice')
                upload.append('onlinePrice', product.onlinePrice ? product.onlinePrice : '')
            }

            // Offline Price
            if(upload.get('newOfflinePrice') && upload.get('newOfflinePrice')!.split('Rp.')[1]){
                upload.delete('offlinePrice')
                if(coret){
                    let offline = hargaOffline
                    offline = `${offline} true`
                    upload.append('offlinePrice', offline)
                }else upload.append('offlinePrice', hargaOffline)
            }else if((!upload.get('newOfflinePrice') || upload.get('newOfflinePrice') == "" || upload.get('newOfflinePrice') == "Rp.") && offlineKosong){
                upload.delete('offlinePrice')
                upload.append('offlinePrice', '')
            }else if((!upload.get('newOfflinePrice') || upload.get('newOfflinePrice') == "" || upload.get('newOfflinePrice') == "Rp.") && !offlineKosong){
                upload.delete('offlinePrice')
                upload.append('offlinePrice', product.offlinePrice ? product.offlinePrice : '')
            }

            // Promo
            if(upload.get('newPromo') && upload.get('newPromo')!.split('Rp.')[1]){
                upload.delete('promo')
                upload.append('promo', hargaPromo)
            }else if((!upload.get('newPromo') || upload.get('newPromo') == "" || upload.get('newPromo') == "Rp.") && promoKosong){
                upload.delete('promo')
                upload.append('promo', '')
            }
            else if((!upload.get('newPromo') || upload.get('newPromo') == "" || upload.get('newPromo') == "Rp.") && !promoKosong){
                upload.delete('promo')
                upload.append('promo', product.promo ? product.promo : '')
            }

            // const promo = upload.get('promo') as string
            // if(promo.trim() == "" || promo.trim() == "Rp."){ upload.append('promo', '') }
        
            // if(files){
            //     for(let i = 0; i < files!.length; i++){
            //         upload.append(`images[]`, files![i])
            //     }
            // }

            await axiosClient.post(`api/update/produk/${product.url}`, upload)
            return navigate('/admin/produk')
        }catch(error:any){ console.log(error.response.data) }
        
    }
    
    // function setHargaProduk(hargaText:string){
        //     setHarga(hargaText)
        //     let hargaAsli = hargaText.split('Rp.')[1] as any
        //     if(hargaAsli !== ''){
            //         hargaAsli = hargaAsli.split('.').join('')
            //         const potongan = (hargaAsli*20)/100
            //         let hargaDiskon = hargaAsli - potongan as any
            //         const totalDiskon = hargaDiskon.toString().split('')
            //         if(totalDiskon.length == 4){
                //             totalDiskon.splice(1,0,'.')
                //         }
                //         else if(totalDiskon.length == 5){
                    //             totalDiskon.splice(2,0,'.')
                    //         }
                    //         else if(totalDiskon.length == 6){
                        //             totalDiskon.splice(3,0,'.')
                        //         }
                        //         else if(totalDiskon.length == 7){
                            //             totalDiskon.splice(1,0,'.')
                            //             totalDiskon.splice(5,0,'.')
                            //         }
    //         else if(totalDiskon.length == 8){
        //             totalDiskon.splice(2,0,'.')
        //             totalDiskon.splice(6,0,'.')
        //         }
        //         setDiskon(`Rp.${totalDiskon.join("")}`)
    //     }
    // }

    function changeCategory(e:any){ getCategory(e.target.value) }
    function changeBrand(e:any){ getBrand(e.target.value) }
    function setHargaDiskon(harga: string, potonganHarga?: string){
        const hargaSatuan = parseInt(harga.split('Rp.')[1]) as number
        let diskon
        const potonganDiskon = potonganHarga || potongan
        if(!potonganDiskon || parseInt(potonganDiskon) == 0) diskon = hargaSatuan
        else {
            const potong = (hargaSatuan*parseInt(potonganDiskon))/100
            diskon = hargaSatuan - potong as any
        }
        setDiskon(`Rp.${diskon}`)
    }
    
    function generateUrlValue(e:any){
        let formValue= e.target.value as any
        formValue = formValue.split(" ").join("-").toLowerCase()
        formValue = formValue.split("")
        formValue = formValue.filter((value:string)=>value!=="/").join("")
        const input = document.querySelector('.url')! as any
        input.value = formValue
        return setUrl(formValue)
    }
    
    // if(!admin) return <BlankPage/>
    if(product) return (
        <div className="addProduct md:px-16 pt-16">
                    <div className="w-full shadow-xl px-[20px] md:px-[50px] flex flex-col gap-y-2">
                        <h1 className="text-[30px] text-center md:text-left md:text-[48px] font-bold tracking-tight ">Update Produk</h1>
        
                        <div className="form flex flex-col gap-y-6 relative pb-36">
        
                            <form className="flex flex-col gap-y-6" onSubmit={(e)=>e.preventDefault()}>
        
                            <div className="input-top grid md:grid-cols-[3fr_1fr_1fr_1fr] gap-x-12 gap-y-4 md:gap-y-0 mb-8">
                                <div className="input-group">

                                    <p className="opacity-70 italic indent-5">Nama Produk</p>
                                    <input type="text" name="name" placeholder="Masukkan nama produk" className="name w-full text-[14px] md:text-[18px]" onChange={(e: any)=>{
                                        setNameProduct(e.target.value)
                                        generateUrlValue(e)
                                    }} defaultValue={product.name}/>

                                    <input type="text" name="url" placeholder="Masukkan link url" defaultValue={product.url} readOnly className="w-full text-center italic text-[12px] md:text-[13px] opacity-70 indent-0 -mt-1 url"/>

                                </div>

                                {/* Pricelist */}
                                <div className="input-group">
                                    <div className="price-title flex gap-x-2">
                                        <p className="opacity-70 italic indent-5">Pricelist</p>
                                        <input type="checkbox" name="priceKosong" onClick={()=>{
                                            if(priceKosong) return setPriceKosong(false)
                                            else return setPriceKosong(true)
                                        }}/>
                                        <input type="checkbox" name="coretPrice" onClick={()=>{
                                            if(coretPrice) return setCoretPrice(false)
                                            else return setCoretPrice(true)
                                        }} checked={coretPrice ? true : false}/>

                                    </div>

                                    <input type="text" name="newPricelist" placeholder="Pricelist" onChange={(e)=>{
                                        setHargaPrice(e.target.value)
                                        setHargaDiskon(e.target.value)
                                    }} value={hargaPrice} className={`w-full text-[14px] md:text-[18px] ${coretPrice ? 'line-through' : ''}`}/>


                                    {product.pricelist && <input type="text" name="pricelist" value={setCurrency(product.pricelist.split(' ')[1] ? product.pricelist.split(' ')[0] : product.pricelist )} readOnly className={`w-full text-center italic text-[12px] md:text-[13px] opacity-70 indent-0 -mt-1 ${product.pricelist.split(' ')[1] ? 'line-through' : ''}`}/>}

                                    <p className="opacity-60 mt-2 text-[14px]">{setCurrency(hargaPrice)}</p>

                                </div>


                                <div className="input-group">
                                    <div className="offline-text flex gap-x-2">
                                        
                                        <p className="opacity-70 italic indent-5">Diskon</p>
                                        <input type="checkbox" name="coret" onClick={()=>{
                                            if(coret) return setCoret(false)
                                                else return setCoret(true)
                                        }}/>
        
                                    </div>
        
                                {/* Diskon */}
                                    <input type="text" name="hargaDiskon" placeholder="Harga Diskon" value={hargaDiskon} className={`w-full text-[14px] md:text-[18px] ${coret ? 'line-through' : ''}`} disabled/>
                                    <p className="opacity-60 mt-2 text-[14px]">{setCurrency(hargaDiskon)}</p>

                                </div>
        
                                <div className="extra grid grid-cols-2 gap-x-10">
        
                                {/* Potongan */}
                                <div className="input-group relative">
                                    <p className="opacity-70 italic">Potongan</p>
                                    <input type="text" name="potongan" placeholder="0" onChange={(e)=>{
                                        setPotongan(e.target.value)
                                        if(hargaPrice.split('Rp.')[1]) setHargaDiskon(hargaPrice, e.target.value)
                                    }} value={potongan} className="w-full text-[14px] md:text-[18px] indent-0"/>
                                </div>
                                

                                {/* Stock */}
                                <div className="input-group">
                                    <p className="opacity-70 italic">Stock</p>
                                    <input type="number" name="stock" placeholder="Stock" onChange={(e)=>{setStock(e.target.value)}} defaultValue={product.stock ? stock+product.stock : stock} className="w-full text-[14px] md:text-[18px] indent-0"/>
                                </div>
                                    <FaPercent size={13} className="text-third absolute top-[41px] right-[138px]"/>
                                </div>
        
                            {/* <div className="diskon flex">
                                <p className="font-bold text-[14px] border-2 border-third pt-[10px] px-2">20%</p>
                                <input type="text" name="discount" placeholder="Diskon" className="bg-white indent-0" disabled value={diskon}/>
                            </div> */}
                            </div>
                            
                            <div className="input-top grid md:grid-cols-[3fr_1fr_1fr_1fr] gap-x-12 md:gap-y-0 -mt-10">
                                <div className="input-group"></div>
        
                                {/* Harga Online */}
                                <div className="input-group">
                                    <p className="opacity-70 italic indent-5">Harga Online</p>
                                    <input type="checkbox" name="onlineKosong" onClick={()=>{
                                            if(onlineKosong) return setOnlineKosong(false)
                                                else return setOnlineKosong(true)
                                    }}/>

                                    <input type="text" name="newOnlinePrice" placeholder="Harga Online" onChange={(e)=>{setHargaOnline(e.target.value)}} value={hargaOnline} className="w-full text-[14px] md:text-[18px]"/>

                                    {product.onlinePrice && <input type="text" name="onlinePrice" value={setCurrency(product.onlinePrice)} readOnly className="w-full text-center italic text-[12px] md:text-[13px] opacity-70 indent-0 -mt-1"/>}

                                    <p className="opacity-40 mt-2 text-[14px]">{setCurrency(hargaOnline)}</p>
                                </div>

                                {/* Harga Offline */}
                                <div className="input-group">
                                    <div className="offline-text flex gap-x-2">
                                        
                                        <p className="opacity-70 italic indent-5">Harga Offline</p>
                                        <input type="checkbox" name="offlineKosong" onClick={()=>{
                                            if(offlineKosong) return setOfflineKosong(false)
                                                else return setOfflineKosong(true)
                                        }}/>

                                        <input type="checkbox" name="coret" className="coret" onClick={()=>{
                                            if(coret) return setCoret(false)
                                            else return setCoret(true)
                                        }} checked={coret ? true : false}/>
        
                                    </div>
                                    
        
                                    <input type="text" name="newOfflinePrice" placeholder="Harga Offline" onChange={(e)=>{ setHargaOffline(e.target.value)}} value={hargaOffline} className={`w-full text-[14px] md:text-[18px] ${coret ? 'line-through' : ''}`}/>

                                    {product.offlinePrice && <input type="text" name="offlinePrice" value={setCurrency(product.offlinePrice.split(' ')[1] ? product.offlinePrice.split(' ')[0] : product.offlinePrice )} readOnly className={`w-full text-center italic text-[12px] md:text-[13px] opacity-70 indent-0 -mt-1 ${product.offlinePrice.split(' ')[1] ? 'line-through' : ''}`}/>}

                                    <p className="opacity-40 mt-2 text-[14px]">{setCurrency(hargaOffline)}</p>
        
                                </div>

                                {/* Harga Promo */}
                                <div className="input-group">
                                    <p className="opacity-70 italic indent-5">Walk In Price</p>
                                    <input type="checkbox" name="promoKosong" onClick={()=>{
                                            if(promoKosong) return setPromoKosong(false)
                                                else return setPromoKosong(true)
                                    }}/>

                                    <input type="text" name="newPromo" placeholder="Harga Promo" onChange={(e)=>{setHargaPromo(e.target.value)}} value={hargaPromo} className="w-full text-[14px] md:text-[18px]"/>

                                    {product.promo && <input type="text" name="promo" value={setCurrency(product.promo)} readOnly className="w-full text-center italic text-[12px] md:text-[13px] opacity-70 indent-0 -mt-1"/>}

                                    <p className="opacity-40 mt-2 text-[14px]">{setCurrency(hargaPromo)}</p>
                                </div>
        
                            {/* <div className="diskon flex">
                                <p className="font-bold text-[14px] border-2 border-third pt-[10px] px-2">20%</p>
                                <input type="text" name="discount" placeholder="Diskon" className="bg-white indent-0" disabled value={diskon}/>
                            </div> */}
                            </div>
        
                            {/* Deskripsi */}
                            <textarea name="newDescription" placeholder="Masukkan deskripsi produk" className="h-[200px] indent-0 text-[14px] md:text-[18px]" value={deskripsi} onChange={(e:any)=>setDeskripsi(e.target.value)}/>

                            {product.description && <textarea name="description" value={product.description} readOnly className="w-full text-justify italic text-[14px] md:text-[13px] opacity-70 indent-0 -mt-1 h-[300px]"/>}
        
                            <div className="select grid grid-cols-2 gap-x-20">
        
        <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 selectKategori" name="kategori" onChange={changeCategory}>
            <option className="font-semibold text-gray-400" disabled>Kategori</option>
            { !checkCategory ? <option selected className="bg-gray-200">{product.kategoriId}</option> : false }
            <SelectCategory/>
        </select>
        
        <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 selectBrand" name="brand" onChange={changeBrand}>
            <option className="font-semibold text-gray-400" value="brand" disabled>Brand</option>
            { !checkBrand ? <option selected className="bg-gray-200">{product.brandId}</option> : false }
            <SelectBrand/>
        </select>
        
                            </div>
        
                            <div className="input-btm absolute w-full bottom-16">
                                <button type="submit" className="border-2 border-third rounded-full text-[20px] font-semibold py-2 hover:bg-third hover:text-primary transition-all px-8 w-full md:w-auto" onClick={onUploadForm}>Upload</button>
                            </div>
        
                            </form>
        
                            <div className="flex items-center justify-center w-full">
                            <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500">
                                {!image && <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                                    </svg>
                                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                </div>}
                                {image > 0 && <h1 className="text-[30px] italic opacity-60">{image} file diupload</h1> }
                                <input type="file" className="hidden" name="images[]" multiple onChange={(e)=>{
                                    setFiles(e.target.files!)
                                    setImage(e.target.files!.length)
                                }}/>
                            </label>
                            </div> 
        
                                {/* <input type="file" name="video" onChange={(e)=>setVideo(e.target.files![0])}/>
                                <label>Upload</label>
                                <progress value={0} max={100}></progress> */}
                        </div>
        
                    </div>
        </div>
    )

}