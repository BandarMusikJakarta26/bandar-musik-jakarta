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
// import axiosClient from '../libs/axiosConfig.ts'
// import { isLoginStore } from '../libs/store.ts'
import AddPromo from './pages/admin/addPromo.tsx'
import UpdateProduct from './pages/admin/updateProduct.tsx'
import Dashboard from './pages/dashboard/dashboard.tsx'
import { isLoginStore, UsdContext } from '../libs/store.ts'
import PromoPage from './pages/promo/PromoPage.tsx'
import UpdateProductCategory from './pages/admin/UpdateProductCategory.tsx'
import PencarianPage from './pages/pencarian/PencarianPage.tsx'
import UpdateCategory from './pages/admin/UpdateCategory.tsx'

// import axiosClient from '../libs/axiosConfig.ts'

export default function App() {
  const currentLogin = isLoginStore(state=>state.login)
  const [ login, setLogin] = useState<boolean>(false)
  const [ convertUsd, setUsdConverter ] = useState<boolean>(false)

  // async function getAllCookies(){ return await axiosClient.get('/get-cookie') }
  async function checkLogin(){ setLogin(await isLogin()) }

  // useEffect(()=>{ getAllCookies() }, [getAllCookies])
  useEffect(()=>{ checkLogin() },[])
      
  return (

    <UsdContext.Provider value={convertUsd}>

    <div className='w-full bg-primary text-third font-poppins'> 
      <BrowserRouter>
        <NavMenu login={login} currentLogin={currentLogin}  convertUsd={convertUsd} setUsdConverter={setUsdConverter}/>
        <NavAdmin login={login} currentLogin={currentLogin}/>
          <div className="main mx-auto md:w-[84%] pt-[130px] md:pt-[124px] box-border overflow-hidden">
            <Routes>
              <Route path="/" element={<Dashboard/>}/>
              <Route path="/brand" element={<AllBrand/>}/>
              <Route path="/brand/:name" element={<Brand login={login} />}/>
              <Route path="/kategori" element={<AllKategori/>}/>
              <Route path="/kategori/:title" element={<Kategori login={login}/>}/>
              <Route path="/terbaru" element={<AllTerbaru/>}/>
              <Route path="/about" element={<About/>}/>
              <Route path="/produk/:name" element={<Product/>}/>
              <Route path="/promo" element={<PromoPage/>}/>
              <Route path="/pencarian" element={<PencarianPage/>}/>

              <Route path="/user/login" element={<Login login={login}/>}/>
              <Route path="/user/register" element={<Register login={login}/>}/>

              {/* <Route path="/admin/dashboard" element={<AdminDashboard/>}/> */}
              <Route path="/admin/dashboard" element={login ? <AdminDashboard/> : <BlankPage/>}/>
              {/* <Route path="/admin/brand" element={<GetBrand/>}/> */}
              <Route path="/admin/brand" element={login ? <GetBrand/> : <BlankPage/>}/>
              {/* <Route path="/admin/kategori" element={ <GetCategory /> }/> */}
              <Route path="/admin/kategori" element={login ? <GetCategory /> : <BlankPage/> }/>
              {/* <Route path="/admin/produk" element={ <GetProduct/> }/> */}
              <Route path="/admin/produk" element={login ? <GetProduct/> : <BlankPage/>}/>
              {/* <Route path="/admin/tambah/brand" element={ <AddBrand/> }/> */}
              <Route path="/admin/tambah/brand" element={login ? <AddBrand/> : <BlankPage/>}/>
              {/* <Route path="/admin/tambah/promo" element={ <AddPromo/> }/> */}
              <Route path="/admin/tambah/promo" element={login ? <AddPromo/> : <BlankPage/> }/>
              {/* <Route path="/admin/tambah/produk" element={ <AddProduct/> }/> */}
              <Route path="/admin/tambah/produk" element={login ? <AddProduct/> : <BlankPage/>}/>
              {/* <Route path="/admin/tambah/kategori" element={ <AddCategory/> }/> */}
              <Route path="/admin/tambah/kategori" element={login ? <AddCategory/> : <BlankPage/> }/>
              {/* <Route path="/admin/tambah/terbaru" element={ <AddTerbaru/> }/> */}
              <Route path="/admin/tambah/terbaru" element={login ? <AddTerbaru/> : <BlankPage/>}/>

              {/* <Route path="/admin/update/produk/:url" element={ <UpdateProduct/> }/> */}
              <Route path="/admin/update/produk/:url" element={login ? <UpdateProduct/> : <BlankPage/>}/>
              <Route path="/admin/update/category/:title" element={login ? <UpdateCategory/> : <BlankPage/>}/>
              <Route path="/admin/produk/category" element={login ? <UpdateProductCategory/> : <BlankPage/> }/>

              <Route path='*' element={<BlankPage/>}/>
            </Routes>
          </div>
        <WhatsApp/>
        <Footer/>
      </BrowserRouter>
    </div>

    </UsdContext.Provider>
  )
}

