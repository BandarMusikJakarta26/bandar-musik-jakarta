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

import axios from 'axios'
import AddCategory from './pages/admin/addCategory.tsx'
import GetCategory from './pages/admin/getCategory.tsx'
import Kategori from './pages/kategori/kategori.tsx'
import AllKategori from './pages/allKategori/AllKategori.tsx'
import GetProduct from './pages/admin/getProduct.tsx'
import AllTerbaru from './pages/allNewest/AllTerbaru.tsx'
import About from './pages/about/About.tsx'
import AddTerbaru from './pages/admin/addTerbaru.tsx'

axios.defaults.withCredentials = true

export default function App() {
      
  return (
    <div className='w-full bg-primary text-third'> 
      <BrowserRouter>
        <NavMenu/>
        {<NavAdmin/>}
          <div className="main mx-auto md:w-[84%] pt-[136px] md:pt-[150px] box-border overflow-hidden">
            <Routes>

              <Route path="/" element={<Dashboard/>}/>
              <Route path="/brand" element={<AllBrand/>}/>
              <Route path="/brand/:name" element={<Brand/>}/>
              <Route path="/kategori" element={<AllKategori/>}/>
              <Route path="/kategori/:name" element={<Kategori/>}/>
              <Route path="/terbaru" element={<AllTerbaru/>}/>
              <Route path="/about" element={<About/>}/>

              <Route path="/user/login" element={<Login/>}/>
              <Route path="/user/register" element={<Register/>}/>

              <Route path="/admin/dashboard" element={<AdminDashboard/>}/>
              <Route path="/admin/brand" element={<GetBrand/>}/>
              <Route path="/admin/kategori" element={<GetCategory/>}/>
              <Route path="/admin/produk" element={<GetProduct/>}/>
              <Route path="/admin/tambah/brand" element={<AddBrand/>}/>
              <Route path="/admin/tambah/produk" element={<AddProduct/>}/>
              <Route path="/admin/tambah/kategori" element={<AddCategory/>}/>
              <Route path="/admin/tambah/terbaru" element={<AddTerbaru/>}/>

              <Route path='*' element={<BlankPage/>}/>
            </Routes>
          </div>
        <WhatsApp/>
        <Footer/>
      </BrowserRouter>
    </div>

  )
}

