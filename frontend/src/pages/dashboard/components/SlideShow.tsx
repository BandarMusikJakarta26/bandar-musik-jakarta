export default function SlideShow({ slide }: { slide: any }){
    return (
        <a className='w-full hover:brightness-90 hover:scale-[1.03] transition-all' href={slide.url}>
            <img src={slide.img} alt='gitar' className='relative -z-10'/>
        </a>
    )
}