import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { useContext, useEffect, useRef } from 'react'
import { DealerContext } from '../DealerContext'
import { flameSets } from '../theme/flameSets'
import { z } from '../theme/z'
import { CardValue } from '../types/CardValue'

function CardChip({ card }: { card: CardValue }) {
  const accentColor = flameSets[card]?.[0] ?? '#888'
  return (
    <Box
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(255,255,255,0.07)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderLeft: `3px solid ${accentColor}`,
        borderRadius: '4px',
        color: 'white',
        fontFamily: 'monospace',
        fontWeight: 'bold',
        fontSize: '0.9em',
        padding: '3px 8px',
        minWidth: '2em',
        textAlign: 'center' as const,
        userSelect: 'none',
      }}
    >
      {card}
    </Box>
  )
}

function HandSection({ cards, label }: { cards: CardValue[]; label: string }) {
  return (
    <Box sx={{ mb: 2.5 }}>
      <Box
        sx={{
          fontSize: '0.65em',
          fontFamily: 'sans-serif',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: 'rgba(155,185,230,0.55)',
          mb: 0.75,
        }}
      >
        {label}
      </Box>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
        {cards.length === 0 ? (
          <Box
            sx={{
              color: 'rgba(255,255,255,0.22)',
              fontFamily: 'sans-serif',
              fontSize: '0.85em',
              fontStyle: 'italic',
            }}
          >
            No draws yet
          </Box>
        ) : (
          cards.map((card, i) => <CardChip key={i} card={card} />)
        )}
      </Box>
    </Box>
  )
}

export function HistoryPanel() {
  const { historyOpen, setHistoryOpen, history, setGameSummaryOpen } = useContext(DealerContext)
  const panelRef = useRef<HTMLDivElement>(null)
  const prevFocusRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (historyOpen) {
      prevFocusRef.current = document.activeElement as HTMLElement
      panelRef.current?.focus()
    } else {
      prevFocusRef.current?.focus()
      prevFocusRef.current = null
    }
  }, [historyOpen])

  useEffect(() => {
    if (!historyOpen) return
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setHistoryOpen(false) }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [historyOpen, setHistoryOpen])

  if (!historyOpen) return null

  const currentHand = history[history.length - 1] ?? []
  const completedHands = history.slice(0, -1)

  return (
    <Box
      onClick={() => setHistoryOpen(false)}
      sx={{
        position: 'absolute',
        inset: 0,
        zIndex: z.historyPanel,
      }}
    >
      <Box
        ref={panelRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label="Card draw history"
        onClick={e => e.stopPropagation()}
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          maxHeight: '75%',
          overflowY: 'auto',
          background: 'rgba(6, 8, 32, 0.96)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          boxShadow: '0 12px 40px rgba(0,0,0,0.6)',
          padding: '16px',
          color: 'white',
          outline: 'none',
        }}
      >
        <Button
          onClick={() => { setHistoryOpen(false); setGameSummaryOpen(true) }}
          sx={{
            width: '100%',
            mb: 2,
            borderRadius: '20px',
            padding: '8px',
            color: 'rgba(255, 90, 70, 0.9)',
            border: '1.5px solid rgba(255, 70, 50, 0.35)',
            fontFamily: 'sans-serif',
            letterSpacing: '0.05em',
            background: 'rgba(180, 40, 20, 0.12)',
            ':hover': { background: 'rgba(180, 40, 20, 0.22)' },
          }}
        >
          End Game
        </Button>

        <Box sx={{ borderTop: '1px solid rgba(255,255,255,0.06)', pt: 2 }}>
          <HandSection cards={currentHand} label="Current hand" />

          {[...completedHands].reverse().map((hand, i) => (
            <HandSection
              key={i}
              cards={hand}
              label={`Hand ${completedHands.length - i}`}
            />
          ))}
        </Box>
      </Box>
    </Box>
  )
}
