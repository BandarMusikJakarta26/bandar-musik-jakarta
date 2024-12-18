import { db } from "../../config.js";

export default async function getBrandService(req, res){
    const { limit } = req.params
    let brands
   
    if(limit) brands = await db.brand.findMany({ orderBy: { name: 'asc' }, take: parseInt(limit) })
    else if(req.query.name) brands = await db.brand.findMany({ orderBy: { name: 'asc' }, select: { name: true } })
    else brands = await db.brand.findMany({ orderBy: { name: 'asc' } })

    if(!brands) return res.status(200).json({ success: false })
    return res.status(200).json({ success: true, brands })
}