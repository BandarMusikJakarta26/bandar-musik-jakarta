import { Cloudinary } from "@cloudinary/url-gen/index"

const cloudName = 'dhz1p2xvn'

export const host = process.env.NODE_ENV == "production" ? "https://bandarmusikjakartaserver.vercel.app" : "http://localhost:5000"
export const cloudSDK = new Cloudinary({ cloud: { cloudName: cloudName } })