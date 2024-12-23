import { db } from "../../config.js"

export default async function addCategoryService(req, res){
    const { name } = req.body
    const pathname = req.file.filename
    const category = await db.kategori.create({ data: { name, image: pathname } })
    return res.status(200).json({ success: true, category })
}