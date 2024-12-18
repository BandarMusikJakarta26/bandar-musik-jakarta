import { db } from "../config.js"
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

export default async function getAccessToken(req, res){
    let accessToken = req.cookies.accessToken
    if(!accessToken){
        const refreshToken = req.cookies.refreshToken
        if(!refreshToken) throw new Error('Unauthorized')

        const { id } = jwt.verify(refreshToken, process.env.JWT_SECRET)
        if(!id){ 
            await db.akun.update({ where: { refreshToken }, data: { refreshToken: '' } }) 
            throw new Error('Unauthorized')
        }
        
        const searchRefresh = await db.akun.findFirst({ where: { id, refreshToken } })
        if(!searchRefresh) throw new Error('Unauthorized')
        accessToken = jwt.sign({ id: searchRefresh.id }, process.env.JWT_SECRET, { expiresIn: '10s' })
        res.cookie('accessToken', accessToken, { httpOnly: true, maxAge: 1000 * 3600 })
    }
    return accessToken
}