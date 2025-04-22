'use client'
import Script from "next/script";
import React, { useState} from "react";
import {AnalSeedConfig, ShopItem} from "@/types/SeedOptionTypes";
import Modal from "@/components/modal";
import SearchModal from "@/app/(with-container)/seed-searcher/search-modal";
import VisualResultPanel from "@/app/(with-container)/seed-searcher/visual-result-panel";
import TextResultPanel from "@/app/(with-container)/seed-searcher/text-result-panel";
import SettingPanel from "@/app/(with-container)/seed-searcher/setting-panel";

export default function SeedSearcher() {

  const [isLoading, setIsLoading] = useState(false);
  const [extractedShopQueues, setExtractedShopQueues] = useState<ShopItem[]>([]);
  const [outputBox, setoutputBox] = useState('');

  function _performAnalysis(seedConfig:AnalSeedConfig) {
    setIsLoading(true);
    setTimeout(() => {
      performAnalysis(seedConfig)
    }, 100)
  }



  function performAnalysis({seedInput,lockOption,cardsPerAnteInput,anteInput,
                             versionSelect,stakeSelect,deckSelect}:AnalSeedConfig) {
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
    for (const key in lockOption) {
      if (!lockOption[key].selected) inst.lock(key)
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
          if (lockOption[Immolate.VOUCHERS.get(i + 1)]) {
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
    setExtractedShopQueues(extractShopQueues(output))
    setIsLoading(false);
  }


  // Function to extract shop queues from the textarea content
  function extractShopQueues(text: string) {
    const shopQueues: ShopItem[] = [];
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




  return (
      <>
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
          <SettingPanel performAnalysis={_performAnalysis}/>
          <TextResultPanel shopQueues={outputBox}/>
          <VisualResultPanel extractedShopQueues={extractedShopQueues} />
          <SearchModal extractedShopQueues={extractedShopQueues}/>
        </div>
        {isLoading && <Modal>Analyzing...</Modal>}
      </>
  )
}