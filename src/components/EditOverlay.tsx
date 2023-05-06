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

export function EditOverlay(props: { currentIndex: number }) {
  const { currentIndex } = props
  const { deck, setDeck, deckIndex, setDeckIndex, forcePeek, setForcePeek } =
    useContext(DealerContext)
  const isUp = currentIndex <= deckIndex

  function doSendToTop(deckArr: any[], setTrue?: boolean) {
    const tempDeck = [...deckArr]
    if (setTrue) {
      tempDeck[currentIndex] = true
    }
    const value = tempDeck.splice(currentIndex, 1)
    tempDeck.splice(deckIndex, 0, value[0])
    return tempDeck
  }

  function sendToTop() {
    const newDeck = doSendToTop(deck)
    const newPeek = doSendToTop(forcePeek, true)

    setForcePeek(newPeek)
    setDeckIndex(Math.max(deckIndex - 1, 0))
    setDeck(newDeck)
  }

  function doShift(deckArr: any[], shift: number, setTrue?: boolean) {
    const tempDeck = [...deckArr]
    if (setTrue) {
      tempDeck[currentIndex] = true
    }
    const value = tempDeck.splice(currentIndex, 1)
    tempDeck.splice(currentIndex + shift, 0, value[0])
    return tempDeck
  }

  function slide(isRight: boolean) {
    const shift = isRight ? 1 : -1
    const newDeck = doShift(deck, shift)
    const newPeek = doShift(forcePeek, shift, true)

    setForcePeek(newPeek)
    setDeck(newDeck)
  }

  function doSendToBottom(deckArr: any[], setTrue?: boolean) {
    const tempDeck = [...deckArr]
    if (setTrue) {
      tempDeck[currentIndex] = true
    }
    const value = tempDeck.splice(currentIndex, 1)
    tempDeck.push(value[0])
    return tempDeck
  }

  function sendToBottom() {
    const newDeck = doSendToBottom(deck)
    const newPeek = doSendToBottom(forcePeek, true)

    setDeckIndex(Math.max(deckIndex - 1, 0))
    setDeck(newDeck)
    setForcePeek(newPeek)
  }

  if (isUp) {
    return (
      <Box zIndex={z.editOverlay}>
        <IconButton
          sx={{
            position: 'absolute',
            top: '3px',
            left: 'calc(50% - 20px)',
            background: 'black',
            zIndex: z.editOverlay,
          }}
          size={'medium'}
          onClick={sendToTop}
        >
          <FontAwesomeIcon icon={faLayerGroup} size={'1x'} color={'white'} />
        </IconButton>
        <IconButton
          sx={{
            position: 'absolute',
            bottom: '3px',
            left: 'calc(50% - 20px)',
            background: 'black',
          }}
          size={'medium'}
          onClick={sendToBottom}
        >
          <FontAwesomeIcon
            icon={faLayerGroup}
            rotation={180}
            size={'1x'}
            color={'white'}
          />
        </IconButton>
      </Box>
    )
  }

  if (forcePeek[currentIndex]) {
    return (
      <Box zIndex={z.editOverlay}>
        <IconButton
          sx={{
            position: 'absolute',
            left: '3px',
            top: 'calc(50% - 20px)',
            background: 'black',
          }}
          size={'medium'}
          onClick={() => slide(false)}
        >
          <FontAwesomeIcon
            icon={faArrowCircleLeft}
            size={'1x'}
            color={'white'}
          />
        </IconButton>

        <IconButton
          sx={{
            position: 'absolute',
            right: '3px',
            top: 'calc(50% - 20px)',
            background: 'black',
          }}
          size={'medium'}
          onClick={() => slide(true)}
        >
          <FontAwesomeIcon
            icon={faArrowCircleRight}
            size={'1x'}
            color={'white'}
          />
        </IconButton>
      </Box>
    )
  }

  return null
}
