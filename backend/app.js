import express from 'express'
import router from './routes/router.js'
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
        this.app.use(cookieParser(process.env.COOKIE_SECRET))
        this.app.use(cors({ origin: process.env.ORIGIN ? process.env.ORIGIN : 'https://bandarmusikjakarta.com', credentials: true }))
        this.app.use(router)
    }
    #connection(){
        this.app.listen(process.env.PORT, ()=>console.log('Menjalankan Server!'))
    }
}

export default new App().app