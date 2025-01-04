import { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa6";
import { SlLocationPin } from "react-icons/sl";

export default function About(){
    const [ screen, setScreen ] = useState<number>(window.innerWidth)
    useEffect(()=>setScreen(window.innerWidth), [])

    return (
        <div className="about flex flex-col gap-y-10 md:px-0 px-6">
                <section className="flex flex-col md:flex-row">
                    <div className="text-about md:w-[35%] flex justify-center items-center flex-col my-3 md:my-0">
                        <img src="/utils/BMJLogo.png" alt="Logo BMJ" width={screen <= 768 ? 200 : 480}/>
                    </div>
                    <div className="gambar-about bg-third h-[400px] rounded-tl-[220px] md:rounded-tl-full rounded-tr-[220px] md:rounded-tr-none 
                     md:w-[65%]">
                    </div>
                </section>

                <section className="flex">

                </section>

                <section className="flex items-center gap-x-8 flex-col md:flex-row">
                    <div className="gambar bg-white h-[400px] w-full md:w-[40%]">
                        
                    </div>
                    <div className="information w-full">
                        <h1 className="text-[30px] text-center md:text-left md:text-[48px] font-bold tracking-tight mt-2">Informasi lebih lanjut</h1>
                        <p className="text-center md:text-justify text-[13px] md:text-[16px]">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Harum eveniet id quos architecto culpa voluptates nemo, voluptate blanditiis non, labore aliquam, nesciunt placeat doloremque. Similique, voluptatum tempora. Sapiente, illum autem.</p>

                        <div className="directinfo flex md:gap-x-6 gap-x-4 mt-5">
                            <div className="telephone border-2 border-third px-5 py-4 md:p-6 rounded-3xl flex flex-col md:flex-row gap-x-4">
                                <FaWhatsapp size={60}/>
                                <div className="tulisan mt-2 md:mt-0">
                                    <h1 className="text-[18px] md:text-[24px] font-bold">Hubungi Admin</h1>
                                    <p className="mb-3 text-[14px] md:text-[16px] md:text-justify h-[90px] md:h-auto">untuk menanyakan informasi produk, pemesanan, komplain dan sebagainya</p>
                                    <a href="https://wa.me/62081929290560" target="_blank" className="bg-green-700 text-primary px-8 py-[6px] rounded-3xl hover:brightness-75 text-[12px] md:text-[14px]">Whatsapp</a>
                                </div>
                            </div>

                            <div className="telephone border-2 border-third px-5 py-4 md:p-6 rounded-3xl flex flex-col md:flex-row gap-x-4">
                                <SlLocationPin size={60}/>
                                <div className="tulisan mt-2 md:mt-0">
                                    <h1 className="text-[18px] md:text-[24px] font-bold">Kunjungi Toko</h1>
                                    <p className="mb-3 text-[14px] md:text-[16px] h-[90px] md:h-auto">untuk melakukan cek fisik barang dan pembelian secara langsung</p>
                                    <a href="https://www.google.com/maps/place/Bandar+Musik+Jakarta/@-6.1467131,106.837832,17z/data=!3m1!4b1!4m6!3m5!1s0x2e69f52291955f13:0xa50788e55fe5c9e9!8m2!3d-6.1467131!4d106.837832!16s%2Fg%2F11jr5fpj51?entry=ttu&g_ep=EgoyMDI0MTIxMS4wIKXMDSoASAFQAw%3D%3D" target="_blank" className="bg-teal-600 text-primary px-8 py-[6px] rounded-3xl hover:brightness-75 text-[14px]">Lokasi</a>
                                </div>
                            </div>
                         
                        </div>

                    </div>
                    
                </section>
        </div>
    )
}