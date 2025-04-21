import style from "@/app/(with-container)/seed-searcher/page.module.css";
import Image from "next/image";
import searchSvg from "../../../../public/search.svg";
import {Transition} from "@headlessui/react";
import React, {ReactNode, useState} from "react";
import {ShopItem} from "@/types/SeedOptionTypes";

export default function SearchModal({extractedShopQueues}:{extractedShopQueues:ShopItem[]}) {
  const [isShowSearchModal, setShowSearchModal] = useState(false)
  const [searchInput, setSearchInput] = useState('');
  const [searchOuput, setSearchOuput] = useState<ReactNode>([]);

  function handleShowSearchModal() {
    setShowSearchModal(!isShowSearchModal)
  }

  function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchInput(e.target.value);
  }
  function searchCard(): undefined {
    const tempOutput: React.ReactNode[] = [];
    setSearchOuput([])

    for (let i1 = 0; i1 < extractedShopQueues.length; i1++) {
      const item = extractedShopQueues[i1];
      for (let i = 0; i < item.packs.length; i++) {
        const pack = item.packs[i];
        if (pack.includes(searchInput)) {
          tempOutput.push(<li key={`${i1}pack${i}`}>{item.title} {pack}</li>)
        }
      }
      for (let i = 0; i < item.queue.length; i++) {
        const queue = item.queue[i];
        if (queue.includes(searchInput)) {
          tempOutput.push(<li key={`${i1}item${i}`}>{item.title} {queue}</li>)
        }
      }
    }
    setSearchOuput(tempOutput)
  }

  return <>
    <div className={`${style.searchBadge} badge badge-accent`}
         onClick={handleShowSearchModal}>
      <Image src={searchSvg} alt={'search...'}/>
    </div>
    {
      <Transition show={isShowSearchModal}>
        <div
            className={`${style.searchModal} p-3 md:col-span-2 card bg-neutral   
                      transition duration-300 ease-in data-[closed]:opacity-0`}>
          <div className={'join flex justify-center'}>
            <input className={'input join-item'} type='text' value={searchInput}
                   onChange={handleSearchChange} minLength={4} placeholder='Search Card or Pack'/>
            <button className={'btn btn-accent join-item'} onClick={searchCard}>Search</button>
          </div>
          <div className={'overflow-auto'}>
            <h2 className={'text-accent text-lg'}>Search Result</h2>
            <ul className={`text-neutral-content ${style.searchResult} h-full`}>
              {searchOuput}
            </ul>
          </div>
          <div className={'flex justify-end w-full'}>
            <button className={'btn btn-neutral-content'} onClick={handleShowSearchModal}>Close</button>
          </div>
        </div>
      </Transition>
    }
  </>
}