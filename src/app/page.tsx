import Image from "next/image";
import MainImage from "../../public/main-img.png";
import style from './page.module.css'

export default function Home() {
    return (
    <div className={style.heroContainer}>
        <div className={style.backgroundWrapper}>
            <Image
                src={MainImage}
                alt="Balatro Hero"
                layout="fill"
                objectFit="cover"
                className={style.bgImage}
                priority
            />
            {/* 흐림 + 회색빛 반투명 레이어 */}
            <div className={style.grayOverlay} />
        </div>
        <div className={style.overlayText}>
            A community and seed tracker for Balatro — the fan site for
            <a href={'https://github.com/SpectralPack/TheSoul'} className={'text-red-400'}
            > The-Soul & Immolate</a>
        </div>
    </div>
    );
}
