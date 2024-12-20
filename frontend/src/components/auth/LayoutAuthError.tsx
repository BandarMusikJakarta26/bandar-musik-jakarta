export default function LayoutAuthError({ error }: { error:string }){
    return <p className="text-red-500 font-semibold text-[17px] text-center bg-red-200 rounded-2xl py-3">{error}</p>
}