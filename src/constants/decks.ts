import { CardValue } from '../types/CardValue'
import { nemesisVariants } from './nemesisVariants'

export const decks: { [x: string]: CardValue[] } = {
  oneplayer: ['1', '1', '1'],
  twoplayer: ['1', '1', '2', '2'],
  threeplayer: ['1', '2', '3', 'Wild'],
  fourplayer: ['1', '2', '3', '4'],
  fourplayerAB: ['1/2', '1/2', '3/4', '3/4'],
}

export const nemesisDecks: { [x: string]: CardValue[] } = Object.fromEntries(
  Object.entries(nemesisVariants).map(([k, v]) => [k, v.cards])
)
