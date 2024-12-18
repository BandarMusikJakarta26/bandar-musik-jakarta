import { db } from "../../config.js"

export default async function deleteBrandService(req, res){
    const { id } = req.params
    if(!id) return res.status(200).json({ success: false })
    const hapus = await db.brand.delete({ where: { id } })
    if(!hapus) return res.status(200).json({ success: false })
    const brands = await db.brand.findMany()
    return res.status(200).json({ success: true, brands })
}