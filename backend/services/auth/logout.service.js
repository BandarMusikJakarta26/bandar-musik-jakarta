import { db } from "../../config.js"

export default async function logout(req, res){
    const refreshToken = req.cookies.refreshToken
    if(!refreshToken) return res.status(200).json({ success: false })
    const searchAkun = await db.akun.findFirst({ where: { refreshToken } })
    if(!searchAkun) return res.status(200).json({ success: false })
    await db.akun.update({ where: { id: searchAkun.id }, data: { refreshToken: '' } })
    res.clearCookie('refreshToken')
    res.clearCookie('accessToken')
    return res.status(200).json({ success: true })
}