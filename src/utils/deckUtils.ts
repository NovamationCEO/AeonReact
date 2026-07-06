import { CardValue } from '../types/CardValue'
import { DeckType, NemesisDeckType } from '../types/DeckType'
import { decks, nemesisDecks } from '../constants/decks'

export function shuffleDeck(cards: CardValue[]): CardValue[] {
  const result = [...cards]
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }
  return result
}

export function buildDeck(
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
