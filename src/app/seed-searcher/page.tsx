'use client'
import Script from "next/script";
import React, { useState} from "react";

type option = {
    [key: string]: { name: string, selected: boolean }
}
export default function SeedSearcher() {
    const [isOpenCheckboxOverray, setOpenCheckboxOverray] = useState(false);
    const handleOverlay = () => {
        setOpenCheckboxOverray(!isOpenCheckboxOverray)
    }
    const options: option = {
        "Negative Tag": {name: "Negative Tag", selected: false},
        "Foil Tag": {name: "Foil Tag", selected: false},
        "Holographic Tag": {name: "Holographic Tag", selected: false},
        "Polychrome Tag": {name: "Polychrome Tag", selected: false},
        "Rare Tag": {name: "Rare Tag", selected: false},
        "Golden Ticket": {name: "Golden Ticket", selected: false},
        "Mr. Bones": {name: "Mr. Bones", selected: false},
        "Acrobat": {name: "Acrobat", selected: false},
        "Sock and Buskin": {name: "Sock and Buskin", selected: false},
        "Swashbuckler": {name: "Swashbuckler", selected: false},
        "Troubadour": {name: "Troubadour", selected: false},
        "Certificate": {name: "Certificate", selected: false},
        "Smeared Joker": {name: "Smeared Joker", selected: false},
        "Throwback": {name: "Throwback", selected: false},
        "Hanging Chad": {name: "Hanging Chad", selected: false},
        "Rough Gem": {name: "Rough Gem", selected: false},
        "Bloodstone": {name: "Bloodstone", selected: false},
        "Arrowhead": {name: "Arrowhead", selected: false},
        "Onyx Agate": {name: "Onyx Agate", selected: false},
        "Glass Joker": {name: "Glass Joker", selected: false},
        "Showman": {name: "Showman", selected: false},
        "Flower Pot": {name: "Flower Pot", selected: false},
        "Blueprint": {name: "Blueprint", selected: false},
        "Wee Joker": {name: "Wee Joker", selected: false},
        "Merry Andy": {name: "Merry Andy", selected: false},
        "Oops! All 6s": {name: "Oops! All 6s", selected: false},
        "The Idol": {name: "The Idol", selected: false},
        "Seeing Double": {name: "Seeing Double", selected: false},
        "Matador": {name: "Matador", selected: false},
        "Hit the Road": {name: "Hit the Road", selected: false},
        "The Duo": {name: "The Duo", selected: false},
        "The Trio": {name: "The Trio", selected: false},
        "The Family": {name: "The Family", selected: false},
        "The Order": {name: "The Order", selected: false},
        "The Tribe": {name: "The Tribe", selected: false},
        "Stuntman": {name: "Stuntman", selected: false},
        "Invisible Joker": {name: "Invisible Joker", selected: false},
        "Brainstorm": {name: "Brainstorm", selected: false},
        "Satellite": {name: "Satellite", selected: false},
        "Shoot the Moon": {name: "Shoot the Moon", selected: false},
        "Driver's License": {name: "Driver's License", selected: false},
        "Cartomancer": {name: "Cartomancer", selected: false},
        "Astronomer": {name: "Astronomer", selected: false},
        "Burnt Joker": {name: "Burnt Joker", selected: false},
        "Bootstraps": {name: "Bootstraps", selected: false},
        "Overstock Plus": {name: "Overstock Plus", selected: false},
        "Liquidation": {name: "Liquidation", selected: false},
        "Glow Up": {name: "Glow Up", selected: false},
        "Reroll Glut": {name: "Reroll Glut", selected: false},
        "Omen Globe": {name: "Omen Globe", selected: false},
        "Observatory": {name: "Observatory", selected: false},
        "Nacho Tong": {name: "Nacho Tong", selected: false},
        "Recyclomancy": {name: "Recyclomancy", selected: false},
        "Tarot Tycoon": {name: "Tarot Tycoon", selected: false},
        "Planet Tycoon": {name: "Planet Tycoon", selected: false},
        "Money Tree": {name: "Money Tree", selected: false},
        "Antimatter": {name: "Antimatter", selected: false},
        "Illusion": {name: "Illusion", selected: false},
        "Petroglyph": {name: "Petroglyph", selected: false},
        "Retcon": {name: "Retcon", selected: false},
        "Palette": {name: "Palette", selected: false},
    }
    const deckOption = [
        "Red Deck",
        "Blue Deck",
        "Yellow Deck",
        "Green Deck",
        "Black Deck",
        "Magic Deck",
        "Nebula Deck",
        "Ghost Deck",
        "Abandoned Deck",
        "Checkered Deck",
        "Zodiac Deck",
        "Painted Deck",
        "Anaglyph Deck",
        "Plasma Deck",
        "Erratic Deck",
    ] as const

    const stakeOption = [
        "White Stake",
        "Red Stake",
        "Green Stake",
        "Black Stake",
        "Blue Stake",
        "Purple Stake",
        "Orange Stake",
        "Gold Stake"
    ] as const

    const versionOption = [
        {key: 10106, name: "1.0.1f"},
        {key: 10103, name: "1.0.1c"},
        {key: 10014, name: "1.0.0n"}
    ]
    const [optionsRef, setOptions] = useState<option>(options);
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
                <input type='checkbox' value={item.name}
                       checked={item.selected}
                       onChange={() => handleCheckboxChange(item.name)}/>{item.name}
            </li>
        );
    });// Get references to elements

    const submit = () => {
        const selectedOptions = Object.values(optionsRef)
            .filter((option) => option.selected)
            .map(value => value.name);
        console.log(selectedOptions)
        handleOverlay()
    }
    const handleUnlock = () => {
        setOptions(prevState => {
            const newOption: option = {}
            Object.keys(prevState)
                .forEach(value => {
                    newOption[value] = {
                        name: prevState[value].name,
                        selected: true
                    }
                })
            return newOption
        })
    }
    const handleLock = () => {
        setOptions(prevState => {
            const newOption: option = {}
            Object.keys(prevState)
                .forEach(value => {
                    newOption[value] = {
                        name: prevState[value].name,
                        selected: false
                    }
                })
            return newOption
        })
    }
    const [seedInput, setseedInput] = useState('seed');

    const handleSeedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setseedInput(e.target.value);
    };
    const [deckSelect, setdeckSelect] = useState<typeof deckOption[number]>(deckOption[0]);
    const [stakeSelect, setstakeSelect] = useState<typeof stakeOption[number]>(stakeOption[0]);
    const [versionSelect, setversionSelect] = useState(versionOption[2].key);
    const [outputBox, setoutputBox] = useState('');
    const [anteInput, setAnte] = useState(39)
    const [cardsPerAnteInput, cardsPerAnte] = useState('50,150,150,150,150,150,150,150,150,150,150,150,150,150,150,150,150,150,150,150,150,150,150,150,150,150,150,150,150,150,150,150,150,150,150,150,150,150,150,150,150,150');

    const handleStakeSelect = (e:React.ChangeEvent<HTMLSelectElement>) => {
        setstakeSelect(e.target.value as typeof stakeOption[number]);
    }
    const handleDeckSelect = (e:React.ChangeEvent<HTMLSelectElement>) => {
        setdeckSelect(e.target.value as typeof deckOption[number]);
    }
    const handleAnteInput = (e:React.ChangeEvent<HTMLInputElement>) => {
        setAnte(e.target.value as unknown as number);
    }
    const handleCardsPerAnte = (e:React.ChangeEvent<HTMLInputElement>) => {
        cardsPerAnte(e.target.value);
    }
    const handleVersionSelect = (e:React.ChangeEvent<HTMLSelectElement>) => {
        setversionSelect(e.target.value as unknown as number);
    }

    function performAnalysis() {
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
                    ;
                }
                ;
            }
            ;
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
        ;

        inst.delete();

        // Update output box with analysis result
        setoutputBox(() => output)
    }

    return (<>
            <Script id="module-init" strategy="beforeInteractive">
                {`
                    console.log('hi')
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
            <Script src="/immolate.js" strategy="beforeInteractive"/>
            <div className="container">
                <div className="input-section">
                    <h2>Settings</h2>
                    <label htmlFor="seed">Seed:</label>
                    <input type="text" maxLength={8} pattern="[A-Z1-9]{1,8}" required value={seedInput}
                           onChange={handleSeedChange}/>
                    <br/>
                    <label htmlFor="ante">Max Ante:</label>
                    <input type="number" value={anteInput} onChange={handleAnteInput} min="1" max="999" defaultValue="8" required/>
                    <br/>
                    <label htmlFor="cardsPerAnte">Cards per Ante:</label>
                    <input type="text" id="cardsPerAnte"
                           value={cardsPerAnteInput}
                           onChange={handleCardsPerAnte}
                           defaultValue="15,50,50,50,50,50,50,50" required/>
                    <br/>
                    <label htmlFor="deck">Deck:</label>
                    <select required onChange={handleDeckSelect}
                            value={deckSelect}>
                        {
                            deckOption.map((option) =>
                                <option key={option} value={option}>{option}</option>
                            )
                        }
                    </select>
                    <br/>
                    <label htmlFor="stake">Stake:</label>
                    <select value={stakeSelect} required onChange={handleStakeSelect}>
                        {
                            stakeOption.map((option) =>
                                <option key={option} value={option}>{option}</option>
                            )
                        }
                    </select>
                    <br/>
                    <label htmlFor="version">Version:</label>
                    <select id="version" required
                    value={versionSelect}
                    onChange={handleVersionSelect}>
                        {
                            versionOption.map((option) =>
                                <option key={option.key} value={option.key}>{option.name}</option>
                            )
                        }
                    </select>
                    <br/>
                    <button onClick={handleOverlay}>Modify Unlocks</button>
                    {isOpenCheckboxOverray && <div>
                        <div id="checkboxesPopup">
                            <h2>Unlocked Items</h2>
                            <div className="clearfix">
                                {/*{renderedItems}*/}
                                {Object.entries(optionsRef).map(([key, data]) => (
                                    <div key={key}>
                                        <input
                                            type="checkbox"
                                            id={key}
                                            checked={optionsRef[key].selected}
                                            onChange={() => handleCheckboxChange(key)}
                                        />
                                        {/* JSX에서는 label의 for 속성이 아니라 htmlFor를 사용해야 함 */}
                                        <label htmlFor={key}>{data.name}</label>
                                    </div>
                                ))}
                            </div>
                            <button onClick={submit}>Submit</button>
                            <button onClick={handleUnlock}>Unlock All</button>
                            <button onClick={handleLock}>Lock All</button>
                        </div>
                    </div>}
                    <br/>
                    <button onClick={performAnalysis}>Analyze</button>
                    <button id="copyButton">Copy Link</button>
                </div>
                <div className="output-section">
                    <h2>Output</h2>
                    <textarea value={outputBox} rows={16} readOnly></textarea>
                    <br/>
                    <button id="downloadButton" style={{fontSize: '2px'}}>Download</button>
                </div>
            </div>
        </>
    )
}