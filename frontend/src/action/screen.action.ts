import { NavigateFunction } from "react-router"

export default function responsivePage(setScreen: React.SetStateAction<number|any>, navigate?: NavigateFunction){
        return addEventListener("resize", ()=>{
            setScreen(window.innerWidth)
            navigate && navigate(0)
        })
}