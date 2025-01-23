export default function SearchCategories({ categories }: { categories: any[] }){        
    return (
        <>
        <h1 className="font-extrabold py-[6px] block px-4">Kategori</h1>
        { categories.map((category, index)=>{
        return (
            <div className="kotak" key={index}>
                <a href={`/kategori/${category.title}`} className="py-[6px] block hover:bg-white px-4 transition-all">{category.title}</a>
            </div>
        )}) }
        </>
    )
}