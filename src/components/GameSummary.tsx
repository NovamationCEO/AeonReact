import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import React, { useContext, useMemo } from 'react'
import { DealerContext } from '../DealerContext'
import { nemesisDecks } from '../constants/decks'
import { flameSets } from '../theme/flameSets'
import { z } from '../theme/z'
import { CardValue } from '../types/CardValue'

// ── Stats ────────────────────────────────────────────────────────────────────

type Stats = {
  handsPlayed: number
  totalDraws: number
  firstCards: { card: CardValue; count: number }[]
  lastCards: { card: CardValue; count: number }[]
  overallFreq: { card: CardValue; count: number }[]
  consecutiveSame: { card: CardValue; count: number }[]
  nemesisTotal: number
  nemesisPct: number
  nemesisBackToBack: number
  avgFirstNemesisPosition: number | null
  longestSafeStreak: number
  longestNemesisStreak: number
}

function computeStats(history: CardValue[][], nemesisSet: Set<CardValue>): Stats {
  // allCards is flattened in draw order, so cross-hand adjacency is naturally preserved
  const allCards = history.flat()

  const toSorted = (m: Record<string, number>) =>
    Object.entries(m)
      .map(([card, count]) => ({ card: card as CardValue, count }))
      .sort((a, b) => b.count - a.count)

  const firstMap: Record<string, number> = {}
  const lastMap: Record<string, number> = {}
  for (const hand of history) {
    if (!hand.length) continue
    const f = hand[0];           firstMap[f] = (firstMap[f] ?? 0) + 1
    const l = hand[hand.length - 1]; lastMap[l] = (lastMap[l] ?? 0) + 1
  }

  const freqMap: Record<string, number> = {}
  for (const c of allCards) freqMap[c] = (freqMap[c] ?? 0) + 1

  // Consecutive same-value pairs — allCards.flat() already captures cross-hand boundary pairs
  const consecMap: Record<string, number> = {}
  for (let i = 1; i < allCards.length; i++) {
    if (allCards[i] === allCards[i - 1]) {
      const c = allCards[i]
      consecMap[c] = (consecMap[c] ?? 0) + 1
    }
  }

  let nemesisTotal = 0; let nemesisBackToBack = 0
  let longestSafe = 0; let curSafe = 0
  let longestNemesis = 0; let curNemesis = 0

  for (let i = 0; i < allCards.length; i++) {
    if (nemesisSet.has(allCards[i])) {
      nemesisTotal++
      if (i > 0 && nemesisSet.has(allCards[i - 1])) nemesisBackToBack++
      longestSafe = Math.max(longestSafe, curSafe); curSafe = 0
      curNemesis++; longestNemesis = Math.max(longestNemesis, curNemesis)
    } else {
      curSafe++; longestSafe = Math.max(longestSafe, curSafe); curNemesis = 0
    }
  }

  // Average position of the FIRST nemesis card within each hand
  const firstNemesisPositions: number[] = []
  for (const hand of history) {
    const idx = hand.findIndex(c => nemesisSet.has(c))
    if (idx >= 0) firstNemesisPositions.push(idx + 1)
  }
  const avgFirstNemesisPosition =
    firstNemesisPositions.length > 0
      ? firstNemesisPositions.reduce((a, b) => a + b, 0) / firstNemesisPositions.length
      : null

  return {
    handsPlayed: history.length,
    totalDraws: allCards.length,
    firstCards: toSorted(firstMap),
    lastCards: toSorted(lastMap),
    overallFreq: toSorted(freqMap),
    consecutiveSame: toSorted(consecMap),
    nemesisTotal,
    nemesisPct: allCards.length > 0 ? (nemesisTotal / allCards.length) * 100 : 0,
    nemesisBackToBack,
    avgFirstNemesisPosition,
    longestSafeStreak: longestSafe,
    longestNemesisStreak: longestNemesis,
  }
}

// ── Shared display pieces ────────────────────────────────────────────────────

