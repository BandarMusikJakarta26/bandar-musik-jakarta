export default function SlideShow({ slide }: { slide: any }){
    return (
        <a className='w-full h-[670px] hover:brightness-90 hover:scale-[1.03] transition-all' href={slide.url}>
            <img src={slide.img} alt='gitar' className='relative -z-10' width="100%" height="auto"/>
        </a>
    )
}