import { Box, useMediaQuery } from '@mui/material'
import { Card } from './Card'
import React, { useContext, useRef, useLayoutEffect } from 'react'
import { DealerContext } from '../DealerContext'

export function CardRow() {
  const { deck, deckIds, deckIndex, editModeOn } = useContext(DealerContext)
  const smallScreen = useMediaQuery('(max-width: 499px)')
  const columnValues = `repeat(auto-fit, minmax(${smallScreen ? '98' : '120'}px, 1fr))`
  const gridRef = useRef<HTMLDivElement>(null)
  const prevRectsRef = useRef<Map<string, DOMRect>>(new Map())

  // FLIP animation: capture positions before paint, animate from old → new after
  useLayoutEffect(() => {
    const grid = gridRef.current
    if (!grid) return
    const newRects = new Map<string, DOMRect>()
    Array.from(grid.children).forEach(child => {
      const el = child as HTMLElement
      const id = el.dataset.cardId
      if (!id) return
      const rect = el.getBoundingClientRect()
      newRects.set(id, rect)
      const prev = prevRectsRef.current.get(id)
      if (prev) {
        const dx = prev.left - rect.left
        const dy = prev.top - rect.top
        if (Math.abs(dx) > 0.5 || Math.abs(dy) > 0.5) {
          el.style.transition = 'none'
          el.style.transform = `translate(${dx}px, ${dy}px)`
          requestAnimationFrame(() => {
            el.style.transition = 'transform 0.38s cubic-bezier(0.4, 0, 0.2, 1)'
            el.style.transform = ''
          })
        }
      }
    })
    prevRectsRef.current = newRects
  })

  return (
    <Box
      ref={gridRef}
      sx={{
        width: '100%',
        height: '100%',
        alignContent: 'center',
        display: 'grid',
        gridTemplateColumns: columnValues,
        gridAutoRows: 'min-content',
        gap: '10px',
        justifyItems: 'center',
        padding: '10px',
        boxShadow: editModeOn
          ? '0 0 0 2px rgba(100,100,220,0.7), 0 0 20px rgba(100,100,220,0.12)'
          : '0 0 0 0px transparent',
        borderRadius: '12px',
        transition: '0.4s ease box-shadow',
      }}
    >
      {deck.map((cardValue, n) => (
        <div key={deckIds[n] ?? String(n)} data-card-id={deckIds[n] ?? String(n)} style={{ width: '100%' }}>
          <Card cardValue={cardValue} isUp={deckIndex >= n} currentIndex={n} />
        </div>
      ))}
    </Box>
  )
}
