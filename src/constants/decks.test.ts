import { describe, it, expect } from 'vitest'
import { decks, nemesisDecks } from './decks'
import { nemesisVariants } from './nemesisVariants'

// Re-implement shuffleDeck and buildDeck locally so tests don't depend on Dealer internals
function buildDeck(base: string, nemesis: string, friend: boolean, foe: boolean): string[] {
  return [
    ...decks[base],
    ...nemesisDecks[nemesis],
    ...(friend ? ['+'] : []),
    ...(foe ? ['-'] : []),
  ]
}

describe('decks', () => {
  it('has the correct card counts per player config', () => {
    expect(decks.oneplayer).toHaveLength(3)
    expect(decks.twoplayer).toHaveLength(4)
    expect(decks.threeplayer).toHaveLength(4)
    expect(decks.fourplayer).toHaveLength(4)
    expect(decks.fourplayerAB).toHaveLength(4)
  })

  it('two-player deck contains two 1s and two 2s', () => {
    const d = decks.twoplayer
    expect(d.filter(c => c === '1')).toHaveLength(2)
    expect(d.filter(c => c === '2')).toHaveLength(2)
  })
})

describe('nemesisDecks', () => {
  it('matches the cards defined in nemesisVariants', () => {
    for (const key of Object.keys(nemesisVariants)) {
      expect(nemesisDecks[key]).toEqual(nemesisVariants[key as keyof typeof nemesisVariants].cards)
    }
  })

  it('base variant has two N cards', () => {
    expect(nemesisDecks.base).toEqual(['N', 'N'])
  })

  it('intensity variant has +2 and -1', () => {
    expect(nemesisDecks.intensity).toContain('+2')
    expect(nemesisDecks.intensity).toContain('-1')
    expect(nemesisDecks.intensity).toHaveLength(2)
  })
})

describe('buildDeck', () => {
  it('total size is base + nemesis cards', () => {
    const d = buildDeck('twoplayer', 'base', false, false)
    expect(d).toHaveLength(6) // 4 player + 2 nemesis
  })

  it('adds friend and foe when enabled', () => {
    const base = buildDeck('twoplayer', 'base', false, false).length
    expect(buildDeck('twoplayer', 'base', true, false)).toHaveLength(base + 1)
    expect(buildDeck('twoplayer', 'base', false, true)).toHaveLength(base + 1)
    expect(buildDeck('twoplayer', 'base', true, true)).toHaveLength(base + 2)
  })

  it('intensity deck contains exactly one +2 and one -1', () => {
    const d = buildDeck('twoplayer', 'intensity', false, false)
    expect(d.filter(c => c === '+2')).toHaveLength(1)
    expect(d.filter(c => c === '-1')).toHaveLength(1)
  })

  it('four-player deck has correct player cards', () => {
    const d = buildDeck('fourplayer', 'base', false, false)
    expect(d).toContain('1')
    expect(d).toContain('2')
    expect(d).toContain('3')
    expect(d).toContain('4')
  })
})

describe('nemesisVariants metadata', () => {
  it('every variant has required fields', () => {
    for (const [key, v] of Object.entries(nemesisVariants)) {
      expect(v.label, key).toBeTruthy()
      expect(v.shortLabel, key).toBeTruthy()
      expect(v.description, key).toBeTruthy()
      expect(Array.isArray(v.cards), key).toBe(true)
      expect(v.cards.length, key).toBeGreaterThan(0)
    }
  })

  it('only intensity has hasIntensity=true', () => {
    for (const [key, v] of Object.entries(nemesisVariants)) {
      expect(v.hasIntensity, key).toBe(key === 'intensity')
    }
  })
})
