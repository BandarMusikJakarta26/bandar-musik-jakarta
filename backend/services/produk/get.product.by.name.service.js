import { db } from "../../config.js"

export default async function getProductByName(req, res){
    const { name } = req.params
    const produk = await db.produk.findFirst({ where: { name } })
    return res.status(200).json({ success: true, produk })
}