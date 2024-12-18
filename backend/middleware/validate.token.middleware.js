import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { db } from '../config.js'
dotenv.config()

export default async function validateToken(req, res, next){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if(!token) throw new Error('Tidak ada Token!')

    const { id } = jwt.verify(token, process.env.JWT_SECRET)
    req.akun = await db.akun.findFirst({ where: { id } })
    
    return next()
}