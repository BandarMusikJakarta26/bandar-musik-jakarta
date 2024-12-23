import { db } from "../../config.js"

export default async function getBrandByNameService(req, res){
    const { name } = req.params
    const brand = await db.brand.findFirst({ where:{ name } })
    if(!brand) return res.status(200).json({ success: false })
    return res.status(200).json({ success: true, brand })
}