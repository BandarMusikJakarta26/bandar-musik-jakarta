export default function RegisterButton({ loading }: { loading: boolean }){
    return (
        <button type="submit" disabled={!loading ? false : true} className="border-2 border-third bg-third text-primary text-[22px] py-2 rounded-3xl 
        hover:brightness-75 transition-all">Kirim</button>
    )
}