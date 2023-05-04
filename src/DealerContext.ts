import { CardStyle } from './types/CardStyle'
import { CardValue } from './types/CardValue'
import { DeckType, NemesisDeckType } from './types/DeckType'
import { createContext } from 'react'

export const DealerContext = createContext({
  baseDeck: 'twoplayer' as DeckType,
  setBaseDeck: (dt: DeckType) => {
    return
  },
  nemesisDeck: 'base' as NemesisDeckType,
  setNemesisDeck: (nd: NemesisDeckType) => {
    return
  },
  cardStyle: 'cracks' as CardStyle,
  setCardStyle: (cs: CardStyle) => {
    return
  },
  deck: [] as CardValue[],
  setDeck: (cv: CardValue[]) => {
    return
  },
  deckIndex: 0,
  setDeckIndex: (n: number) => {
    return
  },
  menuVisible: false,
  setMenuVisible: (mv: boolean) => {
    return
  },
  isDebouncing: false,
  setIsDebouncing: (isd: boolean) => {
    return
  },
  editModeOn: false,
  setEditModeOn: (b: boolean) => {
    return
  },
  drawCard: () => {
    return
  },
})