function Chip({ card }: { card: CardValue }) {
  const accent = flameSets[card]?.[0] ?? '#888'
  return (
    <Box
      sx={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)',
        borderLeft: `3px solid ${accent}`,
        borderRadius: '4px', color: 'white', fontFamily: 'monospace', fontWeight: 'bold',
        fontSize: '0.88em', padding: '2px 7px', minWidth: '2em',
        textAlign: 'center' as const, userSelect: 'none',
      }}
    >
      {card}
    </Box>
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <Box sx={{
      fontSize: '0.62em', letterSpacing: '0.1em', textTransform: 'uppercase',
      color: 'rgba(155,185,230,0.5)', fontFamily: 'sans-serif', mt: 2.5, mb: 1,
    }}>
      {children}
    </Box>
  )
}

function FreqRow({ card, count, maxCount }: { card: CardValue; count: number; maxCount: number }) {
  const accent = flameSets[card]?.[0] ?? '#888'
  const pct = maxCount > 0 ? (count / maxCount) * 100 : 0
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.75 }}>
      <Chip card={card} />
      <Box sx={{ flex: 1, height: 6, borderRadius: 3, background: 'rgba(255,255,255,0.07)', overflow: 'hidden' }}>
        <Box sx={{ height: '100%', width: `${pct}%`, background: accent, borderRadius: 3, opacity: 0.75 }} />
      </Box>
      <Box sx={{ fontFamily: 'monospace', fontSize: '0.72em', color: 'rgba(255,255,255,0.4)', minWidth: '2.5em', textAlign: 'right' as const }}>
        {count}×
      </Box>
    </Box>
  )
}

