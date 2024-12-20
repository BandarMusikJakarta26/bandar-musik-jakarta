import { db } from "../../config.js"

export default async function addBrandService(req, res){
    const { name } = req.body
    const pathname = req.file.filename
    const brand = await db.brand.create({ data: { name, image: pathname } })
    return res.status(200).json({ success: true, brand })
}