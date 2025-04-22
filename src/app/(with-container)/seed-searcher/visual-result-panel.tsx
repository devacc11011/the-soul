import PhaseTitle from "@/app/PhaseTitle";
import Voucher from "@/app/(with-container)/seed-searcher/voucher";
import Boss from "@/app/(with-container)/seed-searcher/boss";
import Tag from "@/app/(with-container)/seed-searcher/tag";
import Card from "@/app/(with-container)/seed-searcher/card";
import React from "react";
import {ShopItem} from "@/types/SeedOptionTypes";

export default function VisualResultPanel({extractedShopQueues}: { extractedShopQueues: ShopItem[] }) {
  return <>
    <div className="display-container md:col-span-2">
      {
        extractedShopQueues.map(({title, queue, boss, voucher, tags, packs}, index) => {
          return <div className='card bg-base-300 my-2' key={index}>
            <div className={'card-body'}>
              <div className='card-title font-semibold text-accent'>{title}</div>
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
                  <div className={'flex max-w-dvw overflow-x-auto'}>
                    {
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
        })}
    </div>
  </>
}