export default function KategoriKosong(){
        return (
            <div className="kosong w-full h-[70vh] flex flex-col items-center justify-center shadow-xl p-16">
                <h1 className="text-[80px] font-bold tracking-tighter uppercase">Belum ada kategori</h1>
                <a href="/admin/tambah/kategori" className="underline text-[22px]">Tambah Kategori?</a>
            </div>
        )
}