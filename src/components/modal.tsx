import Portal from "@/components/portal";
import style from "./modal.module.css";
import {ReactNode} from "react";

export default function Modal({children}:{children: ReactNode}) {
    return <Portal>
        <div className={style.modal}>
            <div className='w-full h-full flex items-center justify-center'>
                <div className={'w-full md:w-1/3 h-full md:h-1/3 w-full h-full flex items-center justify-center flex-col'}>
                    <div><span className="loading loading-ring loading-xl"></span></div>
                    <div>{children}</div>
                </div>
            </div>
        </div>
    </Portal>
}