import { db } from "../../config.js"

export default async function addCategoryService(req, res){
    try{
        console.log(req.body)
        console.log(req.file)
        const { name } = req.body
        const pathname = req.file.filename
        const category = await db.kategori.create({ data: { name, image: pathname } })
        return res.status(200).json({ success: true, category })
    }catch(err){ return res.status(200).json({ success: false, error: err.message })}
}