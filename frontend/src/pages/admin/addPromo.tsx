import { useState } from "react"
import { useNavigate } from "react-router"
// import { checkAdmin } from "../../action/auth.action"
// import BlankPage from "../blank"
import { createCategory } from "../../action/kategori.action"

export default function AddPromo(){
    // const [ admin, isAdmin ] = useState<boolean>(false) 
    // async function adminValidation() { return await isAdmin(await checkAdmin()) }
    // adminValidation()
    
    const [ gambar, setGambar ] = useState<Blob | null>(null)
    const [ image, setImage ] = useState<any | null>(null)
    const [ name, setName ] = useState<string>('')
    const [ loading, setLoading ] = useState<boolean>(false)
    const navigate = useNavigate()

    async function submitKategori(){
        try{
            setLoading(true)
            const form = new FormData()
            form.append('title', name)
            form.append('image', gambar!)
            const response = await createCategory(form)
            setLoading(false)
            if(response.data.success) return navigate('/admin/kategori')
        }catch(err: any){ console.log(err.message) }
    }

    function previewFile(file: Blob){
        const reader = new FileReader()
        reader.readAsDataURL(file!)
        reader.onloadend = ()=>{ setImage(reader.result) }
    }

    // if(!admin) return <BlankPage/>
    return (
        <div className="form px-4 pt-20">

            <div className={`${image ? 'grid grid-cols-2 justify-center items-center' : 'block'} top-section`}>
                <div className="input">
                    <h1 className="text-[24px] text-center font-bold tracking-tight mb-2">Tambah Kategori</h1>
                    <input type="text" name="nama" onChange={(e)=>{ setName(e.target.value) }} value={name} required className="w-full text-[16px] mb-3" placeholder="Masukkan nama kategori"/>
                    <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none indent-0" id="file_input" type="file" name="file" onChange={(e)=>{
                        setGambar(e.target.files![0]) 
                        previewFile(e.target.files![0])
                    }} required/>
                    <div className="kotab-btn flex justify-center">
                        <button type="submit" onClick={submitKategori} disabled={loading} className="disabled:bg-third border-2 border-third px-8 mt-4 hover:bg-third disabled:text-primary hover:text-primary text-[14px]">Kirim</button>
                    </div>
                </div>

                <div className="kotak-preview flex w-full justify-center">
                    { image && <img src={image} width={500} className=""/> }
                </div>
            </div>
           
        </div>

    )
}