function BigNum({ value, label }: { value: number | string; label: string }) {
  return (
    <Box sx={{ textAlign: 'center', flex: 1 }}>
      <Box sx={{ fontFamily: 'monospace', fontWeight: 'bold', fontSize: '2.2em', color: 'rgba(240,184,64,0.9)', lineHeight: 1 }}>
        {value}
      </Box>
      <Box sx={{ fontSize: '0.58em', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(155,185,230,0.45)', fontFamily: 'sans-serif', mt: 0.5 }}>
        {label}
      </Box>
    </Box>
  )
}

// ── Main component ───────────────────────────────────────────────────────────

export function GameSummary() {
  const { gameSummaryOpen, setGameSummaryOpen, history, nemesisDeck, endGame } =
    useContext(DealerContext)

  const nemesisSet = useMemo(
    () => new Set(nemesisDecks[nemesisDeck] as CardValue[]),
    [nemesisDeck]
  )
  const stats = useMemo(() => computeStats(history, nemesisSet), [history, nemesisSet])

  if (!gameSummaryOpen) return null

  const hasNemesis = nemesisSet.size > 0
  const enoughData = stats.totalDraws >= 2

  return (
    <Box
      sx={{
        position: 'absolute', inset: 0, zIndex: z.gameSummary,
        background: 'rgba(4, 6, 24, 0.93)',
        backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)',
        display: 'flex', flexDirection: 'column', color: 'white',
      }}
    >
      {/* Title bar */}
      <Box sx={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        position: 'relative', padding: '14px 16px',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        fontFamily: 'Gill Sans, Gill Sans MT, Calibri, Trebuchet MS, sans-serif',
        fontWeight: 'bold', fontSize: '1.15em', letterSpacing: '0.06em',
        textShadow: '0 0 18px rgba(140,180,255,0.35)',
        flexShrink: 0,
      }}>
        Game Summary
        <Box
          onClick={() => setGameSummaryOpen(false)}
          sx={{
            position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)',
            width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center',
            borderRadius: '50%', cursor: 'pointer',
            color: 'rgba(255,255,255,0.35)', fontSize: '1em',
            transition: '0.15s ease color, 0.15s ease background',
            ':hover': { color: 'rgba(255,255,255,0.75)', background: 'rgba(255,255,255,0.09)' },
          }}
        >
          ✕
        </Box>
      </Box>

      {/* Scrollable body */}
      <Box sx={{ flex: 1, overflowY: 'auto', padding: '4px 16px 28px' }}>

        {!enoughData ? (
          <Box sx={{ textAlign: 'center', color: 'rgba(255,255,255,0.28)', fontStyle: 'italic', fontFamily: 'sans-serif', fontSize: '0.9em', mt: 6 }}>
            Not enough data yet
          </Box>
        ) : (
          <>
            {/* ── Big numbers ── */}
            <Box sx={{ display: 'flex', pt: 2.5, pb: 0.5 }}>
              <BigNum value={stats.handsPlayed} label={stats.handsPlayed === 1 ? 'hand' : 'hands'} />
              <BigNum value={stats.totalDraws} label="total draws" />
              {stats.handsPlayed > 1 && (
                <BigNum value={stats.handsPlayed - 1} label={stats.handsPlayed === 2 ? 'reshuffle' : 'reshuffles'} />
              )}
            </Box>

            {/* ── Nemesis activity ── */}
            {hasNemesis && (
              <>
                <SectionLabel>Nemesis activity</SectionLabel>
                <Box sx={{ fontFamily: 'sans-serif', fontSize: '0.82em', color: 'rgba(255,255,255,0.6)', lineHeight: 1.95 }}>
                  <Box>
                    {stats.nemesisTotal} draw{stats.nemesisTotal !== 1 ? 's' : ''}{' '}
                    <Box component="span" sx={{ color: 'rgba(255,255,255,0.32)' }}>
                      ({Math.round(stats.nemesisPct)}% of total)
                    </Box>
                  </Box>
                  {stats.avgFirstNemesisPosition !== null && (
                    <Box>
                      First strike: position{' '}
                      <Box component="span" sx={{ fontFamily: 'monospace', color: 'rgba(240,184,64,0.8)' }}>
                        {stats.avgFirstNemesisPosition.toFixed(1)}
                      </Box>
                      {' '}on average
                    </Box>
                  )}
                  {stats.nemesisBackToBack > 0 && (
                    <Box>Back-to-back nemesis: {stats.nemesisBackToBack}×</Box>
                  )}
                  {stats.longestNemesisStreak >= 2 && (
                    <Box>Longest nemesis streak: {stats.longestNemesisStreak} in a row</Box>
                  )}
                  {stats.longestSafeStreak > 0 && (
                    <Box>Longest safe streak: {stats.longestSafeStreak} draws</Box>
                  )}
                </Box>
              </>
            )}

            {/* ── Opening card ── */}
            {stats.firstCards.length > 0 && stats.handsPlayed > 1 && (
              <>
                <SectionLabel>Opening card (first drawn per hand)</SectionLabel>
                {stats.firstCards.map(({ card, count }) => (
                  <FreqRow key={card} card={card} count={count} maxCount={stats.firstCards[0].count} />
                ))}
              </>
            )}

            {/* ── Closing card ── */}
            {stats.lastCards.length > 0 && stats.handsPlayed > 1 && (
              <>
                <SectionLabel>Closing card (last drawn per hand)</SectionLabel>
                {stats.lastCards.map(({ card, count }) => (
                  <FreqRow key={card} card={card} count={count} maxCount={stats.lastCards[0].count} />
                ))}
              </>
            )}

            {/* ── Overall draw count ── */}
            <SectionLabel>Total draw count</SectionLabel>
            {stats.overallFreq.map(({ card, count }) => (
              <FreqRow key={card} card={card} count={count} maxCount={stats.overallFreq[0].count} />
            ))}

            {/* ── Back-to-back same card ── */}
            {stats.consecutiveSame.length > 0 && (
              <>
                <SectionLabel>Same card drawn back-to-back</SectionLabel>
                {stats.consecutiveSame.map(({ card, count }) => (
                  <Box key={card} sx={{ display: 'flex', alignItems: 'center', gap: 1.25, mb: 0.75 }}>
                    <Chip card={card} />
                    <Box sx={{ fontFamily: 'sans-serif', fontSize: '0.8em', color: 'rgba(255,255,255,0.4)' }}>
                      {count}× in a row
                    </Box>
                  </Box>
                ))}
              </>
            )}
          </>
        )}

        {/* ── Start New Game ── */}
        <Box sx={{ mt: enoughData ? 3.5 : 2 }}>
          <Button
            onClick={endGame}
            sx={{
              width: '100%', borderRadius: '20px', padding: '10px',
              color: 'white', border: '1.5px solid rgba(255,255,255,0.2)',
              fontFamily: 'sans-serif', letterSpacing: '0.05em',
              background: 'rgba(255,255,255,0.07)',
              ':hover': { background: 'rgba(255,255,255,0.13)' },
            }}
          >
            Start New Game
          </Button>
        </Box>
      </Box>
    </Box>
  )
}
