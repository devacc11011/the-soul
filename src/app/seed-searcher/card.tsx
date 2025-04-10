import React, {JSX, useEffect, useRef, useState} from "react";
import {
    editionMap,
    enhancerMap,
    jokers,
    modifiers, rankMap,
    sealMap,
    stickerMap,
    stickers, suitMap,
    tarotsAndPlanets
} from "@/const/SeedOptions";
import {
    CardType,
    ParsedCardItem,
    ImgPosition,
    StickerKey,
    ModifierKey,
    SealKey,
    EnhancerKey, RankKey, SuitKey
} from "@/types/SeedOptionTypes";

export default function Card({itemName}: { itemName: string }) {
    const cardCanvas = useRef<HTMLCanvasElement>(null);
    const {cardName, itemModifiers, itemStickers} = parseCardItem(itemName);
    const type = determineItemType(cardName);
    const [additionalInfo, setAdditionalInfo] = useState(<></>)

    useEffect(() => {
        if (type !== 'unknown') {
            renderCard()
            setAdditionalInfo(<></>)
        } else {
            const {
                rank,
                suit,
                modifiers,
                seal
            } = parseStandardCardName();
            renderStandardCard(rank, suit, modifiers, seal);
            setAdditionalInfo(renderAdditionalInfo(seal))
        }
    },[])

    function renderCard() {
        let itemData;
        let imgSrc;
        let gridWidth;
        let gridHeight;

        if (type === 'joker') {
            itemData = jokers.find(j => j.name === cardName);
            imgSrc = 'images/Jokers.png';
            gridWidth = 10;
            gridHeight = 16;
        } else if (type === 'tarot' || type === 'planet') {
            itemData = tarotsAndPlanets.find(t => t.name === cardName);
            imgSrc = 'images/Tarots.png';
            gridWidth = 10;
            gridHeight = 6;
        }

        if (!itemData) {
            console.error(`${type.charAt(0).toUpperCase() + type.slice(1)} not found:`, cardName);
            return;
        }
        const imageWidth = imgSrc?.includes('Jokers.png') ? 710 : 710; // Width of your images
        const imageHeight = imgSrc?.includes('Jokers.png') ? 1520 : 570; // Height of your images

        const itemWidth = imageWidth / gridWidth!;
        const itemHeight = imageHeight / gridHeight!;

        const ctx = cardCanvas.current!.getContext('2d');
        const img = new Image();
        img.src = imgSrc ?? '';
        img.onload = function () {
            ctx!.drawImage(
                img,
                itemData.pos.x * itemWidth,
                itemData.pos.y * itemHeight,
                itemWidth,
                itemHeight,
                0,
                0,
                cardCanvas.current!.width,
                cardCanvas.current!.height
            );


            const overlayModifier = itemModifiers
                .find((mod): mod is keyof typeof editionMap => ["Foil", "Holographic", "Polychrome"].includes(mod));
            if (overlayModifier) {
                overlayEdition(ctx!, cardCanvas.current!, editionMap[overlayModifier]);
            }

            itemStickers.forEach(stick => {
                if (stickerMap[stick]) {
                    overlaySticker(ctx!, cardCanvas.current!, stickerMap[stick]);
                }
            });

            if (itemModifiers.includes("Negative")) {
                cardCanvas.current!.style.filter = 'invert(0.8)';
            }
        };
    }

    function overlayEdition(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, index: number) {
        const editionImg = new Image();
        editionImg.src = 'images/Editions.png';
        editionImg.onload = function () {
            const editionWidth = editionImg.width / 5;
            const editionHeight = editionImg.height;

            ctx.drawImage(
                editionImg,
                index * editionWidth,
                0,
                editionWidth,
                editionHeight,
                0,
                0,
                canvas.width,
                canvas.height
            );
        };
    }

    function overlaySticker(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, position: ImgPosition) {
        const stickerImg = new Image();
        stickerImg.src = 'images/stickers.png';
        stickerImg.onload = function () {
            const stickerWidth = stickerImg.width / 5;
            const stickerHeight = stickerImg.height / 3;

            ctx.drawImage(
                stickerImg,
                position.x * stickerWidth,
                position.y * stickerHeight,
                stickerWidth,
                stickerHeight,
                0,
                0,
                canvas.width,
                canvas.height
            );
        };
    }

    function parseCardItem(item: string): ParsedCardItem {

        let cardName = item.replace(/^\d+\)/, '').trim();
        const itemModifiers: string[] = [];
        const itemStickers: StickerKey[] = [];

        modifiers.forEach(mod => {
            const regex = new RegExp(`\\b${mod}\\b`, 'i');
            if (regex.test(cardName)) {
                itemModifiers.push(mod);
                cardName = cardName.replace(regex, '').trim();
            }
        });

        stickers.forEach(stick => {
            const regex = new RegExp(`\\b${stick}\\b`, 'i');
            if (regex.test(cardName)) {
                itemStickers.push(stick);
                cardName = cardName.replace(regex, '').trim();
            }
        });

        return {cardName, itemModifiers, itemStickers};
    }

    // Function to determine item type (joker, tarot, or planet)
    function determineItemType(itemName: string): Omit<CardType, 'unknown'> {
        if (jokers.find(j => j.name === itemName)) {
            return 'joker';
        } else if (tarotsAndPlanets.find(tp => tp.name === itemName)) {
            return 'tarot';
        } else {
            return 'unknown';
        }
    }

    function parseStandardCardName(): { rank: RankKey, suit: SuitKey, modifiers: string[], seal: SealKey | null } {
        const sealRegex = /(Purple|Red|Blue|Gold) Seal/;
        const sealMatch = cardName.match(sealRegex);
        const seal = sealMatch ? (sealMatch[0]) as SealKey : null;

        let cleanedCardName = seal ? cardName.replace(sealRegex, '').trim() : cardName;

        const modifierRegex = /(Foil|Holographic|Polychrome|Bonus|Mult|Wild|Glass|Steel|Stone|Gold|Lucky)/g;
        const modifiers = cleanedCardName.match(modifierRegex) || [];

        // Remove all modifiers from the cleaned card name
        cleanedCardName = cleanedCardName.replace(modifierRegex, '').trim();

        const parts = cleanedCardName.split(' of ');
        if (parts.length !== 2) {
            throw new Error(`Invalid card name format${cardName}`);
        }

        const suit = parts[1].trim() as SuitKey;
        const rankPart = parts[0].trim();
        const rank = rankPart.split(' ').pop() as RankKey; // Get the last word as rank

        return {rank, suit, modifiers, seal};
    }

    function renderStandardCard(rank: RankKey, suit: SuitKey, modifiers: string[], seal: SealKey | null) {
        const ctx = cardCanvas.current!.getContext('2d');

        const deckImg = new Image();
        deckImg.src = 'images/8BitDeck.png';
        const enhancersImg = new Image();
        enhancersImg.src = 'images/Enhancers.png';

        const cardWidth = 71;
        const cardHeight = 95;
        const deckWidth = 923;
        const deckHeight = 380;
        const enhancersWidth = 497;
        const enhancersHeight = 475;

        const {x: cardX, y: cardY} = getStandardCardPosition(rank, suit);

        deckImg.onload = function () {
            enhancersImg.onload = function () {
                // Draw the card background
                const enhancerPos = getEnhancerPosition(modifiers);
                ctx!.drawImage(
                    enhancersImg,
                    enhancerPos.x * (enhancersWidth / 7),
                    enhancerPos.y * (enhancersHeight / 5),
                    enhancersWidth / 7,
                    enhancersHeight / 5,
                    0,
                    0,
                    cardWidth,
                    cardHeight
                );

                // Draw the card rank and suit
                ctx!.drawImage(
                    deckImg,
                    cardX * (deckWidth / 13),
                    cardY * (deckHeight / 4),
                    deckWidth / 13,
                    deckHeight / 4,
                    0,
                    0,
                    cardWidth,
                    cardHeight
                );

                // Draw the edition overlay
                const edition = modifiers.find((mod): mod is ModifierKey => ["Foil", "Holographic", "Polychrome"].includes(mod));
                if (edition) {
                    overlayEdition(ctx!, cardCanvas.current!, editionMap[edition]);
                }

                // Draw the seal overlay
                if (seal) {
                    const sealPos = getSealPosition(seal);
                    ctx!.drawImage(
                        enhancersImg,
                        sealPos.x * (enhancersWidth / 7),
                        sealPos.y * (enhancersHeight / 5),
                        enhancersWidth / 7,
                        enhancersHeight / 5,
                        0,
                        0,
                        cardWidth,
                        cardHeight
                    );
                }
            };
            enhancersImg.src = 'images/Enhancers.png';
        };
        deckImg.src = 'images/8BitDeck.png';
    }

    function getStandardCardName() {
        return cardName.replace(/\b(Purple|Red|Blue|Gold) Seal\b/g, '').replace(/\b(Bonus|Mult|Wild|Glass|Steel|Stone|Gold|Lucky)\b/g, '').replace(/\b(Foil|Holographic|Polychrome)\b/g, '').trim();
    }

    function getModifierColor(modifier: string) {
        if (modifier.includes('Seal')) {
            return '#ff80ff'; // Light Purple
        } else if (modifier.includes('Bonus') || modifier.includes('Mult') || modifier.includes('Wild')) {
            return '#ff8080'; // Light Red
        } else if (modifier.includes('Glass') || modifier.includes('Steel') || modifier.includes('Stone') || modifier.includes('Gold') || modifier.includes('Lucky')) {
            return '#8080ff'; // Light Blue
        } else if (modifier.includes('Foil') || modifier.includes('Holographic') || modifier.includes('Polychrome')) {
            return '#80ff80'; // Light Green
        }
        return '#ffffff'; // White (default)
    }

    function getSealPosition(seal: SealKey) {
        return sealMap[seal];
    }

    function getEnhancerPosition(modifiers: string[]) {


        const enhancer = modifiers.find((mod): mod is EnhancerKey => Object.keys(enhancerMap).includes(mod));
        return enhancer ? enhancerMap[enhancer] : {x: 1, y: 0};
    }

    function getStandardCardPosition(rank: RankKey, suit: SuitKey) {
        const x = rankMap[rank];
        const y = suitMap[suit];

        return {x, y};
    }

    //card info
    function renderAdditionalInfo(seal: SealKey | null): JSX.Element {
        return <>
            <div className={'cardName'}></div>
            {
                itemModifiers.map((modifier, index) => (
                    <div className={'modifier'} key={index}
                         color={getModifierColor(modifier)}>
                        {modifier}
                    </div>)
                )
            }
            {
                seal &&
                <div className={'seal'}
                     color={getModifierColor(seal)}>
                    {seal}
                </div>
            }
        </>
    }

    return <>
        <canvas ref={cardCanvas} width={71} height={95}></canvas>
        {type === 'unknown' && <>
            <span className='text-zinc-300 text-sm'>
                {getStandardCardName()}
            </span>
            <span className='text-zinc-300 text-sm'>{additionalInfo}</span>
        </>
        }
    </>
}