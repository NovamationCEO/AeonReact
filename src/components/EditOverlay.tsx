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

  function sendToTop() {
    const tempDeck = [...deck]
    const value = tempDeck.splice(currentIndex, 1)
    tempDeck.splice(deckIndex, 0, value[0])
    const newPeek = [...forcePeek]
    newPeek[currentIndex] = true
    setForcePeek(newPeek)
    setDeckIndex(Math.max(deckIndex - 1, 0))
    setDeck(tempDeck)
  }
  function sendLeft() {
    console.log('LEFT')
  }
  function sendRight() {
    console.log('RIGHT')
  }
  function sendToBottom() {
    const tempDeck = [...deck]
    const value = tempDeck.splice(currentIndex, 1)
    tempDeck.push(value[0])
    setDeckIndex(Math.max(deckIndex - 1, 0))
    setDeck(tempDeck)
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
        onClick={sendLeft}
      >
        <FontAwesomeIcon icon={faArrowCircleLeft} size={'1x'} color={'white'} />
      </IconButton>

      <IconButton
        sx={{
          position: 'absolute',
          right: '3px',
          top: 'calc(50% - 20px)',
          background: 'black',
        }}
        size={'medium'}
        onClick={sendRight}
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
