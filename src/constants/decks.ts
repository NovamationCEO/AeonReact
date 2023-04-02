import { CardValue } from '../types/CardValue'

export const decks: { [x: string]: CardValue[] } = {
  oneplayer: ['1', '1', '1'],
  twoplayer: ['1', '1', '2', '2'],
  threeplayer: ['1', '2', '3', 'W'],
  fourplayer: ['1', '2', '3', '4'],
  fourplayerAB: ['A', 'A', 'B', 'B'],
}

export const nemesisDecks: { [x: string]: CardValue[] } = {
  base: ['N', 'N'],
  nx: ['N', 'X'],
  nd: ['N', 'D'],
  mb: ['Myth', 'Bone'],
}
