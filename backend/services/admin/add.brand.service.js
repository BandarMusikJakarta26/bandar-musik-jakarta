import { db } from "../../config.js"

export default async function addBrandService(req, res){
    const { name } = req.body
    const fileName = req.file.filename
    const brand = await db.brand.create({ data: { name, image: fileName } })
    return res.status(200).json({ success: true, brand })
}