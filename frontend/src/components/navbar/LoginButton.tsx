export default function LoginButton({ page, index }: { page: any, index: number }){
    return <a href={page.url} key={index} className="uppercase font-normal text-[14px] md:text-[18px] bg-third py-2 px-[30px] md:px-6 md:rounded-3xl text-primary border-2 border-third hover:brightness-125 hover:md:brightness-100 hover:md:bg-primary hover:md:text-third transition-all">{page.text}</a>
}