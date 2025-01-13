import { PrismaClient } from "@prisma/client";
import { v2 as cloudinary } from 'cloudinary'
import { CloudinaryStorage } from 'multer-storage-cloudinary'
import dotenv from 'dotenv'
import sftpStorage from "multer-sftp";
dotenv.config()

export const db = new PrismaClient()

export const FtpStorage = sftpStorage({
    sftp: {
        host:'ftp://46.202.138.87',
        port: 22,
        username: 'u666349941.server.bandarmusikjakarta.com',
        password: 'BMJ100%original'
    },
    destination: function(req, file, cb){
        return cb(null, '/uploads')
    },
    filename: function(req, file, cb){
        return cb(null, file.fieldname + '-' + Date.now())
    }
})

// cloudinary.config({
//     cloud_name: process.env.CLOUDNARY_CLOUD_NAME,
//     api_key: process.env.CLOUDNARY_API_KEY,
//     api_secret: process.env.CLOUDNARY_API_SECRET,
// })

// export const cloudinaryVideoStorage = new CloudinaryStorage({
//     cloudinary,
//     // allowedFormats: ['mp4', 'mov'],
//     params: {
//         folder: 'videos',
//         public_id: (req, file)=> file.originalname.split('.')[0]
//     }
// })

// export const cloudinaryStorage = new CloudinaryStorage({
//     cloudinary,
//     allowedFormats: ['jpg, png, jpeg'],
//     params: {
//         folder: 'uploads',
//         public_id: (req, file)=> file.originalname.split('.')[0]
//     }
// })