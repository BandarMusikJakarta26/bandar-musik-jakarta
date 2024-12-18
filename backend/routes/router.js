import { Router } from "express"
import registerService from "../services/auth/register.service.js"
import loginService from "../services/auth/login.service.js"
import initToken from "../services/auth/init.token.service.js"
import validateToken from "../middleware/validate.token.middleware.js"
import getToken from "../services/auth/get.token.service.js"
import logout from "../services/auth/logout.service.js"
import addBrandService from "../services/admin/add.brand.service.js"
import multer, { MulterError, diskStorage } from "multer";
import path from "path"
import getBrandService from "../services/admin/get.brand.service.js"
import isAdmin from "../services/auth/isAdmin.service.js"
import deleteBrandService from "../services/admin/delete.brand.service.js"
import getBrandByIdService from "../services/brand/get.brand.by.id.service.js"
import getCategoryService from "../services/brand/get.category.service.js"
import addProductService from "../services/admin/add.product.service.js"
import getProductByBrand from "../services/produk/get.product.by.brand.js"

const storage = diskStorage({
    destination: (req, file, cb)=>{
        return cb(null, './public/images/brand')
    }, filename: (req, file, cb)=>{
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({ storage, limits: { fileSize: 3000000 }, fileFilter: function(req, file, cb){
    const imageExt = ['png', 'jpg', 'jpeg']
    const ext = file.mimetype.split('/')[1]
    const checkExt = imageExt.filter(exist=>ext === exist)
    if(checkExt.length == 0){
        cb(new Error('File bukan gambar!'))
    } else cb(null, true)
}})

class Routes {
    constructor(){
        this.router = Router()
        this.#getRoute()
        this.#postRoute()
    }
    #getRoute(){
        this.router.get('/home', validateToken, async(req,res)=>{
            return res.json({ msg: 'Hello World!', akun: req.akun || 'kosong' })
        })
        this.router.get('/token', getToken)
        this.router.get('/user/logout', logout)

        // this.router.get('/brand/name', getBrandOnlyName)
        this.router.get('/brand/:name', getBrandByIdService)

        this.router.get('/produk/:brand', getProductByBrand)
        // this.router.get('/produk/:kategori', getProductByKategori)

        this.router.get('/admin/verify', isAdmin)
        this.router.get('/admin/brand', getBrandService)
        this.router.get('/admin/brand/:limit', getBrandService)
        this.router.get('/admin/hapus/brand/:id', deleteBrandService)

        this.router.get('/admin/category', getCategoryService)
    }
    #postRoute(){
        this.router.post('/user/register', registerService ,(req,res)=>{
            return res.status(200).json({ msg: 'Berhasil!' })
        })
        this.router.post('/user/login', loginService, initToken)
        this.router.post('/admin/tambah/brand', upload.single('file'), addBrandService)
        this.router.post('/admin/tambah/produk', upload.single('file'), addProductService)
    }
}

export default new Routes().router