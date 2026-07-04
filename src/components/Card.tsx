import { CircularProgress, useTheme } from '@mui/material'
import React, { useContext } from 'react'
import Box from '@mui/material/Box'
import { useLongPress } from 'use-long-press'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faChevronDown,
  faChevronLeft,
  faChevronRight,
  faChevronUp,
} from '@fortawesome/free-solid-svg-icons'
import { cardStyles } from '../theme/cardStyles'
import { flameSets } from '../theme/flameSets'
import { z } from '../theme/z'
import { CardValue } from '../types/CardValue'
import { Flames } from './Flames'
import { DealerContext } from '../DealerContext'

const SWIPE_THRESHOLD = 45

export function Card(props: {
  cardValue: CardValue
  isUp: boolean
  currentIndex: number
}) {
  const { cardValue, isUp, currentIndex } = props
  const {
    cardStyle,
    drawCard,
    editModeOn,
    forcePeek,
    setForcePeek,
    deck,
    setDeck,
    deckIds,
    setDeckIds,
    deckIndex,
    setDeckIndex,
  } = useContext(DealerContext)

  const theme = useTheme()
  const [showSpinner, setShowSpinner] = React.useState(false)
  const [progress, setProgress] = React.useState(0)
  const [peek, setPeek] = React.useState(false)
  const [swipeDir, setSwipeDir] = React.useState<'up' | 'down' | 'left' | 'right' | null>(null)
  const killIt = React.useRef(false)
  const longLength = 1000
  const editPeekLength = 500
  const longDelay = 300
  const segPercent = 5
  const refProgress = React.useRef(0)
  const swipeStart = React.useRef<{ x: number; y: number } | null>(null)
  const pointerDownTime = React.useRef(0)

  React.useEffect(() => {
    refProgress.current = progress
  }, [progress])

  // ── Reorder operations ────────────────────────────────────────────────────

  function doSendToTop(arr: CardValue[]): CardValue[]
  function doSendToTop(arr: boolean[], setTrue: true): boolean[]
  function doSendToTop(arr: (CardValue | boolean)[], setTrue?: boolean) {
    const result = [...arr]
    if (setTrue) result[currentIndex] = true
    const [value] = result.splice(currentIndex, 1)
    result.splice(deckIndex, 0, value)
    return result
  }

  function sendToTop() {
    setForcePeek(doSendToTop(forcePeek, true))
    setDeckIndex(deckIndex - 1)
    setDeck(doSendToTop(deck))
    setDeckIds(prev => {
      const r = [...prev]
      const [v] = r.splice(currentIndex, 1)
      r.splice(deckIndex, 0, v)
      return r
    })
  }

  function doShift(arr: CardValue[], shift: number): CardValue[]
  function doShift(arr: boolean[], shift: number, setTrue: true): boolean[]
  function doShift(arr: (CardValue | boolean)[], shift: number, setTrue?: boolean) {
    const result = [...arr]
    if (setTrue) result[currentIndex] = true
    const [value] = result.splice(currentIndex, 1)
    result.splice(currentIndex + shift, 0, value)
    return result
  }

  function slide(isRight: boolean) {
    const shift = isRight ? 1 : -1
    setForcePeek(doShift(forcePeek, shift, true))
    setDeck(doShift(deck, shift))
    setDeckIds(prev => {
      const r = [...prev]
      const [v] = r.splice(currentIndex, 1)
      r.splice(currentIndex + shift, 0, v)
      return r
    })
  }

  function doSendToBottom(arr: CardValue[]): CardValue[]
  function doSendToBottom(arr: boolean[], setTrue: true): boolean[]
  function doSendToBottom(arr: (CardValue | boolean)[], setTrue?: boolean) {
    const result = [...arr]
    if (setTrue) result[currentIndex] = true
    const [value] = result.splice(currentIndex, 1)
    result.push(value)
    return result
  }

  function sendToBottom() {
    setDeckIndex(deckIndex - 1)
    setDeck(doSendToBottom(deck))
    setForcePeek(doSendToBottom(forcePeek, true))
    setDeckIds(prev => {
      const r = [...prev]
      const [v] = r.splice(currentIndex, 1)
      r.push(v)
      return r
    })
  }

  // ── Swipe gesture handlers ────────────────────────────────────────────────

  function startEditSpinner() {
    setProgress(0)
    killIt.current = false
    setShowSpinner(true)
    advanceEditSpinner(0)
  }

  function advanceEditSpinner(amount: number) {
    if (killIt.current) return
    const newAmount = Math.min(amount + segPercent + 1, 100)
    const ticks = Math.floor(editPeekLength / (100 / segPercent))
    setProgress(newAmount)
    if (newAmount !== 100) {
      setTimeout(() => advanceEditSpinner(newAmount), ticks)
    }
  }

  function stopEditSpinner() {
    killIt.current = true
    setShowSpinner(false)
    setProgress(0)
  }

  function onPointerDown(e: React.PointerEvent) {
    swipeStart.current = { x: e.clientX, y: e.clientY }
    pointerDownTime.current = Date.now()
    ;(e.currentTarget as Element).setPointerCapture(e.pointerId)
    if (!isUp && !forcePeek[currentIndex]) startEditSpinner()
  }

  function onPointerMove(e: React.PointerEvent) {
    if (!swipeStart.current) return
    const dx = e.clientX - swipeStart.current.x
    const dy = e.clientY - swipeStart.current.y
    const absDx = Math.abs(dx)
    const absDy = Math.abs(dy)
    if (Math.max(absDx, absDy) < 12) {
      setSwipeDir(null)
      return
    }
    // Movement detected — a swipe is in progress, not a hold
    if (!killIt.current) stopEditSpinner()
    if (isUp) {
      setSwipeDir(absDy >= absDx ? (dy < 0 ? 'up' : 'down') : null)
    } else if (forcePeek[currentIndex]) {
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
      if (!isUp && !forcePeek[currentIndex] && held >= editPeekLength) forcePeekMe()
      return
    }

    if (isUp) {
      if (Math.abs(dy) > Math.abs(dx)) {
        dy < 0 ? sendToTop() : sendToBottom()
      }
    } else if (forcePeek[currentIndex]) {
      if (Math.abs(dx) > Math.abs(dy)) {
        dx < 0 ? slide(false) : slide(true)
      }
    }
  }

  function onPointerCancel() {
    swipeStart.current = null
    setSwipeDir(null)
    stopEditSpinner()
  }

  // ── Long-press / draw (normal mode only) ──────────────────────────────────

  function forcePeekMe() {
    const newForcePeek = [...forcePeek]
    newForcePeek[currentIndex] = true
    setForcePeek(newForcePeek)
  }

  function startSpinner() {
    if (isUp) return
    setProgress(0)
    killIt.current = false
    setShowSpinner(true)
    setTimeout(() => advanceSpinner(0), longDelay)
  }

  function advanceSpinner(amount: number) {
    if (killIt.current) return
    const newAmount = Math.min(amount + segPercent + 1, 100)
    const ticks = Math.floor((longLength - longDelay) / (100 / segPercent))
    setProgress(newAmount)
    if (newAmount !== 100) {
      setTimeout(() => advanceSpinner(newAmount), ticks)
    }
  }

  function updateSpinner(peekStatus: boolean = false) {
    setShowSpinner(false)
    killIt.current = true
    setPeek(peekStatus)
  }

  const onPress = useLongPress(() => updateSpinner(true), {
    threshold: longLength,
    onStart: startSpinner,
    onCancel: () => {
      updateSpinner(false)
      if (refProgress.current === 0) {
        if (editModeOn) {
          forcePeekMe()
        } else {
          drawCard()
        }
      }
      setProgress(0)
    },
    onFinish: () => {
      updateSpinner(false)
      if (editModeOn) forcePeekMe()
    },
    cancelOnMovement: 20,
  })

  // ── Derived display state ─────────────────────────────────────────────────

  const showUpDown = editModeOn && isUp
  const showLeftRight = editModeOn && !isUp && forcePeek[currentIndex]
  const showPeekOverlay = (peek || forcePeek[currentIndex]) && !isUp

  function chevronColor(dir: 'up' | 'down' | 'left' | 'right') {
    if (swipeDir === dir) return 'rgba(255,255,255,1.0)'
    if (swipeDir !== null) return 'rgba(255,255,255,0.25)'
    return 'rgba(255,255,255,0.65)'
  }

  function chevronScale(dir: 'up' | 'down' | 'left' | 'right') {
    return swipeDir === dir ? 'scale(1.4)' : 'scale(1)'
  }

  const numberSx = {
    fontWeight: 'bold',
    fontSize: `${710 - 100 * cardValue.length}%`,
    alignSelf: 'center',
    display: 'flex',
    color: 'white',
    zIndex: z.cardNumber,
    position: 'relative' as const,
    textShadow:
      '-1px -1px 15px darkslategray,' +
      '1px -1px 15px darkslategray, -1px 1px 25px darkslategray,' +
      '1px 1px 15px darkslategray',
    [theme.breakpoints.down('sm')]: {
      textShadow:
        '-1px -1px 10px darkslategray,' +
        '1px -1px 10px darkslategray, -1px 1px 5px darkslategray,' +
        '1px 1px 10px darkslategray',
    },
    transition: '0.5s ease text-shadow',
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minWidth: '110px',
        position: 'relative',
        maxWidth: '350px',
        width: '100%',
        zIndex: z.card,
      }}
    >
      <Box
        sx={{
          width: '100%',
          height: '100%',
          userSelect: 'none',
          touchAction: editModeOn ? 'none' : 'auto',
        }}
        {...(editModeOn
          ? { onPointerDown, onPointerMove, onPointerUp, onPointerCancel }
          : onPress())}
      >
        {/* Spinner overlay */}
        <Box
          sx={{
            position: 'absolute',
            left: 0,
            top: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: z.leftMenu,
            color: 'white',
            opacity: showSpinner ? 1 : 0,
            transition: '0.3s ease opacity',
            pointerEvents: 'none',
          }}
        >
          <CircularProgress variant="determinate" value={progress} size={80} />
        </Box>

        {/* Aspect-ratio card container — transparent, no clip; faces carry the shadow */}
        <Box
          sx={{
            position: 'relative',
            display: 'flex',
            height: 0,
            paddingTop: '75%',
            paddingBottom: '75%',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            transition: 'transform 0.2s ease',
            '&:hover': { transform: 'translateY(-3px)' },
          }}
        >
          {/* Perspective wrapper */}
          <Box
            sx={{
              position: 'absolute',
              top: 0, left: 0, right: 0, bottom: 0,
              perspective: '800px',
            }}
          >
            {/* Flip inner — rotates to reveal front vs back face */}
            <Box
              sx={{
                position: 'absolute',
                top: 0, left: 0, right: 0, bottom: 0,
                transformStyle: 'preserve-3d',
                WebkitTransformStyle: 'preserve-3d',
                transform: isUp ? 'rotateY(180deg)' : 'rotateY(0deg)',
                transition: 'transform 0.55s ease',
              }}
            >
              {/* Back face: dark card pattern (shown when face-down) */}
              <Box
                sx={{
                  position: 'absolute',
                  top: 0, left: 0, right: 0, bottom: 0,
                  borderRadius: '12px',
                  overflow: 'hidden',
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                  boxShadow: '0 6px 20px rgba(0,0,0,0.55), 0 2px 6px rgba(0,0,0,0.3)',
                }}
              >
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0, left: 0, right: 0, bottom: 0,
                    ...cardStyles[cardStyle](),
                  }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0, left: 0, right: 0, bottom: 0,
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.13) 0%, rgba(255,255,255,0.05) 35%, transparent 60%)',
                    pointerEvents: 'none',
                  }}
                />
              </Box>

              {/* Front face: colored pattern + flames + number (shown when face-up) */}
              <Box
                sx={{
                  position: 'absolute',
                  top: 0, left: 0, right: 0, bottom: 0,
                  borderRadius: '12px',
                  overflow: 'hidden',
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)',
                  boxShadow: '0 6px 20px rgba(0,0,0,0.55), 0 2px 6px rgba(0,0,0,0.3)',
                }}
              >
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0, left: 0, right: 0, bottom: 0,
                    ...cardStyles[cardStyle](flameSets[cardValue][3]),
                  }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0, left: 0, right: 0, bottom: 0,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Flames cardValue={cardValue} />
                  <Box sx={numberSx}>{cardValue}</Box>
                </Box>
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0, left: 0, right: 0, bottom: 0,
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.13) 0%, rgba(255,255,255,0.05) 35%, transparent 60%)',
                    pointerEvents: 'none',
                  }}
                />
              </Box>
            </Box>
          </Box>


          {/* Peek overlay: colored card face + number, no flip, no flames */}
          {showPeekOverlay && (
            <Box
              sx={{
                position: 'absolute',
                top: 0, left: 0, right: 0, bottom: 0,
                borderRadius: '12px',
                overflow: 'hidden',
              }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  top: 0, left: 0, right: 0, bottom: 0,
                  ...cardStyles[cardStyle](flameSets[cardValue][3]),
                }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  top: 0, left: 0, right: 0, bottom: 0,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Box sx={numberSx}>{cardValue}</Box>
              </Box>
            </Box>
          )}

          {/* Edit mode: up/down swipe affordances for face-up cards */}
          {showUpDown && (
            <>
              <Box
                sx={{
                  position: 'absolute',
                  top: '10px',
                  left: '50%',
                  transform: `translateX(-50%) ${chevronScale('up')}`,
                  transition: 'transform 0.1s ease, color 0.1s ease',
                  color: chevronColor('up'),
                  pointerEvents: 'none',
                  zIndex: z.editOverlay,
                  filter: 'drop-shadow(0 1px 4px rgba(0,0,0,0.9))',
                }}
              >
                <FontAwesomeIcon icon={faChevronUp} />
              </Box>
              <Box
                sx={{
                  position: 'absolute',
                  bottom: '10px',
                  left: '50%',
                  transform: `translateX(-50%) ${chevronScale('down')}`,
                  transition: 'transform 0.1s ease, color 0.1s ease',
                  color: chevronColor('down'),
                  pointerEvents: 'none',
                  zIndex: z.editOverlay,
                  filter: 'drop-shadow(0 1px 4px rgba(0,0,0,0.9))',
                }}
              >
                <FontAwesomeIcon icon={faChevronDown} />
              </Box>
            </>
          )}

          {/* Edit mode: left/right swipe affordances for known face-down cards */}
          {showLeftRight && (
            <>
              <Box
                sx={{
                  position: 'absolute',
                  left: '10px',
                  top: '50%',
                  transform: `translateY(-50%) ${chevronScale('left')}`,
                  transition: 'transform 0.1s ease, color 0.1s ease',
                  color: chevronColor('left'),
                  pointerEvents: 'none',
                  zIndex: z.editOverlay,
                  filter: 'drop-shadow(0 1px 4px rgba(0,0,0,0.9))',
                }}
              >
                <FontAwesomeIcon icon={faChevronLeft} />
              </Box>
              <Box
                sx={{
                  position: 'absolute',
                  right: '10px',
                  top: '50%',
                  transform: `translateY(-50%) ${chevronScale('right')}`,
                  transition: 'transform 0.1s ease, color 0.1s ease',
                  color: chevronColor('right'),
                  pointerEvents: 'none',
                  zIndex: z.editOverlay,
                  filter: 'drop-shadow(0 1px 4px rgba(0,0,0,0.9))',
                }}
              >
                <FontAwesomeIcon icon={faChevronRight} />
              </Box>
            </>
          )}
        </Box>
      </Box>
    </Box>
  )
}
