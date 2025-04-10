import Image from "next/image";

export default function Footer() {
    return (
        <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center my-3">
            <a href='http://github.com/devacc11011'>
                <Image src='/github-mark.png' alt='github logo' width='24' height='24'
                className='inline-block mx-1'/>
                <span className='text-gray-700'>Github</span>
            </a>
        </footer>
    )
}