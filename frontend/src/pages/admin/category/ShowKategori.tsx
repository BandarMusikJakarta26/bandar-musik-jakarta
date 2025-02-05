import { host } from "../../../../libs/config"

// export async function deleteCategory(id: string){
//     const response = await axios.get(`${host}/admin/hapus/kategori/${id}`)
//     if(!response.data.success) return true
//     setCategories(response.data.brands)
//     responsivePage(setScreen)
// }

export default function ShowKategori({categories}: any){ 
            return categories.map((category: any, index: number)=>{
            return (
                <div className="brandfield flex flex-col shadow-lg items-center" key={index+1}>
                    <img src={`${host}/storage/${category.image}`} alt={category.name} />
                    <div className="nama-brand p-5 flex flex-col items-center gap-y-2">
                        <h1 className="text-[13px] md:text-[24px] font-semibold">{category.name}</h1>
                        <button className="bg-red-600 text-primary font-semibold rounded-full py-[2px] md:py-1 hover:brightness-90 w-[60px] md:w-[70px] text-[10px] md:text-[14px]">Delete</button>
                    </div>
                </div>
            )
    })
}