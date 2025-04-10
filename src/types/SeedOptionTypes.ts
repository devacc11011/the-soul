import {enhancerMap, modifiers, rankMap, sealMap, stickerMap, stickers, suitMap} from "@/const/SeedOptions";

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