import React, { useState } from "react"
import { useNavigate } from "react-router"
import axiosClient from "../../../libs/axiosConfig"

const AddProduct = function(){
    const [ image, setImage ] = useState<number>(0)
    const [ files, setFiles ] = useState<FileList | null>(null)
    const [ loading, setLoading ] = useState<boolean>(false)
    const navigate = useNavigate()

    async function onUploadForm(){
        try{
            const form = document.querySelector('.addForm') as HTMLFormElement
            const upload = new FormData(form) as any

            for(let i = 0; i < files!.length; i++){
                upload.append(`images[]`, files![i])
            }

            await axiosClient.post(`api/tambah/promo`, upload)
            return navigate('/promo')
        }catch(error:any){ console.log(error.response) }
        finally{
            setLoading(false)
        }
      
    }

    return (
        <div className="addProduct md:px-16 pt-16">
            <div className="w-full border-2 border-gray-300 rounded-3xl px-[20px] md:px-[100px] flex flex-col gap-y-10 bg-white my-10 py-8">
                <h1 className="text-[30px] text-center md:text-[48px] font-bold tracking-tight">Tambah Promo</h1>

                <div className="form flex flex-col gap-y-6 relative pb-36">

                    <form className="flex flex-col gap-y-6 addForm" onSubmit={(e)=>e.preventDefault()}>

                    <div className="input-top gap-x-12 gap-y-4 md:gap-y-0 mb-8">
                        <div className="input-group grid grid-cols-[20fr_1fr] gap-x-4">
                            <div className="nama">

                            <p className="opacity-70 italic indent-5">Judul Promo</p>
                            <input type="text" name="title" placeholder="Masukkan nama produk" className="name w-full text-[14px] md:text-[18px] tambah indent-0"/>
                            </div>
                        
                        </div>
                    </div>
                    
                    <div className="input-group -mt-8">
                        <p className="opacity-70 italic indent-5">Deskripsi</p>
                        <textarea name="description" placeholder="Masukkan deskripsi produk" className="h-[200px] indent-0 text-[14px] md:text-[18px] tambah resize-none w-full"/>
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