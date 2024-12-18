import { db } from "../../config.js"
import bcrypt from 'bcrypt'

export default async function loginService(req, res, next){
    try{
        const { username, password } = req.body
    
        const akun = await db.akun.findUnique({ where: { username } })
        if(!akun) throw new Error('Akun tidak ditemukan!')
    
        const verifyPassword = await bcrypt.compare(password, akun.password)
        if(!verifyPassword) throw new Error('Password tidak sesuai!')

        req.id = akun.id
        return next()
    }catch(err){
        return res.status(200).json({ error: err.message })
    }
}