import { db } from "../../config.js"
import getAccessToken from "../../middleware/get.access.token.middleware.js"
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

export default async function isAdmin(req, res){
    try{
        const refreshToken = await getAccessToken(req, res)
        const { id } = jwt.verify(refreshToken, process.env.JWT_SECRET)
        if(!id) return res.status(200).json({ success: false })
        const user = await db.akun.findUnique({ where: { id } })
        if(!user) return res.status(200).json({ success: false })
        if(user && user.role !== "ADMIN") return res.status(200).json({ success: false })
        return res.status(200).json({ success: true })
    }catch(err){
        return res.status(200).json({ success: false, msg: err.message })
    }


}