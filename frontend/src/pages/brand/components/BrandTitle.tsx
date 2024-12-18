import { host } from "../../../../libs/config"

export default function BrandTitle({ brand }: any){
    return (
        <div className="brand">
            <div className="atas flex items-center gap-x-6">
                <img src={`${host}/images/brand/${brand.image}`} alt={brand.name} width={500}/>
                <div className="tulisan">
                    <div className="tulisan-atas">
                        <h1 className="text-[48px] font-bold">{brand.name}</h1>
                    </div>
                    <p className="text-justify">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officia, sapiente quisquam modi quos ipsa perferendis libero natus reprehenderit enim expedita est temporibus perspiciatis fugit fugiat aut hic? Amet, temporibus quaerat.
                    Officiis rem delectus dolor magni pariatur iusto, quia vel! Iste repellendus maxime laudantium id et, dolore saepe error sint dolorum reiciendis voluptas! Cum, doloremque. Itaque repellat harum porro? Voluptas, vel!
                    Quaerat corporis fuga, porro esse repudiandae eum fugiat voluptas dolorem est dolor harum, vel labore dolore possimus debitis ipsa! Cupiditate sapiente accusamus laboriosam cumque dolorum quae assumenda odit aspernatur deleniti!
                    Modi, laudantium? Laboriosam neque quo architecto beatae consequuntur nulla cupiditate deserunt vero quam commodi, autem mollitia repellendus quos praesentium veritatis debitis quas temporibus eius nemo delectus explicabo dolore ducimus! Excepturi.</p>
                </div>
            </div>
        </div>
    )
}