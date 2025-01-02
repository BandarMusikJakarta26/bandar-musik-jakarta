export default function AllTerbaru(){
    return (
        <div className="terbaru mt-1 px-6">
        <div className="terbaru-text mb-8 flex flex-col items-center md:block">
          <h1 className="text-[60px] md:text-[72px] uppercase font-black tracking-tight">Terbaru</h1>
          <h1 className="text-[16px] md:text-[30px] font-light italic mt-[-14px]">Info terbaru dari Bandar Musik Jakarta</h1>
        </div>
        <div className="terbaru-list grid grid-cols-2 md:grid-cols-3 gap-x-8 md:gap-x-16">
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