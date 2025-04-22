import {
    deckOption,
    enhancerMap,
    modifiers,
    rankMap,
    sealMap,
    stakeOption,
    stickerMap,
    stickers,
    suitMap
} from "@/const/SeedOptions";

export type LockOption = {
    [key: string]: { name: string, selected: boolean }
}
export type CardType = 'joker' | 'tarot' | 'planet' | 'unknown'

export type ParsedCardItem = { cardName: string, itemModifiers: string[], itemStickers: Array<keyof typeof stickerMap> }

export type ImgPosition = {
    x:number,
    y:number
}
export type SealKey = keyof typeof sealMap
export type EnhancerKey = keyof typeof enhancerMap
export type RankKey = keyof typeof rankMap
export type SuitKey = keyof typeof suitMap
export type ModifierKey = typeof modifiers[number]
export type StickerKey = typeof stickers[number]
export type StickerMap = Record<StickerKey, ImgPosition>
export type ShopItem = {
    title: string, queue: string[], boss: string, voucher: string, tags: string[], packs: string[]
}
export type SeedConfig = {
    [key: string]: {
        deckSelect: typeof deckOption[number]
        stakeSelect: typeof stakeOption[number]
        versionSelect: number
        anteInput: number
        cardsPerAnteInput: string
        lockOption: LockOption,
        createdTime: number
    }
}

export type AnalSeedConfig =  Omit<SeedConfig[string],'createdTime'> & {seedInput:string}
