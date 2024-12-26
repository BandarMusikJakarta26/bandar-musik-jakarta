import { db } from "../../config.js";

export default async function getCategoryByNameService(req, res){
    const { name } = req.params
    const category = await db.kategori.findFirst({ where: { name } })
    return res.status(200).json({ success: true, category })
}