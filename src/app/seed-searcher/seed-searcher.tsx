'use client'
import Script from "next/script";
import React, {JSX, useState} from "react";
import Voucher from "@/app/seed-searcher/voucher";
import Boss from "@/app/seed-searcher/boss";
import Tag from "@/app/seed-searcher/tag";
import Card from "@/app/seed-searcher/card";
import {deckOption, lockOptions, stakeOption, versionOption} from "@/const/SeedOptions";
import {LockOption} from "@/types/SeedOptionTypes";
import PhaseTitle from "@/app/PhaseTitle";
import Modal from "@/components/modal";

export default function SeedSearcher() {
    const [isOpenCheckboxOverray, setOpenCheckboxOverray] = useState(false);
    const handleOverlay = (onOff?: unknown): undefined => {
        if (typeof onOff !== "boolean") {
            setOpenCheckboxOverray(!isOpenCheckboxOverray)
        } else if (onOff === true) {
            setOpenCheckboxOverray(true)
        } else {
            setOpenCheckboxOverray(false)
        }
    }
    const [isLoading, setIsLoading] = useState(false);
    const [optionsRef, setOptions] = useState<LockOption>(lockOptions);
    const renderedItems: React.ReactElement[] = []
    const handleCheckboxChange = (key: string) => {
        setOptions((prevState) => {
            // 새로운 객체로 복사하여 불변성을 유지함
            const newItem = {
                ...prevState[key],
                selected: !prevState[key].selected
            };
            return {
                ...prevState,
                [key]: newItem,
            };
        });
    };

    Object.values(optionsRef).forEach((item, index) => {
        renderedItems.push(
            <li key={index}>
                <input className='input' type='checkbox' value={item.name}
                       checked={item.selected}
                       onChange={() => handleCheckboxChange(item.name)}/>{item.name}
            </li>
        );
    });// Get references to elements

    const handleUnlock = () => {
        const newOption: LockOption = {}
        Object.entries(lockOptions)
            .map(([key, val]) => {
                newOption[key] = {
                    name: val.name,
                    selected: true
                }
            })
        saveLock(newOption)
    }
    const handleLock = () => {
        const newOption: LockOption = {}
        Object.entries(lockOptions)
            .map(([key, val]) => {
                newOption[key] = {
                    name: val.name,
                    selected: false
                }
            })
        saveLock(newOption)
    }

    const saveLock = (newOptions: LockOption) => {
        setOptions(() => newOptions);
        handleOverlay(false)
    }

    const [seedInput, setseedInput] = useState('ALEEB');

    const handleSeedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setseedInput(e.target.value);
    };
    const [deckSelect, setdeckSelect] = useState<typeof deckOption[number]>(deckOption[0]);
    const [stakeSelect, setstakeSelect] = useState<typeof stakeOption[number]>(stakeOption[0]);
    const [versionSelect, setversionSelect] = useState(versionOption[0].key);
    const [outputBox, setoutputBox] = useState('');
    const [anteInput, setAnte] = useState(39)
    const [cardsPerAnteInput, cardsPerAnte] = useState('50,150,150,150,150,150,150,150,150,150,150,150,150,150,150,150,150,150,150,150,150,150,150,150,150,150,150,150,150,150,150,150,150,150,150,150,150,150,150');

    const handleStakeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setstakeSelect(e.target.value as typeof stakeOption[number]);
    }
    const handleDeckSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setdeckSelect(e.target.value as typeof deckOption[number]);
    }
    const handleAnteInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAnte(e.target.value as unknown as number);
    }
    const handleCardsPerAnte = (e: React.ChangeEvent<HTMLInputElement>) => {
        cardsPerAnte(e.target.value);
    }
    const handleVersionSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setversionSelect(e.target.value as unknown as number);
    }

    function _performAnalysis() {
        setIsLoading(true);
        setTimeout(() => {
            performAnalysis()
        }, 100)
    }

    function performAnalysis() {
        setIsLoading(true);
        // Get input values
        const ante = anteInput;
        const cardsPerAnte = cardsPerAnteInput.split(',').map(Number);
        const deck = deckSelect;
        const stake = stakeSelect;
        const version = versionSelect;
        const seed = seedInput.toUpperCase().replace(/0/g, 'O');

        let output = "";

        // It's analysis time!
        // @ts-expect-error Emscripten error possible
        const inst = new Immolate.Instance(seed);
        // @ts-expect-error Emscripten error possible
        inst.params = new Immolate.InstParams(deck, stake, false, version);
        inst.initLocks(1, false, false);
        inst.lock("Overstock Plus");
        inst.lock("Liquidation");
        inst.lock("Glow Up");
        inst.lock("Reroll Glut");
        inst.lock("Omen Globe");
        inst.lock("Observatory");
        inst.lock("Nacho Tong");
        inst.lock("Recyclomancy");
        inst.lock("Tarot Tycoon");
        inst.lock("Planet Tycoon");
        inst.lock("Money Tree");
        inst.lock("Antimatter");
        inst.lock("Illusion");
        inst.lock("Petroglyph");
        inst.lock("Retcon");
        inst.lock("Palette");
        for (const key in optionsRef) {
            if (!optionsRef[key].selected) inst.lock(key)
        }
        inst.setStake(stake);
        inst.setDeck(deck);
        // let ghostDeck = (deck == "Ghost Deck");
        for (let a = 1; a <= ante; a++) {
            inst.initUnlocks(a, false);
            output += "==ANTE " + a + "==\n"
            output += "Boss: " + inst.nextBoss(a) + "\n";
            const voucher = inst.nextVoucher(a);
            output += "Voucher: " + voucher + "\n";
            inst.lock(voucher);
            // Unlock next level voucher
            for (let i = 0; i < Immolate.VOUCHERS.size(); i += 2) {
                if (Immolate.VOUCHERS.get(i) == voucher) {
                    // Only unlock it if it's unlockable
                    if (optionsRef[Immolate.VOUCHERS.get(i + 1)]) {
                        inst.unlock(Immolate.VOUCHERS.get(i + 1));
                    }
                }
            }
            output += "Tags: " + inst.nextTag(a) + ", " + inst.nextTag(a) + "\n";

            output += "Shop Queue: \n";
            for (let q = 1; q <= cardsPerAnte[a - 1]; q++) {
                output += q + ") ";
                const item = inst.nextShopItem(a);
                if (item.type == "Joker") {
                    if (item.jokerData.stickers.eternal) output += "Eternal ";
                    if (item.jokerData.stickers.perishable) output += "Perishable ";
                    if (item.jokerData.stickers.rental) output += "Rental ";
                    if (item.jokerData.edition != "No Edition") output += item.jokerData.edition + " ";
                }
                output += item.item + "\n";
                item.delete();
            }

            output += "\nPacks: \n";
            const numPacks = (a == 1) ? 4 : 6;
            for (let p = 1; p <= numPacks; p++) {
                const pack = inst.nextPack(a);
                output += pack + " - ";
                const packInfo = Immolate.packInfo(pack);
                if (packInfo.type == "Celestial Pack") {
                    const cards = inst.nextCelestialPack(packInfo.size, a);
                    for (let c = 0; c < packInfo.size; c++) {
                        output += cards.get(c);
                        output += (c + 1 != packInfo.size) ? ", " : "";
                    }
                    cards.delete();
                }
                if (packInfo.type == "Arcana Pack") {
                    const cards = inst.nextArcanaPack(packInfo.size, a);
                    for (let c = 0; c < packInfo.size; c++) {
                        output += cards.get(c);
                        output += (c + 1 != packInfo.size) ? ", " : "";
                    }
                    cards.delete();
                }
                if (packInfo.type == "Spectral Pack") {
                    const cards = inst.nextSpectralPack(packInfo.size, a);
                    for (let c = 0; c < packInfo.size; c++) {
                        output += cards.get(c);
                        output += (c + 1 != packInfo.size) ? ", " : "";
                    }
                    cards.delete();
                }
                if (packInfo.type == "Buffoon Pack") {
                    const cards = inst.nextBuffoonPack(packInfo.size, a);
                    for (let c = 0; c < packInfo.size; c++) {
                        const joker = cards.get(c);
                        if (joker.stickers.eternal) output += "Eternal ";
                        if (joker.stickers.perishable) output += "Perishable ";
                        if (joker.stickers.rental) output += "Rental ";
                        if (joker.edition != "No Edition") output += joker.edition + " ";
                        output += joker.joker;
                        joker.delete();
                        output += (c + 1 != packInfo.size) ? ", " : "";
                    }
                    cards.delete();
                }
                if (packInfo.type == "Standard Pack") {
                    const cards = inst.nextStandardPack(packInfo.size, a);
                    for (let c = 0; c < packInfo.size; c++) {
                        const card = cards.get(c);
                        if (card.seal != "No Seal") output += card.seal + " ";
                        if (card.edition != "No Edition") output += card.edition + " ";
                        if (card.enhancement != "No Enhancement") output += card.enhancement + " ";
                        const rank = card.base[2];
                        if (rank == "T") output += "10";
                        else if (rank == "J") output += "Jack";
                        else if (rank == "Q") output += "Queen";
                        else if (rank == "K") output += "King";
                        else if (rank == "A") output += "Ace";
                        else output += rank;
                        output += " of ";
                        const suit = card.base[0];
                        if (suit == "C") output += "Clubs";
                        else if (suit == "S") output += "Spades";
                        else if (suit == "D") output += "Diamonds";
                        else if (suit == "H") output += "Hearts";
                        card.delete();
                        output += (c + 1 != packInfo.size) ? ", " : "";
                    }
                    cards.delete();
                }
                output += "\n";
            }

            output += "\n";
        }

        inst.delete();

        // Update output box with analysis result
        setoutputBox(() => output)
        displayShopQueues(output);
        setIsLoading(false);
    }

    // useEffect(() => {
    // }, [outputBox]);


    type shopItem = {
        title: string, queue: string[], boss: string, voucher: string, tags: string[], packs: string[]
    }

    // Function to extract shop queues from the textarea content
    function extractShopQueues(text: string) {
        const shopQueues: shopItem[] = [];
        const regex = /==ANTE \d+==[\s\S]*?(?=(?:==ANTE \d+==|$))/g;
        const matches = text.match(regex);

        if (matches) {
            matches.forEach(match => {
                const titleMatch = match.match(/==ANTE \d+==/);
                const title = titleMatch ? titleMatch[0] : 'Untitled';
                const bossMatch = match.match(/Boss: (.+)/);
                const voucherMatch = match.match(/Voucher: (.+)/);
                const tagsMatch = match.match(/Tags: (.+)/);
                const queueMatch = match.match(/Shop Queue:([\s\S]*?)(?=Packs:|$)/);
                const packsMatch = match.match(/Packs:([\s\S]*?)(?=(?:==ANTE \d+==|$))/);

                const boss = bossMatch ? bossMatch[1].trim() : '';
                const voucher = voucherMatch ? voucherMatch[1].trim() : '';
                const tags = tagsMatch ? tagsMatch[1].trim().split(',').map(tag => tag.trim()) : [];
                const queue = queueMatch ? queueMatch[1].trim().split('\n').filter(item => item.trim() !== '') : [];
                const packs = packsMatch ? packsMatch[1].trim().split('\n').filter(item => item.trim() !== '') : [];

                shopQueues.push({title, queue, boss, voucher, tags, packs});
            });
        }

        return shopQueues;
    }

    // Function to separate card names, modifiers, and stickers


    const [displayElement, setDisplayElement] = useState<JSX.Element[]>()


    // Function to create and display the side-scrolling list
    function displayShopQueues(ouput: string) {
        const shopQueues = extractShopQueues(ouput);
        const shopQueueDisplay: JSX.Element[] = shopQueues.map(({title, queue, boss, voucher, tags, packs}, index) => {
            return <div className='card bg-base-300 my-2' key={index}>
                <div className={'card-body'}>
                    <div className='card-title font-semibold min-w-lvh text-info'>{title}</div>
                    <div className='queueInfo card-actions'>
                        <div>
                            <PhaseTitle>Voucher</PhaseTitle>
                            {
                                voucher && (
                                    <div className='voucherContainer'>
                                        <Voucher voucherName={voucher}/>
                                    </div>
                                )
                            }
                        </div>
                        <div className='bossElement'>
                            <PhaseTitle>Boss</PhaseTitle>
                            {
                                boss && <div className='bossContainer'>
                                    <Boss bossName={boss}></Boss>
                                </div>
                            }
                        </div>
                        <div>
                            <PhaseTitle>Tags</PhaseTitle>
                            <div className={'flex max-w-dvw overflow-x-auto'}>                            {
                                tags.map((tag, index) =>
                                    <Tag tagName={tag} key={index}/>
                                )
                            }
                            </div>
                        </div>
                    </div>
                    <div className={'flex max-w-dvw overflow-x-auto'}>
                        {
                            queue.map((item, index) => {
                                return (
                                    <div className={'queueItem'} key={index}>
                                        <Card itemName={item} key={index}/>
                                    </div>
                                )
                            })
                        }
                    </div>
                    {
                        packs.length > 0 &&
                        <>
                            <div className='queueTitle'>
                                ==Packs==
                            </div>
                            <div className='packsContainer'>
                                {
                                    packs.map((pack, index) => {
                                        const packItems = pack.split(' - ');
                                        const packName = packItems[0];
                                        const packCards = packItems[1] ? packItems[1].split(', ') : [];
                                        return <div className={'packName'} key={index}>{packName + ': '}
                                            <div className={'flex max-w-dvw overflow-x-auto'}>
                                                {
                                                    packCards.map((cardName, index) =>
                                                        <Card itemName={cardName} key={`${cardName}${index}`}/>
                                                    )
                                                }
                                            </div>
                                        </div>
                                    })
                                }
                            </div>
                        </>
                    }
                </div>
            </div>
        });
        setDisplayElement(() => shopQueueDisplay)

        // Add draggable scrolling functionality

    }


    return (<>
            <Script src="/immolate.js" strategy="lazyOnload"/>
            <Script id="module-init" strategy="lazyOnload">
                {`
                    console.log('wasm loaded')
                    let instantAnalysis = false;
                    let Immolate = {
                        onRuntimeInitialized: function() {
                            if (instantAnalysis) {
                                performAnalysis();
                            }
                        }
                    };

                    // Helper function for vectors
                    function asVector(arr) {
                      let vectorInt = new Module.VectorStr();
                      for (let i = 0; i < arr.length; i++) {
                        vectorInt.push_back(arr[i]);
                      }
                      return vectorInt;
                    }
                `}
            </Script>
            <div className="grid grid-cols-1 md:grid-cols-2  gap-2">
                {/*setting*/}
                <div className="card bg-base-300 p-3">
                    <h1 className='text-accent font-semibold'>Settings</h1>
                    <label className='label' htmlFor="seed">Seed</label>
                    <input className='input' type="text" maxLength={8} pattern="[A-Z1-9]{1,8}" required
                           value={seedInput}
                           onChange={handleSeedChange}/>
                    <br/>
                    <label className='label' htmlFor="ante">Max Ante:</label>
                    <input className='input' type="number" value={anteInput} onChange={handleAnteInput} min="1"
                           max="999" required/>
                    <br/>
                    <label className='label' htmlFor="cardsPerAnte">Cards per Ante:</label>
                    <input className='input' type="text" id="cardsPerAnte"
                           value={cardsPerAnteInput}
                           onChange={handleCardsPerAnte}
                           required/>
                    <br/>
                    <label className='label' htmlFor="deck">Deck:</label>
                    <select className='select' required onChange={handleDeckSelect}
                            value={deckSelect}>
                        {
                            deckOption.map((option) =>
                                <option key={option} value={option}>{option}</option>
                            )
                        }
                    </select>
                    <br/>
                    <label className='label' htmlFor="stake">Stake:</label>
                    <select className='select' value={stakeSelect} required onChange={handleStakeSelect}>
                        {
                            stakeOption.map((option, index) =>
                                <option key={index} value={option}>{option}</option>
                            )
                        }
                    </select>
                    <br/>
                    <label className='label' htmlFor="version">Version:</label>
                    <select className='select' id="version" required
                            value={versionSelect}
                            onChange={handleVersionSelect}>
                        {
                            versionOption.map((option) =>
                                <option key={option.key} value={option.key}>{option.name}</option>
                            )
                        }
                    </select>
                    <br/>
                    <button className='btn btn-primary btn-outline' onClick={handleOverlay}>Modify Unlocks</button>
                    {isOpenCheckboxOverray && <div>
                        <div className='flex'>
                            <button className='btn btn-secondary grow m-1' onClick={handleUnlock}>Unlock All</button>
                            <button className='btn btn-secondary grow m-1' onClick={handleLock}>Lock All</button>
                        </div>
                        <div id="checkboxesPopup">
                            <h2>Unlocked Items</h2>
                            <ul className='list-group'>
                                {/*{renderedItems}*/}
                                {Object.entries(optionsRef).map(([key, data]) => (
                                    <li key={key}>
                                        <input className='checkbox'
                                               type="checkbox"
                                               id={key}
                                               checked={optionsRef[key].selected}
                                               onChange={() => handleCheckboxChange(key)}
                                        />
                                        {/* JSX에서는 label의 for 속성이 아니라 htmlFor를 사용해야 함 */}
                                        <label className='label' htmlFor={key}>{data.name}</label>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>}
                    <br/>
                    <button onClick={_performAnalysis} className={'btn btn-primary'}>Analyze</button>
                </div>
                {/*search result*/}
                <div className="card bg-base-300 p-3">
                    <h1 className='text-accent font-semibold'>Output</h1>
                    <textarea value={outputBox} rows={16} readOnly
                              className='textarea w-full h-full whitespace-pre-wrap'></textarea>
                </div>
                {/*visual result*/}
                <div className="display-container md:col-span-2">
                    {displayElement}
                </div>
            </div>
            {isLoading && <Modal>Analyzing...</Modal>}
        </>
    )
}