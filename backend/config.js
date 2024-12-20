import { PrismaClient } from "@prisma/client";
import { v2 as cloudinary } from 'cloudinary'
import { CloudinaryStorage } from 'multer-storage-cloudinary'
import dotenv from 'dotenv'
dotenv.config()

export const db = new PrismaClient()

cloudinary.config({
    cloud_name: process.env.CLOUDNARY_CLOUD_NAME,
    api_key: process.env.CLOUDNARY_API_KEY,
    api_secret: process.env.CLOUDNARY_API_SECRET,
})

export const cloudinaryStorage = new CloudinaryStorage({
    cloudinary,
    allowedFormats: ['jpg, png, jpeg'],
    params: {
        folder: 'uploads',
        public_id: (req, file)=> file.originalname.split('.')[0]
    }
})