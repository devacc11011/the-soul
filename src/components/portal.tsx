import {ReactNode} from 'react';
import ReactDOM from 'react-dom';
import style from './modal.module.css'
interface IPortalProps {
    children: ReactNode;
}

function Portal({children}: IPortalProps) {
    const element = typeof window !== 'undefined' && document.querySelector(`#portal`);

    return element && children ? ReactDOM.createPortal(children, element) : null
}

export default Portal;