export default function ShowPageList({ page, data }: { page: string, data: any[] }){
    return data.map((satuan, index)=>{
        return <div key={index}><a href={`/${page}/${satuan.name}`} className="text-primary opacity-60 hover:opacity-100 transition-all">{satuan.name}</a></div>
    })
}