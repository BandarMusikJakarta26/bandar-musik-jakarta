import { BrowserRouter, Routes, Route } from 'react-router'

import Login from './pages/login/login.tsx'
import Register from './pages/register/register.tsx'

import Footer from './components/footer/FooterMenu.tsx'
import WhatsApp from './components/callcenter/Whatsapp.tsx'
import NavMenu from './components/navbar/NavMenu.tsx'

import AdminDashboard from './pages/admin/dashboard.tsx'
import AddBrand from './pages/admin/addBrand.tsx'
import GetBrand from './pages/admin/getBrand.tsx'
import NavAdmin from './pages/admin/navbar.tsx'
import AddProduct from './pages/admin/addProduct.tsx'

import Dashboard from './pages/dashboard/dashboard.tsx'
import Brand from './pages/brand/brand.tsx'
import AllBrand from './pages/allBrand/AllBrand.tsx'
import BlankPage from './pages/blank.tsx'

import AddCategory from './pages/admin/addCategory.tsx'
import GetCategory from './pages/admin/getCategory.tsx'
import Kategori from './pages/kategori/kategori.tsx'
import AllKategori from './pages/allKategori/AllKategori.tsx'
import GetProduct from './pages/admin/getProduct.tsx'
import AllTerbaru from './pages/allNewest/AllTerbaru.tsx'
import About from './pages/about/About.tsx'
import AddTerbaru from './pages/admin/addTerbaru.tsx'
import Product from './pages/product/product.tsx'
import { useEffect, useState } from 'react'
import { isLogin } from './action/auth.action.ts'
import axiosClient from '../libs/axiosConfig.ts'
import { isLoginStore } from '../libs/store.ts'
import AddPromo from './pages/admin/addPromo.tsx'
import UpdateProduct from './pages/admin/updateProduct.tsx'

export default function App() {
  const currentLogin = isLoginStore(state=>state.login)
  const [ login, setLogin] = useState<boolean>(false)

  useEffect(()=>{
      async function checkLogin(){ setLogin(await isLogin()) }
      checkLogin()

      async function getAllCookies(){ return await axiosClient.get('/get-cookie')  }
      getAllCookies()
  },[])
      
  return (
    <div className='w-full bg-primary text-third font-poppins'> 
      <BrowserRouter>
        <NavMenu login={login} currentLogin={currentLogin}/>
        <NavAdmin login={login} currentLogin={currentLogin}/>
          <div className="main mx-auto md:w-[84%] pt-[130px] md:pt-[124px] box-border overflow-hidden">
            <Routes>

              <Route path="/" element={<Dashboard/>}/>
              <Route path="/brand" element={<AllBrand/>}/>
              <Route path="/brand/:name" element={<Brand/>}/>
              <Route path="/kategori" element={<AllKategori/>}/>
              <Route path="/kategori/:name" element={<Kategori/>}/>
              <Route path="/terbaru" element={<AllTerbaru/>}/>
              <Route path="/about" element={<About/>}/>
              <Route path="/produk/:name" element={<Product/>}/>
              <Route path="/promo" element={<Product/>}/>

              <Route path="/user/login" element={<Login login={login}/>}/>
              <Route path="/user/register" element={<Register login={login}/>}/>

              <Route path="/admin/dashboard" element={login ? <AdminDashboard/> : <BlankPage/>}/>
              <Route path="/admin/brand" element={login ? <GetBrand/> : <BlankPage/>}/>
              <Route path="/admin/kategori" element={login ? <GetCategory /> : <BlankPage/> }/>
              <Route path="/admin/produk" element={login ? <GetProduct/> : <BlankPage/> }/>
              <Route path="/admin/tambah/brand" element={login ? <AddBrand/> : <BlankPage/>}/>
              <Route path="/admin/tambah/promo" element={login ? <AddPromo/> : <BlankPage/> }/>
              <Route path="/admin/tambah/produk" element={login ? <AddProduct/> : <BlankPage/>}/>
              <Route path="/admin/tambah/kategori" element={login ? <AddCategory/> : <BlankPage/>}/>
              <Route path="/admin/tambah/terbaru" element={login ? <AddTerbaru/> : <BlankPage/>}/>

              <Route path="/admin/update/produk/:url" element={login ? <UpdateProduct/> : <BlankPage/>}/>

              <Route path='*' element={<BlankPage/>}/>
            </Routes>
          </div>
        <WhatsApp/>
        <Footer/>
      </BrowserRouter>
    </div>

  )
}

