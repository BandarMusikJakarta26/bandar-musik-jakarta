import { db } from "../../config.js"

export default async function addTerbaruService(req,res){
    const { topik, link, deskripsi } = req.body
    const pathname = req.file.filename
    const terbaru = await db.terbaru.create({ data: { topik, link, deskripsi, image: pathname } })
    return res.status(200).json({ success: true, terbaru })
}