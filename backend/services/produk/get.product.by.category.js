import { db } from "../../config.js"

export default async function getProductByCategory(req, res){
    const { kategori } = req.params
    const produk = await db.produk.findMany({ where: { categoryName: kategori }, orderBy: { name: 'asc' } })
    return res.status(200).json({ success: true, produk })
}