import { db } from "../../config.js"
import bcrypt from 'bcrypt'

export default async function registerService(req, res){
    try{
        const data = req.body
        data.password = await bcrypt.hash(data.password, 5)
        await db.akun.create({ data: {...data, refreshToken: ''} })
        return res.status(200).json({ success: true, msg: 'Berhasil Daftar!' })
    }catch(err){ return res.status(200).json({ success: false, error: err.message }) }
}