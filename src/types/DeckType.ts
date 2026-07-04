import { decks } from '../constants/decks'
import { nemesisVariants } from '../constants/nemesisVariants'

export type DeckType = keyof typeof decks
export type NemesisDeckType = keyof typeof nemesisVariants
