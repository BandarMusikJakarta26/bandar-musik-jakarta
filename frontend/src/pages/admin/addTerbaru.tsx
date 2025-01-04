import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router"
import { host } from "../../../libs/config"
import { checkAdmin } from "../../action/auth.action"
import BlankPage from "../blank"

export default function AddTerbaru(){
    const [ admin, isAdmin ] = useState<boolean>(false) 
    async function adminValidation() { return await isAdmin(await checkAdmin()) }
    adminValidation()

    const [ image, setImage ] = useState<File | null>(null)
    const [ topik, setTopik ] = useState<string>('')
    const [ link, setLink ] = useState<string>('')
    const [ deskripsi, setDeskripsi ] = useState<string>('')
    const [ loading, setLoading ] = useState<boolean>(false)
    const navigate = useNavigate()

    async function submitBrand(){
        setLoading(true)
        const formData = new FormData()
        formData.append('topik', topik)
        formData.append('link', link)
        formData.append('deskripsi', deskripsi)
        formData.append('file', image!)
        const response = await axios.post(`${host}/admin/tambah/terbaru`, formData )
        setLoading(false)
        if(response.data.success) return navigate('/admin/terbaru')
    }


    if(!admin) return <BlankPage/>
    else return (
        <div className="form px-4 py-10">
            <h1 className="text-[24px] text-center font-bold tracking-tight mb-2">Tambah Terbaru</h1>
            
            <div className="input-awal flex gap-x-8">
                <input type="text" name="topik" onChange={(e)=>{ setTopik(e.target.value) }} value={topik} required className="w-full text-[16px] mb-3" placeholder="Masukkan topik"/>
                <input type="text" name="link" onChange={(e)=>{ setLink(e.target.value) }} value={link} required className="w-full text-[16px] mb-3" placeholder="Masukkan Link"/>
            </div>

            <input name="deskripsi" onChange={(e)=>{ setDeskripsi(e.target.value) }} value={deskripsi} required className="w-full text-[16px] mb-3" placeholder="Masukkan deskripsi"/>

            <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none indent-0" id="file_input" type="file" name="image" onChange={(e)=>{ setImage(e.target.files![0]) }} required/>
            
            <div className="kotab-btn flex justify-center">
                <button type="submit" onClick={submitBrand} disabled={loading} className="disabled:bg-third border-2 border-third px-8 mt-4 hover:bg-third disabled:text-primary hover:text-primary text-[14px]">Kirim</button>
            </div>
        </div>

    )
}