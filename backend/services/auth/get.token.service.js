import getAccessToken from "../../middleware/get.access.token.middleware.js"

export default async function getToken(req, res){
        try{
                const refreshToken = await getAccessToken(req, res)
                return res.status(200).json({ success: true, refreshToken  })
        }catch(err){ return res.status(200).json({ success: false, msg: err.message }) }
}