export default function LayoutAuth({children}:any){
    return (
        <div className="layout w-full flex justify-center h-[80vh] py-16">
            <div className="w-[40%] shadow-xl rounded-3xl border-2 border-third">
                <div className="register px-10 py-6 flex flex-col gap-y-4 h-full justify-center">
                    {children}
                </div>
            </div>
        </div>
    )
}