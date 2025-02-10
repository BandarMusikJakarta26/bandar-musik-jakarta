// import BMJBanner from '../../public/utils/BMJLogo.png'
// import useDetectScroll, { Direction } from "@smakss/react-scroll-direction";

// export default function WelcomePage(){
//     const { scrollDir, scrollPosition } = useDetectScroll()

//     console.log(scrollDir)
//     console.log(scrollPosition)

//     addEventListener('scroll', (e)=>{
//         const gambar = document.querySelector('.gambar')! as any
//         let currentScroll = 0
//         if(currentScroll !== 0 && currentScroll > window.scrollY) console.log('Scroll Down!')
//         currentScroll = window.scrollY
//         gambar.width = gambar.width - 10
//     })

//     return (
//         <div className="welcome w-full h-[100vh] flex items-center justify-center">
//             <img src={BMJBanner} className='gambar' />
            
//             <h1 className="text-[100px]">BMJ</h1>
//         </div>
//     )
// }