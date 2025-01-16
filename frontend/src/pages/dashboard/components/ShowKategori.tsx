import { host } from "../../../../libs/config";

export function ShowKategori({category}: { category: any }){
    console.log(category)
    return (
        <a className='w-full drop-shadow-xl flex justify-center' href={`/kategori/${category.name}`}>
            <img src={`${host}/storage/${category.image}`} alt={category.name}/>
        </a>
    )
}