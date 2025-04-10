import React, {useEffect, useRef} from "react";
import {tags} from "@/const/SeedOptions";

export default function Tag({tagName}:{tagName:string}) {

    const tagCanvas = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        renderTag()
    })
    function renderTag() {
        const tagData = tags.find(tag => tag.name === tagName);
        if (!tagData) {
            console.error("Tag not found:", tagName);
            return;
        }

        const ctx = tagCanvas.current!.getContext('2d');
        const img = new Image();
        img.src = 'images/tags.png';
        img.onload = function () {
            const tagWidth = 204 / 6;
            const tagHeight = 170 / 5;

            ctx!.drawImage(
                img,
                tagData.pos.x * tagWidth,
                tagData.pos.y * tagHeight,
                tagWidth,
                tagHeight,
                0,
                0,
                tagCanvas.current!.width,
                tagCanvas.current!.height
            );
        };
    }
    return <>
        <canvas ref={tagCanvas} width={34} height={34}></canvas>
        <div className='tagName'>{tagName}</div>
    </>
}