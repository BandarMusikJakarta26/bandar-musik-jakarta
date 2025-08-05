export default function LoadingPage(){
    return (
        <div className="loading h-[78vh] flex items-center justify-center">
            <svg className="md:mr-3 size-5 animate-spin ..." viewBox="0 0 24 24"></svg>
            <h1 className="text-[60px] md:text-[120px] font-extrabold tracking-tighter">Loading</h1>
        </div>
    )
}