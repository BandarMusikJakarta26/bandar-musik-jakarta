import { db } from "../../config.js"

export default async function addProductService(req, res){
    const { name, harga, deskripsi, brand, kategori, tokped } = req.body
    let filesName = []
    for(let i=0; i<req.files.length;i++){ filesName.push(req.files[i].filename) }
    const produk = await db.produk.create({ data: { name, harga, deskripsi, tokopedia: tokped, images: filesName, categoryName: kategori, brandName: brand } })

    const kategoriData = await db.kategori.findFirst({ where: { name: kategori } })
    const filterBrand = kategoriData.brands.filter(kategoriBrand => kategoriBrand === brand )
    if(filterBrand.length == 0) await db.kategori.update({ where: { name: kategori }, data: { brands: [...kategoriData.brands, brand] } })

    return res.status(200).json({ success: true, produk })
}