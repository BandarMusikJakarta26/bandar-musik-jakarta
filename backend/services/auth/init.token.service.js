import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { db } from '../../config.js'
dotenv.config()

export default async function initToken(req, res){
    const accessToken =  jwt.sign({ id: req.id }, process.env.JWT_SECRET, { expiresIn: '10s' })
    const refreshToken =  jwt.sign({ id: req.id }, process.env.JWT_SECRET, { expiresIn: '1h' })

    res.cookie('accessToken', accessToken, { httpOnly: true, secure: process.env.origin ? false : true, maxAge: 10000, sameSite: process.env.origin ? true : 'None' })
    res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: process.env.origin ? false : true, maxAge: 1000 * 3600, sameSite: process.env.origin ? true : 'None' })

    const akun = await db.akun.update({ where: { id: req.id }, data: { refreshToken } })
    
    return res.status(200).json({ success: true, role: akun.role })
}