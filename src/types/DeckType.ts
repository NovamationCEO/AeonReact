import { decks, nemesisDecks } from '../constants/decks'

export type DeckType = keyof typeof decks

export type NemesisDeckType = keyof typeof nemesisDecks
