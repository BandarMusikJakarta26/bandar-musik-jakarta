import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router"
import { headers, host } from "../../../libs/config"
import { checkAdmin } from "../../action/auth.action"
import BlankPage from "../blank"

export default function AddBrand(){
    const [ admin, isAdmin ] = useState<boolean>(false) 
    async function adminValidation() { return await isAdmin(await checkAdmin()) }
    adminValidation()

    const [ brand, setBrand ] = useState<File | null>(null)
    const [ name, setName ] = useState<string>('')
    const [ loading, setLoading ] = useState<boolean>(false)
    const navigate = useNavigate()

    async function submitBrand(){
        setLoading(true)
        const form = new FormData()
        form.append('name', name)
        form.append('file', brand!)
        const response = await axios.post(`${host}/admin/tambah/brand`, form, headers)
        setLoading(false)
        if(response.data.success) return navigate('/admin/brand')
    }

    if(!admin) return <BlankPage/>
    else return (
        <div className="form px-4 py-10">
            <h1 className="text-[24px] text-center font-bold tracking-tight mb-2">Tambah Brand</h1>
            
            <input type="text" name="nama" onChange={(e)=>{ setName(e.target.value) }} value={name} required className="w-full text-[16px] mb-3" placeholder="Masukkan nama brand"/>
            <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none indent-0" id="file_input" type="file" name="brand" onChange={(e)=>{ setBrand(e.target.files![0]) }} required/>
            
            <div className="kotab-btn flex justify-center">
                <button type="submit" onClick={submitBrand} disabled={loading} className="disabled:bg-third border-2 border-third px-8 mt-4 hover:bg-third disabled:text-primary hover:text-primary text-[14px]">Kirim</button>
            </div>
        </div>

    )
}