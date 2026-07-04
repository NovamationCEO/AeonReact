import { CardValue } from '../types/CardValue'

export type NemesisVariant = {
  cards: CardValue[]
  label: string
  shortLabel: string
  description: string
  hasIntensity: boolean
}

export const nemesisVariants = {
  base: {
    cards: ['N', 'N'] as CardValue[],
    label: 'Standard Nemesis Deck',
    shortLabel: 'Standard',
    description: 'Two standard Nemesis turns — classic Aeon\'s End.',
    hasIntensity: false,
  },
  nx: {
    cards: ['N', 'X'] as CardValue[],
    label: 'Charged Nemesis Card',
    shortLabel: 'Charged',
    description: 'One Nemesis turn plus a Charged Action — a surge of nemesis power.',
    hasIntensity: false,
  },
  nd: {
    cards: ['N', 'Thief'] as CardValue[],
    label: 'Thief of Dreams',
    shortLabel: 'Thief of Dreams',
    description: 'One Nemesis turn plus the Thief — steals a spell from the top of a player\'s deck.',
    hasIntensity: false,
  },
  mb: {
    cards: ['Myth', 'Bone'] as CardValue[],
    label: 'Paradox of Myth and Bone',
    shortLabel: 'Myth & Bone',
    description: 'The Paradox pair — two linked Nemesis cards that interact with each other.',
    hasIntensity: false,
  },
  intensity: {
    cards: ['+2', '-1'] as CardValue[],
    label: 'Intensity',
    shortLabel: 'Intensity',
    description: 'Tracks Nemesis intensity. Drawing +2 raises it by 2, −1 lowers it by 1. Don\'t let it max out.',
    hasIntensity: true,
  },
} satisfies Record<string, NemesisVariant>

export type NemesisDeckType = keyof typeof nemesisVariants
