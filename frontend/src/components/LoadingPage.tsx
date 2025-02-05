export default function LoadingPage(){
    return (
        <div className="loading h-[78vh] flex items-center justify-center">
            <svg className="mr-3 size-5 animate-spin ..." viewBox="0 0 24 24"></svg>
            <h1 className="text-[120px] font-extrabold tracking-tight">Loading</h1>
        </div>
    )
}