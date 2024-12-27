import { ReactNode } from "react";

export default function TautanLayout({ children }: { children: ReactNode }){
    return <div className="tautans">
        <h1 className="text-[10px] md:text-[16px] uppercase font-semibold">Brands</h1>
        <div className="text-[8px] md:text-[13px] grid grid-cols-2 md:grid-cols-3">
            { children }
        </div>
    </div>
}