import { db } from "../config.js"
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

export default async function getAccessToken(req, res){
    const refreshToken = req.cookies.refreshToken
    if(!refreshToken) throw new Error('Unauthorized')
    const { id } = jwt.verify(refreshToken, process.env.JWT_SECRET)
    if(!id){ 
        await db.akun.update({ where: { refreshToken }, data: { refreshToken: '' } }) 
        throw new Error('Unauthorized')
    }
        
    const searchRefresh = await db.akun.findFirst({ where: { id, refreshToken } })
    if(!searchRefresh) throw new Error('Unauthorized')

    return refreshToken
}