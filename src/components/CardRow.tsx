import { Box, useMediaQuery } from '@mui/material'
import { Card } from './Card'
import React, { useContext, useRef, useLayoutEffect, useEffect } from 'react'
import { DealerContext } from '../DealerContext'

export function CardRow() {
  const {
    deck, deckIds, deckIndex, editModeOn,
    pendingShuffle, setPendingShuffle,
    setDeck, setDeckIds, setForcePeek,
  } = useContext(DealerContext)

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

  // Shuffle animation: gather face-down cards to a stack, then spread to new positions
  useEffect(() => {
    if (!pendingShuffle || !gridRef.current) return

    const cut = deckIndex + 1
    const children = Array.from(gridRef.current.children) as HTMLElement[]
    const faceDownEls = children.slice(cut)

    if (faceDownEls.length <= 1) {
      setDeck(pendingShuffle.deck)
      setDeckIds(pendingShuffle.deckIds)
      setForcePeek(pendingShuffle.forcePeek)
      setPendingShuffle(null)
      return
    }

    // Compute gather point: center of the face-down card area
    const rects = faceDownEls.map(el => el.getBoundingClientRect())
    const minX = Math.min(...rects.map(r => r.left))
    const maxX = Math.max(...rects.map(r => r.right))
    const minY = Math.min(...rects.map(r => r.top))
    const maxY = Math.max(...rects.map(r => r.bottom))
    const centerX = (minX + maxX) / 2
    const centerY = (minY + maxY) / 2

    // Phase 1: gather all face-down cards to the center point
    faceDownEls.forEach((el, i) => {
      const r = rects[i]
      const dx = centerX - (r.left + r.width / 2)
      const dy = centerY - (r.top + r.height / 2)
      el.style.zIndex = '10'
      el.style.transition = 'transform 0.28s ease-in'
      el.style.transform = `translate(${dx}px, ${dy}px)`
    })

    const timer = setTimeout(() => {
      // Record center position in prevRectsRef for each face-down card.
      // The FLIP useLayoutEffect will use these as the "from" positions,
      // making all cards appear to spread outward from the stack.
      faceDownEls.forEach(el => {
        const id = el.dataset.cardId
        if (id) prevRectsRef.current.set(id, el.getBoundingClientRect())
      })

      // Clear gather transforms and z-index without triggering a paint
      faceDownEls.forEach(el => {
        el.style.transition = 'none'
        el.style.transform = ''
        el.style.zIndex = ''
      })

      // Commit the shuffle — FLIP useLayoutEffect fires before the next paint,
      // finds prevRects at center, applies inverse transform, then animates outward
      setDeck(pendingShuffle.deck)
      setDeckIds(pendingShuffle.deckIds)
      setForcePeek(pendingShuffle.forcePeek)
      setPendingShuffle(null)
    }, 320)

    return () => clearTimeout(timer)
  }, [pendingShuffle]) // eslint-disable-line react-hooks/exhaustive-deps

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
