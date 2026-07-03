import { useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Box, IconButton } from '@mui/material'
import {
  faArrowCircleLeft,
  faArrowCircleRight,
  faLayerGroup,
} from '@fortawesome/free-solid-svg-icons'
import { z } from '../theme/z'
import { DealerContext } from '../DealerContext'
import { Colors } from '../theme/colors'
import { CardValue } from '../types/CardValue'

export function EditOverlay(props: { currentIndex: number }) {
  const { currentIndex } = props
  const { deck, setDeck, deckIndex, setDeckIndex, forcePeek, setForcePeek } =
    useContext(DealerContext)
  const isUp = currentIndex <= deckIndex

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
    setDeckIndex(Math.max(deckIndex - 1, 0))
    setDeck(doSendToTop(deck))
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
    setDeckIndex(Math.max(deckIndex - 1, 0))
    setDeck(doSendToBottom(deck))
    setForcePeek(doSendToBottom(forcePeek, true))
  }

  if (isUp) {
    return (
      <Box sx={{ zIndex: z.editOverlay }}>
        <IconButton
          sx={{
            position: 'absolute',
            top: '3px',
            left: 'calc(50% - 20px)',
            background: 'black',
            outline: '2px solid black',
          }}
          size={'medium'}
          onClick={sendToTop}
        >
          <FontAwesomeIcon
            icon={faLayerGroup}
            size={'1x'}
            color={Colors.aeonWhite}
          />
        </IconButton>
        <IconButton
          sx={{
            position: 'absolute',
            bottom: '3px',
            left: 'calc(50% - 20px)',
            background: 'black',
            outline: '2px solid black',
          }}
          size={'medium'}
          onClick={sendToBottom}
        >
          <FontAwesomeIcon
            icon={faLayerGroup}
            rotation={180}
            size={'1x'}
            color={Colors.aeonWhite}
          />
        </IconButton>
      </Box>
    )
  }

  if (forcePeek[currentIndex]) {
    return (
      <Box sx={{ zIndex: z.editOverlay }}>
        <IconButton
          sx={{
            position: 'absolute',
            left: '3px',
            top: 'calc(50% - 20px)',
            background: 'black',
            outline: '2px solid black',
          }}
          size={'medium'}
          onClick={() => slide(false)}
        >
          <FontAwesomeIcon
            icon={faArrowCircleLeft}
            size={'1x'}
            color={Colors.aeonWhite}
          />
        </IconButton>

        <IconButton
          sx={{
            position: 'absolute',
            right: '3px',
            top: 'calc(50% - 20px)',
            background: 'black',
            outline: '2px solid black',
          }}
          size={'medium'}
          onClick={() => slide(true)}
        >
          <FontAwesomeIcon
            icon={faArrowCircleRight}
            size={'1x'}
            color={Colors.aeonWhite}
          />
        </IconButton>
      </Box>
    )
  }

  return null
}
