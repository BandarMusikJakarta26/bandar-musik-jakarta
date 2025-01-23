import { create } from 'zustand'

type isLogin = {
    login: boolean,
    loggedIn: ()=>void
    logout: ()=>void
}

export const isLoginStore = create<isLogin>((set)=>({
    login: false,
    loggedIn: ()=>set({ login: true }),
    logout: ()=>set({ login: false })
}))