import { db } from "../config.js";

export default async function getSearchByName(req, res){
    const { keyword } = req.params
    if(!keyword) return res.status(200).json({ success: false })
        
    const products = await db.produk.findMany({ where: { name: { contains: keyword, mode: 'insensitive' } } })
    const brands = await db.brand.findMany({ where: { name: { contains: keyword, mode: 'insensitive' } } })
    const categories = await db.kategori.findMany({ where: { name: { contains: keyword, mode: 'insensitive' } } })

    if(products.length == 0 && brands.length == 0 && categories.length == 0) return res.status(200).json({ success: false })

    return res.status(200).json({ success: true, products, brands, categories })
}