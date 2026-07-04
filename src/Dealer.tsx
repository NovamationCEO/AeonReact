import React from 'react'
import { BgStyle } from './types/BgStyle'
import { CardStyle } from './types/CardStyle'
import { CardValue } from './types/CardValue'
import { DeckType, NemesisDeckType } from './types/DeckType'
import { decks, nemesisDecks } from './constants/decks'
import { DealerContext } from './DealerContext'

function shuffleDeck(cards: CardValue[]): CardValue[] {
  const result = [...cards]
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }
  return result
}

function buildDeck(
  base: DeckType,
  nemesis: NemesisDeckType,
  friend: boolean,
  foe: boolean
): CardValue[] {
  return shuffleDeck(
    [...decks[base], ...nemesisDecks[nemesis]]
      .concat(friend ? ['+' as CardValue] : [])
      .concat(foe ? ['-' as CardValue] : [])
  )
}

export function Dealer(props: { children: React.ReactNode }) {
  const { children } = props

  const [baseDeck, setBaseDeck] = React.useState<DeckType>('twoplayer')
  const [nemesisDeck, setNemesisDeck] = React.useState<NemesisDeckType>('base')
  const [cardStyle, setCardStyle] = React.useState<CardStyle>('cracks')
  const [bgStyle, setBgStyle] = React.useState<BgStyle>('velvet')
  const [deck, setDeck] = React.useState<CardValue[]>([])
  const [deckIds, setDeckIds] = React.useState<string[]>([])
  const [deckIndex, setDeckIndex] = React.useState(0)
  const [menuVisible, setMenuVisible] = React.useState(false)
  const [isDebouncing, setIsDebouncing] = React.useState(false)
  const [editModeOn, setEditModeOn] = React.useState(false)
  const [forcePeek, setForcePeek] = React.useState<boolean[]>([])
  const [hasFriend, setHasFriend] = React.useState(false)
  const [hasFoe, setHasFoe] = React.useState(false)
  const [intensityValue, setIntensityValue] = React.useState(1)
  const [pendingShuffle, setPendingShuffle] = React.useState<{
    deck: CardValue[], deckIds: string[], forcePeek: boolean[]
  } | null>(null)

  React.useEffect(() => {
    const newDeck = buildDeck(baseDeck, nemesisDeck, hasFriend, hasFoe)
    setDeck(newDeck)
    setDeckIds(newDeck.map((_, i) => `${Date.now()}-${i}`))
    setForcePeek(newDeck.map(() => false))
    setDeckIndex(0)
    setIntensityValue(1)
  }, [baseDeck, nemesisDeck, hasFriend, hasFoe])

  React.useEffect(() => {
    setForcePeek((current) => current.map(() => false))
  }, [editModeOn])

  React.useEffect(() => {
    if (!editModeOn) return
    const prevent = (e: TouchEvent) => e.preventDefault()
    document.addEventListener('touchmove', prevent, { passive: false })
    return () => document.removeEventListener('touchmove', prevent)
  }, [editModeOn])

  function applyIntensityCard(card: CardValue) {
    if (nemesisDeck !== 'intensity') return
    if (card === '+2') setIntensityValue(v => Math.min(6, v + 2))
    else if (card === '-1') setIntensityValue(v => Math.max(1, v - 1))
  }

  function drawCard() {
    if (isDebouncing) return
    setIsDebouncing(true)
    const newIndex = (deckIndex + 1) % deck.length
    setDeckIndex(newIndex)
    if (!newIndex) {
      const newDeck = buildDeck(baseDeck, nemesisDeck, hasFriend, hasFoe)
      setDeck(newDeck)
      setDeckIds(newDeck.map((_, i) => `${Date.now()}-${i}`))
      setForcePeek(newDeck.map(() => false))
      applyIntensityCard(newDeck[0])
    } else {
      applyIntensityCard(deck[newIndex])
    }
    setTimeout(() => setIsDebouncing(false), 400)
  }

  const bundledValues = {
    baseDeck,
    setBaseDeck,
    nemesisDeck,
    setNemesisDeck,
    cardStyle,
    setCardStyle,
    bgStyle,
    setBgStyle,
    deck,
    setDeck,
    deckIds,
    setDeckIds,
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
    hasFriend,
    setHasFriend,
    hasFoe,
    setHasFoe,
    intensityValue,
    setIntensityValue,
    pendingShuffle,
    setPendingShuffle,
  }

  return (
    <DealerContext.Provider value={bundledValues}>
      {children}
    </DealerContext.Provider>
  )
}
