import { host } from "../../../libs/config"

export default function FavoriteItem({ products }: { products: any[] }){
    return products.map((product, index)=>{
        return (
            <div className="produk px-8 py-3 flex gap-x-3" key={index}>
                <img src={`${host}/storage/${product.images[0]}`} alt={product.name} className="w-[80px] border-[1px] border-gray-200"/>
                <div className="produk-desk">

                <h1>{product.name}</h1>
                <a href={`/produk/${product.url}`} className="text-[13px] underline">Lihat Produk</a>

                </div>
            </div>
        )
    })
}