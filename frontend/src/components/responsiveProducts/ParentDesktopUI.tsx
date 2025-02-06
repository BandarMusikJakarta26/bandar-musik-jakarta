export default function ParentDesktopUI({ product, according, index, children }: { product: any, according: string, index: number, children: any }){
    if(according == "admin")return (
        <div className="group card p-[6px] relative flex flex-col gap-y-3 bg-[#fafafa] rounded-xl transition-all border-2 border-gray-200" key={index}>
            { children }
        </div>)
    else return (
        <a className="group card relative flex flex-col px-[6px] py-[6px] gap-y-3 bg-[#fafafa] rounded-xl transition-all border-2 border-gray-200" key={index} href={`/produk/${product.url}`}>
            { children }
        </a>
    )
}