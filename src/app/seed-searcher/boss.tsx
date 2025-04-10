import {useEffect, useRef} from "react";
import {bosses} from "@/const/SeedOptions";

export default function Boss({bossName}:{bossName:string}) {
    const bossCanvas = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        renderVoucherTest()
    })
    function renderVoucherTest() {
        const bossData = bosses.find(boss => boss.name === bossName);
        if (!bossData) {
            console.error("Boss not found:", bossName);
            return;
        }

        const ctx = bossCanvas.current!.getContext('2d');
        const img = new Image();
        img.src = 'images/BlindChips.png';
        img.onload = function () {
            const bossWidth = 714 / 21;
            const bossHeight = 1054 / 31;

            ctx!.drawImage(
                img,
                bossData.pos.x * bossWidth,
                bossData.pos.y * bossHeight,
                bossWidth,
                bossHeight,
                0,
                0,
                bossCanvas.current!.width,
                bossCanvas.current!.height
            );
        };
    }
    return <canvas ref={bossCanvas} width={34} height={34}></canvas>
}