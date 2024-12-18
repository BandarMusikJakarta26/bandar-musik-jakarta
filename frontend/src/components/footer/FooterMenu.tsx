import { FaInstagram } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";

const brands = [
    { url: '/produk/brand/martin', text:'Martin' },
    { url: '/produk/brand/gibson', text:'Gibson' },
    { url: '/produk/brand/scorpion', text:'Scorpion' },
    { url: '/produk/brand/squier', text:'Squier' },
    { url: '/produk/brand/takamine', text:'Takamine' },
    { url: '/produk/brand/lava', text:'Lava' },
    { url: '/produk/brand/enya', text:'Enya' },
    { url: '/produk/brand/cort', text:'Cort' },
]

export default function Footer(){

function ShowBrand(){
    return brands.map((brand, index)=>{
        return (
            <li key={index}><a href={brand.url} className="opacity-60 hover:opacity-100 transition-all">{brand.text}</a></li>
        )
    })
}

    return (
        <div className="w-full bg-third py-12 px-[160px] text-primary mt-20 flex flex-col">
            <div className="footer-top w-full h-full grid grid-cols-3 gap-x-4 items-center justify-between">
                <div className="gambar">
                    <img src={'/utils/BMJLogoFooter.png'} alt="bandarmusikjakartalogo" className="w-[240px]"/>
                </div>
                <div className="informasi flex flex-col items-center justify-center cursor-pointer">
                    <a className="text-[22px] font-thin opacity-60 hover:opacity-100 transition-all" href="https://google.com/maps/place/Bandar+Musik+Jakarta/@-6.1467131,106.837832,17z/data=!3m1!4b1!4m6!3m5!1s0x2e69f52291955f13:0xa50788e55fe5c9e9!8m2!3d-6.1467131!4d106.837832!16s%2Fg%2F11jr5fpj51?entry=ttu&g_ep=EgoyMDI0MTIxMS4wIKXMDSoASAFQAw%3D%3D" target="_blank">Jl Rajawali Selatan 1 no.26a</a>
                    <p className="text-[18px] font-thin italic opacity-60 ">081929290560</p>
                </div>
                <div className="medsos flex justify-end items-center gap-x-4">
                        <a href={'https://www.instagram.com/bandarmusikjakarta_bmj/'} target="_blank" className="opacity-60 hover:opacity-100 transition-all">
                            <FaInstagram size={30} color="#eee"/>
                        </a>
                        <a href={'/'} className="opacity-60 hover:opacity-100 transition-all">
                            <FaFacebookF size={26} color="#eee"/>
                        </a>
                </div>
            </div>
            <div className="tautan gap-x-8 grid grid-cols-2 mt-16">
                <div className="brand">
                    <h1 className="text-[16px] uppercase font-semibold">Brand</h1>
                    <ul className="text-[13px] grid grid-cols-3">
                        <ShowBrand/>
                        <ShowBrand/>
                        <ShowBrand/>
                    </ul>
                </div>
                <div className="kategori">
                    <h1 className="text-[16px] uppercase font-semibold">Kategori</h1>
                    <ul className="text-[13px] grid grid-cols-3">
                        <ShowBrand/>
                        <ShowBrand/>
                        <ShowBrand/>
                    </ul>
                </div>
            </div>
            <div className="garis py-[1px] bg-primary w-full my-12"></div>
            <p className="text-center text-[14px] opacity-60">Hak Cipta 2025 BANDAR MUSIK JAKARTA</p>
        </div>
    )
}