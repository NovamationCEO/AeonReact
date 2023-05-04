import React from 'react'
import { CardStyle } from './types/CardStyle'
import { CardValue } from './types/CardValue'
import { DeckType, NemesisDeckType } from './types/DeckType'
import { decks, nemesisDecks } from './constants/decks'
import { DealerContext } from './DealerContext'

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
  const [editModeOn, setEditModeOn] = React.useState(false)
  const [forcePeek, setForcePeek] = React.useState([] as boolean[])

  React.useEffect(() => {
    freshDeck()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [baseDeck, nemesisDeck])

  function freshDeck() {
    setDeck(
      shuffleDeck([...decks[baseDeck]].concat([...nemesisDecks[nemesisDeck]]))
    )
    setDeckIndex(0)
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
    setBaseDeck,
    nemesisDeck,
    setNemesisDeck,
    cardStyle,
    setCardStyle,
    deck,
    setDeck,
    deckIndex,
    setDeckIndex,
    menuVisible,
    setMenuVisible,
    isDebouncing,
    setIsDebouncing,
    editModeOn,
    setEditModeOn,
    drawCard,
    forcePeek,
    setForcePeek,
  }

  return (
    <DealerContext.Provider value={bundledValues}>
      {children}
    </DealerContext.Provider>
  )
}
