import React, { Dispatch, SetStateAction } from 'react'
import { createContext } from 'react'
import { CardStyle } from './types/CardStyle'
import { CardValue } from './types/CardValue'
import { DeckType, NemesisDeckType } from './types/DeckType'
import { decks, nemesisDecks } from './constants/decks'

export const MyContext = createContext({
  baseDeck: 'twoplayer' as DeckType,
  setBaseDeck: (dt: DeckType) => null,
  nemesisDeck: 'base' as NemesisDeckType,
  setNemesisDeck: (nd: NemesisDeckType) => null,
  cardStyle: 'cracks' as CardStyle,
  setCardStyle: (cs: CardStyle) => null,
  deck: [] as CardValue[],
  setDeck: (cv: CardValue[]) => null,
  deckIndex: 0,
  setDeckIndex: (n: number) => null,
  menuVisible: false,
  setMenuVisible: (mv: boolean) => null,
  isDebouncing: false,
  setIsDebouncing: (isd: boolean) => null,
  drawCard: () => {
    return
  },
})

export function Dealer(props: { children: any }) {
  const { children } = props

  const [baseDeck, setBaseDeck] = React.useState('twoplayer' as DeckType)
  const [nemesisDeck, setNemesisDeck] = React.useState(
    'base' as NemesisDeckType
  )
  const [cardStyle, setCardStyle] = React.useState('cracks' as CardStyle)
  const [deck, setDeck] = React.useState([] as CardValue[])
  const [deckIndex, setDeckIndex] = React.useState(0)
  const [menuVisible, setMenuVisible] = React.useState(false)
  const [isDebouncing, setIsDebouncing] = React.useState(false)

  React.useEffect(() => {
    freshDeck()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [baseDeck, nemesisDeck])

  function freshDeck() {
    setDeck(
      shuffleDeck([...decks[baseDeck]].concat([...nemesisDecks[nemesisDeck]]))
    )
  }

  function drawCard() {
    if (isDebouncing) {
      return
    }
    setIsDebouncing(true)
    const newIndex = (deckIndex + 1) % deck.length
    setDeckIndex(newIndex)
    if (!newIndex) {
      freshDeck()
    }
    setTimeout(() => {
      setIsDebouncing(false)
    }, 500)
  }

  function shuffleDeck(deck: CardValue[]): CardValue[] {
    let tempDeck = [...deck]
    for (let i = 0; i < 21; i++) {
      tempDeck = tempDeck.sort(() => Math.random() - 0.5)
    }
    return tempDeck
  }

  const bundledValues = {
    baseDeck,
    setBaseDeck: (bd: DeckType) => {
      setBaseDeck(bd)
      return null
    },
    nemesisDeck,
    setNemesisDeck: (nd: NemesisDeckType) => {
      setNemesisDeck(nd)
      return null
    },
    cardStyle,
    setCardStyle: (cs: CardStyle) => {
      setCardStyle(cs)
      return null
    },
    deck,
    setDeck: (d: CardValue[]) => {
      setDeck(d)
      return null
    },
    deckIndex,
    setDeckIndex: (n: number) => {
      setDeckIndex(n)
      return null
    },
    menuVisible,
    setMenuVisible: (mv: boolean) => {
      setMenuVisible(mv)
      return null
    },
    isDebouncing,
    setIsDebouncing: (isd: boolean) => {
      setIsDebouncing(isd)
      return null
    },
    drawCard,
  }

  return (
    <MyContext.Provider value={bundledValues}>{children}</MyContext.Provider>
  )
}
