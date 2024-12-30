import { Router } from "express"

import registerService from "../services/auth/register.service.js"
import loginService from "../services/auth/login.service.js"
import initToken from "../services/auth/init.token.service.js"
import getToken from "../services/auth/get.token.service.js"
import logout from "../services/auth/logout.service.js"
import isAdmin from "../services/auth/isAdmin.service.js"

import addBrandService from "../services/admin/add.brand.service.js"
import addProductService from "../services/admin/add.product.service.js"
import addCategoryService from "../services/admin/add.category.service.js"

import getBrandService from "../services/brand/get.brand.service.js"
import getBrandByNameService from "../services/brand/get.brand.by.name.service.js"

import getCategoryService from "../services/kategori/get.category.service.js"
import getCategoryByNameService from "../services/kategori/get.category.by.name.service.js"

import getProductByBrand from "../services/produk/get.product.by.brand.js"

import deleteBrandService from "../services/admin/delete.brand.service.js"

import { cloudinaryStorage } from "../config.js"
import multer from "multer";
import getSearchByName from "../services/get.search.by.name.service.js"
import getProductByCategory from "../services/produk/get.product.by.category.js"
import getProductsService from "../services/produk/get.product.service.js"

const upload = multer({ storage: cloudinaryStorage, limits: { fileSize: 3000000 }, fileFilter: function(req, file, cb){
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
        this.router.get('/token', getToken)
        this.router.get('/user/logout', logout)

        this.router.get('/search', getSearchByName)
        this.router.get('/search/:keyword', getSearchByName)

        this.router.get('/brand/:name', getBrandByNameService)
        this.router.get('/kategori/:name', getCategoryByNameService)

        this.router.get('/produk/brand/:brand', getProductByBrand)
        this.router.get('/produk/kategori/:kategori', getProductByCategory)

        this.router.get('/admin/verify', isAdmin)
        this.router.get('/admin/brand', getBrandService)  
        this.router.get('/admin/brand/:limit', getBrandService)
        this.router.get('/admin/hapus/brand/:id', deleteBrandService)

        this.router.get('/admin/kategori', getCategoryService)

        this.router.get('/admin/produk', getProductsService)
    }
    #postRoute(){
        this.router.post('/user/register', registerService)
        this.router.post('/user/login', loginService, initToken)

        this.router.post('/admin/tambah/brand', upload.single('file'), addBrandService)
        this.router.post('/admin/tambah/produk', upload.single('file'), addProductService)
        this.router.post('/admin/tambah/kategori', upload.single('file'), addCategoryService)
    }
}

export default new Routes().router