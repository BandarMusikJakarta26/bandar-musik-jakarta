import { db } from "../../config.js";

export default async function getProductsService(req,res){
    const produk = await db.produk.findMany()
    return res.status(200).json({ success: true, produk })
}