export default function BlankPage(){
    return (
        <div className="blank h-[78vh] flex flex-col items-center justify-center">
            <h1 className="not-found text-[40px] md:text-[120px] font-extrabold tracking-tight">Not Found</h1>
            <p className="text-[14px] -mt-[8px]">kembali ke <a href="/" className="underline">halaman utama</a>?</p>
        </div>
    )
}