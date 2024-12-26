export default function SearchProducts({ products }: { products: any[] }){
        return (
            <>
            <h1 className="font-extrabold py-[6px] block px-4">Product</h1>
            { products.map((product, index)=>{
                return (
                    <div className="kotak" key={index}>
                        <a href={`${product.tokopedia}`} className="py-[6px] block hover:bg-white px-4 transition-all">{product.name}</a>
                    </div>
            )})}
            </>
        )
}