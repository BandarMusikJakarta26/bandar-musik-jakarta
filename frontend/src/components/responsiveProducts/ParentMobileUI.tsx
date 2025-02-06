export default function ParentMobileUI({ product, according, index, children }: { product: any, according: string, index: number, children: any }){
    if(according == "admin")return (
        <div className="flex bg-primary rounded-lg overflow-hidden items-center group flex-col relative border-[1px] border-gray-300" key={index}>
            { children }
        </div>)
    else return (
        <a className="flex bg-primary rounded-lg items-center group flex-col relative border-[1px] border-gray-300" key={index} href={`/produk/${product.url}`}>
            { children }
        </a>
    )
}