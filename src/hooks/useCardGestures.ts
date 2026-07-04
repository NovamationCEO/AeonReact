import React from 'react'
import { useLongPress } from 'use-long-press'

const LONG_LENGTH = 1000
const EDIT_PEEK_LENGTH = 500
const LONG_DELAY = 300
const SEG_PERCENT = 5
export const SWIPE_THRESHOLD = 45
const LOCK_THRESHOLD = 12

type SwipeDir = 'up' | 'down' | 'left' | 'right' | null

export function useCardGestures(options: {
  isUp: boolean
  editModeOn: boolean
  forcePeekValue: boolean
  onDraw: () => void
  onForcePeek: () => void
  onPeekChange: (peeking: boolean) => void
  onSendToTop: () => void
  onSendToBottom: () => void
  onSlide: (isRight: boolean) => void
}) {
  const {
    isUp,
    editModeOn,
    forcePeekValue,
    onDraw,
    onForcePeek,
    onPeekChange,
    onSendToTop,
    onSendToBottom,
    onSlide,
  } = options

  const [showSpinner, setShowSpinner] = React.useState(false)
  const [progress, setProgress] = React.useState(0)
  const [swipeDir, setSwipeDir] = React.useState<SwipeDir>(null)
  const killIt = React.useRef(false)
  const swipeStart = React.useRef<{ x: number; y: number } | null>(null)
  const pointerDownTime = React.useRef(0)
  const refProgress = React.useRef(0)

  React.useEffect(() => {
    refProgress.current = progress
  }, [progress])

  // ── Edit mode spinner ─────────────────────────────────────────────────────

  function startEditSpinner() {
    setProgress(0)
    killIt.current = false
    setShowSpinner(true)
    advanceEditSpinner(0)
  }

  function advanceEditSpinner(amount: number) {
    if (killIt.current) return
    const newAmount = Math.min(amount + SEG_PERCENT + 1, 100)
    const ticks = Math.floor(EDIT_PEEK_LENGTH / (100 / SEG_PERCENT))
    setProgress(newAmount)
    if (newAmount !== 100) setTimeout(() => advanceEditSpinner(newAmount), ticks)
  }

  function stopEditSpinner() {
    killIt.current = true
    setShowSpinner(false)
    setProgress(0)
  }

  // ── Edit mode pointer handlers ────────────────────────────────────────────

  function onPointerDown(e: React.PointerEvent) {
    swipeStart.current = { x: e.clientX, y: e.clientY }
    pointerDownTime.current = Date.now()
    ;(e.currentTarget as Element).setPointerCapture(e.pointerId)
    if (!isUp && !forcePeekValue) startEditSpinner()
  }

  function onPointerMove(e: React.PointerEvent) {
    if (!swipeStart.current) return
    const dx = e.clientX - swipeStart.current.x
    const dy = e.clientY - swipeStart.current.y
    const absDx = Math.abs(dx)
    const absDy = Math.abs(dy)
    if (Math.max(absDx, absDy) < LOCK_THRESHOLD) {
      setSwipeDir(null)
      return
    }
    if (!killIt.current) stopEditSpinner()
    if (isUp) {
      setSwipeDir(absDy >= absDx ? (dy < 0 ? 'up' : 'down') : null)
    } else if (forcePeekValue) {
      setSwipeDir(absDx >= absDy ? (dx < 0 ? 'left' : 'right') : null)
    }
  }

  function onPointerUp(e: React.PointerEvent) {
    if (!swipeStart.current) return
    const dx = e.clientX - swipeStart.current.x
    const dy = e.clientY - swipeStart.current.y
    swipeStart.current = null
    setSwipeDir(null)
    stopEditSpinner()

    const dist = Math.max(Math.abs(dx), Math.abs(dy))
    if (dist < SWIPE_THRESHOLD) {
      const held = Date.now() - pointerDownTime.current
      if (!isUp && !forcePeekValue && held >= EDIT_PEEK_LENGTH) onForcePeek()
      return
    }

    if (isUp) {
      if (Math.abs(dy) > Math.abs(dx)) {
        dy < 0 ? onSendToTop() : onSendToBottom()
      }
    } else if (forcePeekValue) {
      if (Math.abs(dx) > Math.abs(dy)) {
        dx < 0 ? onSlide(false) : onSlide(true)
      }
    }
  }

  function onPointerCancel() {
    swipeStart.current = null
    setSwipeDir(null)
    stopEditSpinner()
  }

  // ── Normal mode spinner ───────────────────────────────────────────────────

  function startSpinner() {
    if (isUp) return
    setProgress(0)
    killIt.current = false
    setShowSpinner(true)
    setTimeout(() => advanceSpinner(0), LONG_DELAY)
  }

  function advanceSpinner(amount: number) {
    if (killIt.current) return
    const newAmount = Math.min(amount + SEG_PERCENT + 1, 100)
    const ticks = Math.floor((LONG_LENGTH - LONG_DELAY) / (100 / SEG_PERCENT))
    setProgress(newAmount)
    if (newAmount !== 100) setTimeout(() => advanceSpinner(newAmount), ticks)
  }

  function stopSpinner(peeking = false) {
    setShowSpinner(false)
    killIt.current = true
    onPeekChange(peeking)
  }

  // ── Long-press handler (normal mode) ─────────────────────────────────────

  const normalModeHandlers = useLongPress(() => stopSpinner(true), {
    threshold: LONG_LENGTH,
    onStart: startSpinner,
    onCancel: () => {
      stopSpinner(false)
      if (refProgress.current === 0) {
        editModeOn ? onForcePeek() : onDraw()
      }
      setProgress(0)
    },
    onFinish: () => {
      stopSpinner(false)
      if (editModeOn) onForcePeek()
    },
    cancelOnMovement: 20,
  })

  return {
    normalModeHandlers,
    editModeHandlers: { onPointerDown, onPointerMove, onPointerUp, onPointerCancel },
    swipeDir,
    showSpinner,
    progress,
  }
}
