// import { useNavigate } from "react-router"
import axiosClient from "../../../libs/axiosConfig"

export default function UpdateProductCategory(){
    // const navigate = useNavigate()

    async function onSubmittedForm(e: any){
        e.preventDefault()
        const upload = new FormData(e.target)
        const response = await axiosClient.get(`/api/ganti/produk/kategori?titleLama=${upload.get('titleLama')}&titleBaru=${upload.get('titleBaru')}`)
        console.log(response.data)
        // return navigate('/admin/produk')
    }

    return (
        <div className="main-content">
            <h1>Halo World!</h1>
            <form onSubmit={onSubmittedForm}>
                <input type="text" name="titleLama"/>
                <input type="text" name="titleBaru"/>
                <button type="submit">Upload</button>
            </form>
        </div>
    )
}