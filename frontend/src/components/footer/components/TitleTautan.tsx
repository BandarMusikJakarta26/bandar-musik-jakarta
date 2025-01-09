import { ReactNode } from "react";

export default function TitleTautan({ children }: { children: ReactNode }){
    return <h1 className="text-[10px] md:text-[16px] uppercase font-semibold">{children}</h1>
}