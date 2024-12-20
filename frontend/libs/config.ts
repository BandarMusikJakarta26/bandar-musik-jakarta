import { Cloudinary } from "@cloudinary/url-gen/index"

const cloudName = 'dhz1p2xvn'

export const host = "https://bandarmusikjakartaserver.vercel.app"
// export const host = "http://localhost:5000"
export const cloudSDK = new Cloudinary({ cloud: { cloudName: cloudName } })