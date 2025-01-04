import { db } from "../../config.js";

export default async function getTerbaruService(req,res){
    const { limit } = req.params
    let terbaru
    if(limit) terbaru = await db.terbaru.findMany({ orderBy: { createdAt: 'desc' }, take: parseInt(limit) })
    else terbaru = await db.terbaru.findMany()
    return res.status(200).json({ success: true, terbaru })
}