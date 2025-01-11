import { Cloudinary } from "@cloudinary/url-gen/index"

const cloudName = 'dciaquu2u'

// export const host = process.env.NODE_ENV == "production" ? "https://bandarmusikjakartaserver.vercel.app" : "http://localhost:5000"
export const host = process.env.NODE_ENV == "production" ? "https://bandarmusikjakartaserver.vercel.app" : "http://localhost:5000"
export const cloudSDK = new Cloudinary({ cloud: { cloudName: cloudName } })