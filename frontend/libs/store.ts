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

export interface IPromo {
    title: string, duration?: string, img: string
}

export const promos: IPromo[] = [
    {title: 'Java Jazz', duration: '29 Mei - 1 Juni', img: '../../../public/utils/JavaJazzBG.png'},
    {title: 'Walk-In', img: '../../../public/utils/walkin.png'},
    {title: 'Kemerdekaan', img: '../../../public/utils/kemerdekaan.png'},
    {title: 'Cuci Gudang', img: '../../../public/utils/cucigudang.png'},
    {title: 'Akhir Tahun', img: '../../../public/utils/akhirtahun.png'},
]