import express from 'express'
// import router from './routes/router.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
dotenv.config()

class App {
    constructor(){
        this.app = express()
        this.#middleware()
        this.#connection()
    }
    #middleware(){
        this.app.use(express.json())
        this.app.use(express.static("public"))
        this.app.use(express.urlencoded({ extended: true }))
        this.app.use(cors({ origin: 'https://bandarmusikjakarta.vercel.app', credentials: true }))
        this.app.use(cookieParser(process.env.COOKIE_SECRET))
        this.app.get('/', (req,res)=>{
            return res.status(200).json({ nama: "HALO DUNIA!" })
        })
        // this.app.use(router)
    }
    #connection(){
        this.app.listen(process.env.PORT, ()=>console.log('Menjalankan Server!'))
    }
}

export default new App().app