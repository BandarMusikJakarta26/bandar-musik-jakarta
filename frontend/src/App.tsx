import { BrowserRouter, Routes, Route } from 'react-router'
import { useEffect, useState } from 'react'

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

import axios from 'axios'
import { checkAdmin, isLogin } from './action/auth.action.ts'

axios.defaults.withCredentials = true

export default function App() {
  const [ login, setLogin ] = useState<boolean>(false) 
  const [ admin, isAdmin ] = useState<boolean>(false) 
  
  async function adminValidation() { isAdmin(await checkAdmin()) }
  async function checkUserLogin() { setLogin(await isLogin()) }
  
  console.log(login)

  useEffect(()=>{
    adminValidation()
    checkUserLogin()
  }, [])
  
  return (
    <div className='w-full bg-primary text-third'> 
      <BrowserRouter>
        <NavMenu/>
        { admin && <NavAdmin/> }
          <div className="main mx-auto w-[84%] pt-[150px] box-border overflow-hidden">
            <Routes>

              <Route path="/" element={<Dashboard/>}/>
              <Route path="/brand" element={<AllBrand/>}/>
              <Route path="/brand/:name" element={<Brand/>}/>

              <Route path="/user/login" element={<Login/>}/>
              <Route path="/user/register" element={<Register/>}/>

              <Route path="/admin/dashboard" element={admin ? <AdminDashboard/> : <BlankPage/>}/>
              <Route path="/admin/brand" element={admin ? <GetBrand/> : <BlankPage/>}/>
              <Route path="/admin/tambah/brand" element={admin ? <AddBrand/> : <BlankPage/> }/>
              <Route path="/admin/tambah/produk" element={admin ? <AddProduct/> : <BlankPage/> }/>

              <Route path='*' element={<BlankPage/>}/>
            </Routes>
          </div>
        <WhatsApp/>
        <Footer/>
      </BrowserRouter>
    </div>

  )
}

