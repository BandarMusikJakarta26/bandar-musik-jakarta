import { db } from "../../config.js";

export default async function getCategoryService(req, res){
    const categories = await db.kategori.findMany()
    return res.status(200).json({ success: true, categories })
}