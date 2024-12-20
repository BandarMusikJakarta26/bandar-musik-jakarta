export default function LayoutSubmitAuth({ loading, tulisan }: { loading: boolean, tulisan: string }){
    return (
        <button type="submit" disabled={!loading ? false : true} className="border-2 border-third bg-third text-primary text-[22px] py-2 rounded-3xl 
        hover:brightness-75 transition-all">{tulisan}</button>
    )
}