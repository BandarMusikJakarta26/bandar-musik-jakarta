export default function ParentDesktopUI({ product, according, index, children }: { product: any, according: string, index: number, children: any }){
    if(according == "admin")return (
        <div className="group card shadow-xl p-4 relative flex flex-col gap-y-3 bg-white hover:-translate-y-2  transition-all" key={index}>
            { children }
        </div>)
    else return (
        <a className="group card shadow-xl p-4 relative flex flex-col gap-y-3 bg-white hover:-translate-y-2  transition-all" key={index} href={`/produk/${product.url}`}>
            { children }
        </a>
    )
}