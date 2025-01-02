export default function Terbaru(){
    return (
        <div className="terbaru mt-[70px] mb-[-30px] md:mb-[170px]">
        <div className="terbaru-text mb-8 flex flex-col items-center md:block">
          <h1 className="text-[26px] md:text-[36px] uppercase font-light italic tracking-tight">Apa Yang</h1>
          <h1 className="text-[60px] md:text-[72px] uppercase font-black tracking-tight -mt-[26px] md:-mt-[30px]">Terbaru?</h1>
          <a href={`produk/terbaru`} className="text-[20px] md:text-[24px] border-2 border-third px-10 py-1 md:py-2 hover:bg-third hover:text-primary transition-all">Lihat Semua Terbaru</a>
        </div>
        <div className="terbaru-list md:h-[400px] grid grid-cols-2 gap-x-8  md:gap-x-16">
          <a href="/brand" className="group w-full">
            <img src="/utils/GitarKoleksi.png" alt="" className="md:rounded-[32px] group-hover:brightness-90 transition-all"/>
            <div className="text-blog pt-2">
              <h1 className="text-[21px] md:text-[36px] font-extrabold tracking-tight text-center md:text-left">Edisi Terbatas</h1>
              <p className="text-[14px] md:text-[18px] text-center md:text-justify opacity-80 font-normal">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Et quas deserunt, quaerat placeat consequuntur odit quidem eligendi corrupti ipsam molestias, excepturi ut iure dolor minima ipsum! Suscipit dolor incidunt totam.</p>
            </div>
          </a>

          <a href="/brand" className="group w-full">
            <img src="/utils/GitarKoleksi.png" alt="" className="md:rounded-[32px] group-hover:brightness-90 transition-all"/>
            <div className="text-blog pt-2">
              <h1 className="text-[21px] md:text-[36px] font-extrabold tracking-tight text-center md:text-left">Edisi Terbatas</h1>
              <p className="text-[14px] md:text-[18px] text-center md:text-justify opacity-80 font-normal">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Et quas deserunt, quaerat placeat consequuntur odit quidem eligendi corrupti ipsam molestias, excepturi ut iure dolor minima ipsum! Suscipit dolor incidunt totam.</p>
            </div>
          </a>
        
        </div>
     </div>
    )
}