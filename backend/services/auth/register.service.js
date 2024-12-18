import { db } from "../../config.js"
import bcrypt from 'bcrypt'

export default async function registerService(req, res, next){
    try{
        const data = req.body
        data.password = await bcrypt.hash(data.password, 5)
        const akun = await db.akun.create({ data: {...data, refreshToken: ''} })
        return next()
    }catch(err){
        console.log(err.message)
    }
}