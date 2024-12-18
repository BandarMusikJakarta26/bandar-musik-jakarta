import { db } from "../../config.js"

export default async function addProductService(req, res){
    const { name, harga, brand, kategori, tokped } = req.body
    const fileName = req.file.filename
    const produk = await db.produk.create({ data: { 
        name, harga, tokopedia: tokped, image: fileName, categoryName: kategori, brandName: brand 
    } })
    return res.status(200).json({ success: true, produk })
}