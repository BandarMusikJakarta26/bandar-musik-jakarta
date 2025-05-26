import { createContext } from 'react'
import { create } from 'zustand'

type isLogin = {
    login: boolean,
    loggedIn: ()=>void
    logout: ()=>void
}

type currencyHandle = {
    usd: boolean,
    setUsd: ()=>void
    unsetUsd: ()=>void
}

export const changeCurrency = create<currencyHandle>((set)=>({
    usd: false,
    setUsd: () => set({ usd: true }),
    unsetUsd: () => set({ usd: false })
}))

export const isLoginStore = create<isLogin>((set)=>({
    login: false,
    loggedIn: ()=>set({ login: true }),
    logout: ()=>set({ login: false })
}))

export const UsdContext = createContext<boolean | null>(null)

export const promos = ['Walk-in', 'Akhir Tahun', 'Cuci Gudang', 'Java Jazz']