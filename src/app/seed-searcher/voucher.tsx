import React, {useEffect, useRef} from "react";
import {vouchers} from "@/const/SeedOptions";

export default function Voucher({voucherName}: { voucherName: string }) {


    const voucherCanvas = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        renderVoucherTest()
    })

    function renderVoucherTest() {
        const voucherData = vouchers.find(voucher => voucher.name === voucherName);
        if (!voucherData) {
            console.error("Voucher not found:", voucherName);
            return;
        }

        const ctx = voucherCanvas.current!.getContext('2d');
        const img = new Image();
        img.src = 'images/Vouchers.png';
        img.onload = function () {
            const voucherWidth = 639 / 9;
            const voucherHeight = 380 / 4;

            ctx!.drawImage(
                img,
                voucherData.pos.x * voucherWidth,
                voucherData.pos.y * voucherHeight,
                voucherWidth,
                voucherHeight,
                0,
                0,
                voucherCanvas.current!.width,
                voucherCanvas.current!.height
            );
        };
    }

    return <>
        <canvas ref={voucherCanvas} width={71} height={95}></canvas>
        <div className='voucherName'>{voucherName}</div>
    </>
}