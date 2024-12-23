export default function SearchBrands({ brands }: { brands: any[] }){
    return (
        <>
            <h1 className="font-extrabold py-[6px] block px-4">Brand</h1>
            { brands.map((brand, index)=>{
                return (
                    <div className="kotak" key={index}>
                        <a href={`/brand/${brand.name}`} className="py-[6px] block hover:bg-white px-4 transition-all">{brand.name}</a>
                    </div>
            )}) }
        </>
    )
}