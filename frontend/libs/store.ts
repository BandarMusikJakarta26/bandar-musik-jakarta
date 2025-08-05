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

type wishList = {
    wishlist: any,
    tambahList: (data: number)=>void,
    resetList: ()=>void
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

export const wishlistStore= create<wishList>((set)=>({
    wishlist: 0,
    tambahList: (data)=>set({ wishlist: data}),
    resetList: ()=>set({ wishlist: 0}),
}))

export const UsdContext = createContext<boolean | null>(null)