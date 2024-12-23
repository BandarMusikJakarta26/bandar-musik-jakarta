import ShowBrands from "./ShowBrands";

export default function BrandList({ brands }: { brands: any[] }){
    return (
        <>
        <div className="brand-list grid grid-cols-10 gap-8">
            { brands && brands.length != 0 ? <ShowBrands brands={brands}/> : false } 
        </div>
        <div className="brand-line w-full bg-third py-[1px] mt-4"></div>
        </>
    )
}