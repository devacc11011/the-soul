import Image from "next/image";
import GitHubImage from "../../public/github-mark-white.svg";

export default function Footer() {
    return (
        <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center my-3">
            <a href='http://github.com/devacc11011'>
                <Image src={GitHubImage} alt='github logo' width='24' height='24'
                       className='inline-block mx-1 fill-error'/>
                <span className='text-neutral-content'>Github</span>
            </a>
        </footer>
    )
}