export default function LayoutAuth({children}:any){
    return (
        <div className="layout w-full flex justify-center md:h-[80vh] py-8 md:py-16">
            <div className="w-[86%] md:w-[40%] shadow-xl rounded-3xl border-2 border-third">
                <div className="login p-8 md:px-10 md:py-6 flex flex-col gap-y-4 h-full justify-center">
                    {children}
                </div>
            </div>
        </div>
    )
}