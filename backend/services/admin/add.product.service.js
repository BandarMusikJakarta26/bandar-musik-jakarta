import { db } from "../../config.js"

export default async function addProductService(req, res){
    const { name, harga, deskripsi, brand, kategori, tokped } = req.body
    const fileName = req.file.filename
    const produk = await db.produk.create({ data: { name, harga, deskripsi, tokopedia: tokped, image: fileName, categoryName: kategori, brandName: brand } })

    const kategoriData = await db.kategori.findFirst({ where: { name: kategori } })
    const filterBrand = kategoriData.brands.filter(kategoriBrand => kategoriBrand === brand )
    if(filterBrand.length == 0) await db.kategori.update({ where: { name: kategori }, data: { brands: [...kategoriData.brands, brand] } })

    return res.status(200).json({ success: true, produk })
}