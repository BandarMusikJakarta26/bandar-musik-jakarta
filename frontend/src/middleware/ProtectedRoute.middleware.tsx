import { ReactNode } from "react";

export default function ProtectedRouteMiddleware({ children }: {children: ReactNode}){
    return { children }
}