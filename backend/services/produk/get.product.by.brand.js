import { db } from "../../config.js"

export default async function getProductByBrand(req, res){
    const { brand } = req.params
    const produk = await db.produk.findMany({ where: { brandName: brand }, orderBy: { name: 'asc' } })
    return res.status(200).json({ success: true, produk })
}