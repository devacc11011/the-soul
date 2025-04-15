import Link from "next/link";
import {Poetsen_One} from "next/font/google";

const poetsenOne = Poetsen_One({
    weight: "400",
    variable: "--font-poetsen-one",
    subsets: ["latin"],
});


export default function Logo(){
    return <Link className={`text-base-content font-bold text-lg ${poetsenOne.className}`} href='/'>The Soul</Link>

}