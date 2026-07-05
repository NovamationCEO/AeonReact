import React from 'react'
import { BgStyle } from './types/BgStyle'
import { CardStyle } from './types/CardStyle'
import { CardValue } from './types/CardValue'
import { DeckType, NemesisDeckType } from './types/DeckType'
import { decks, nemesisDecks } from './constants/decks'
import { nemesisVariants } from './constants/nemesisVariants'
import { INTENSITY_MIN, INTENSITY_MAX } from './constants/intensity'
import { useLocalStorage } from './hooks/useLocalStorage'
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

function vibrate(pattern: number | number[]) {
  navigator.vibrate?.(pattern)
}

export function Dealer(props: { children: React.ReactNode }) {
  const { children } = props

  const [baseDeck, setBaseDeck] = useLocalStorage<DeckType>('baseDeck', 'twoplayer')
  const [nemesisDeck, setNemesisDeck] = useLocalStorage<NemesisDeckType>('nemesisDeck', 'base')
  const [cardStyle, setCardStyle] = useLocalStorage<CardStyle>('cardStyle', 'cracks')
  const [bgStyle, setBgStyle] = useLocalStorage<BgStyle>('bgStyle', 'velvet')
  const [hasFriend, setHasFriend] = useLocalStorage<boolean>('hasFriend', false)
  const [hasFoe, setHasFoe] = useLocalStorage<boolean>('hasFoe', false)

  const [deck, setDeck] = React.useState<CardValue[]>([])
  const [deckIds, setDeckIds] = React.useState<string[]>([])
  const [deckIndex, setDeckIndex] = React.useState(0)
  const [menuVisible, setMenuVisible] = React.useState(false)
  const [isDebouncing, setIsDebouncing] = React.useState(false)
  const [editModeOn, setEditModeOn] = React.useState(false)
  const [forcePeek, setForcePeek] = React.useState<boolean[]>([])
  const [intensityValue, setIntensityValue] = React.useState(1)
  const [cycleCount, setCycleCount] = React.useState(1)
  const [pendingShuffle, setPendingShuffle] = React.useState<{
    deck: CardValue[], deckIds: string[], forcePeek: boolean[]
  } | null>(null)
  const [history, setHistory] = React.useState<CardValue[][]>([])
  const [historyOpen, setHistoryOpen] = React.useState(false)
  const [gameSummaryOpen, setGameSummaryOpen] = React.useState(false)

  React.useEffect(() => {
    const newDeck = buildDeck(baseDeck, nemesisDeck, hasFriend, hasFoe)
    setDeck(newDeck)
    setDeckIds(newDeck.map((_, i) => `${Date.now()}-${i}`))
    setForcePeek(newDeck.map(() => false))
    setDeckIndex(0)
    setIntensityValue(1)
    setCycleCount(1)
    setHistory([[newDeck[0]]])
    setHistoryOpen(false)
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
    if (!nemesisVariants[nemesisDeck].hasIntensity) return
    if (card === '+2') setIntensityValue(v => Math.min(INTENSITY_MAX, v + 2))
    else if (card === '-1') setIntensityValue(v => Math.max(INTENSITY_MIN, v - 1))
  }

  function isNemesisCard(card: CardValue): boolean {
    return (nemesisDecks[nemesisDeck] as CardValue[]).includes(card)
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
      setCycleCount(c => c + 1)
      vibrate([30, 15, 30, 15, 30])
      setHistory(h => [...h, [newDeck[0]]])
    } else {
      applyIntensityCard(deck[newIndex])
      vibrate(isNemesisCard(deck[newIndex]) ? 60 : 20)
      setHistory(h => [...h.slice(0, -1), [...(h[h.length - 1] ?? []), deck[newIndex]]])
    }
    setTimeout(() => setIsDebouncing(false), 400)
  }

  function endGame() {
    const newDeck = buildDeck(baseDeck, nemesisDeck, hasFriend, hasFoe)
    setDeck(newDeck)
    setDeckIds(newDeck.map((_, i) => `${Date.now()}-${i}`))
    setForcePeek(newDeck.map(() => false))
    setDeckIndex(0)
    setIntensityValue(1)
    setCycleCount(1)
    setHistory([[newDeck[0]]])
    setHistoryOpen(false)
    setGameSummaryOpen(false)
    setEditModeOn(false)
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
    cycleCount,
    setCycleCount,
    pendingShuffle,
    setPendingShuffle,
    history,
    setHistory,
    historyOpen,
    setHistoryOpen,
    endGame,
    gameSummaryOpen,
    setGameSummaryOpen,
  }

  return (
    <DealerContext.Provider value={bundledValues}>
      {children}
    </DealerContext.Provider>
  )
}
