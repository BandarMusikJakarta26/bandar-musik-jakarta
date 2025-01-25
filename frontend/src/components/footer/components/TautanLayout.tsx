import { ReactNode } from "react";
import TitleTautan from "./TitleTautan";

export default function TautanLayout({ children, title }: { children: ReactNode, title: string }){
    return <div className="tautans">
        <TitleTautan>{title}</TitleTautan>
        <div className="text-[8px] md:text-[13px] grid grid-cols-2 md:grid-cols-3 gap-x-2 md:gap-x-0">
            { children }
        </div>
    </div>
}