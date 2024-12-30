import { useState } from "react"
import { checkAdmin } from "../../action/auth.action"
import BlankPage from "../blank"

export default function AdminDashboard(){
    const [ admin, isAdmin ] = useState<boolean>(false) 
    async function adminValidation() { return await isAdmin(await checkAdmin()) }
    adminValidation()

    if(!admin) return <BlankPage/>
    else return (
        <h1>Halo Admin!</h1>
    )
}