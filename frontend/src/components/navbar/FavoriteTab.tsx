import { useEffect, useState } from "react"
import { getWishlistProduct } from "../../action/produk.action"
import FavoriteItem from "./FavoriteItem"
import { wishlistStore } from "../../../libs/store"

export default function FavoriteTab(){
    const [ products, setProducts ] = useState<any>([])
    const [ wishlist, setWishlist ] = useState<any>([])
    const resetList = wishlistStore((state)=>state.resetList)

    useEffect(()=>{
        setWishlist(localStorage.getItem("wishlist"))
        // localStorage.removeItem('wishlist')
        if(!wishlist || wishlist.length == 0) setProducts([])
        else getWishlistProduct(JSON.parse(wishlist), products, setProducts)
    }, [wishlist])

    return (
        <div className="fav absolute bottom-[-400px] right-0 bg-white w-[50%] rounded-3xl overflow-hidden">
            <div className="title-fav px-8 py-4 flex justify-between">
                <h1 className="text-[20px] font-bold">Favorit Anda</h1>
                {products.length > 0 && <button className="border-[1px] border-red-600 text-red-600 font-bold text-[12px] px-3 py-1 rounded-md" onClick={()=>{
                    localStorage.removeItem("wishlist")
                    resetList()
                    setWishlist([])
                }}>Hapus ({products.length})</button>}
            </div>
            <div className="badan-fav h-[320px] overflow-y-scroll mr-2">
                { products.length > 0 && <FavoriteItem products={products}/> }
                { products.length == 0 && <div className="kosong flex flex-col items-center justify-center h-full">
                    <p className="text-[36px] font-bold text-gray-400 tracking-tight">Kosong</p>
                    <p className="text-[14px] italic text-gray-400 font-light tracking-tight">Belum ada produk yang ditambahkan</p>
            </div> }
            </div>
        </div>
    )
}