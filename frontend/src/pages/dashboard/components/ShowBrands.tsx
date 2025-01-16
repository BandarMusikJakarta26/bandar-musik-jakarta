import { host } from "../../../../libs/config"

export default function ShowBrands({brands}: {brands: any[]}){
        return brands.map((brand: { name: string, image: string }, index: number)=>{
            return (
                <div className="gambar-brand w-full h-[100px] flex items-center justify-center opacity-50 hover:opacity-100 transition-all hover:scale-105" key={index}>
                    <a href={`/brand/${brand.name}`}><img src={`${host}/storage/${brand.image}`} alt={brand.name} /></a>
                </div>
                )
            })
}