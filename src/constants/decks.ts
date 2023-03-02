import { CardValue } from '../types/CardValue'

export const decks: { [x: string]: CardValue[] } = {
  oneplayer: ['1', '1', '1', '1', 'N', 'N'],
  twoplayer: ['1', '1', '2', '2', 'N', 'N'],
  threeplayer: ['1', '2', '3', 'W', 'N', 'N'],
  fourPlayer: ['1', '2', '3', '4', 'N', 'N'],
  fourPlayerAB: ['A', 'A', 'B', 'B', 'N', 'N'],
}
