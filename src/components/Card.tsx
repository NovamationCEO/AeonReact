import { CircularProgress, useTheme } from '@mui/material'
import React from 'react'
import Box from '@mui/material/Box'
import { useLongPress } from 'use-long-press'
import { cardStyles } from '../theme/cardStyles'
import { flameSets } from '../theme/flameSets'
import { z } from '../theme/z'
import { CardStyle } from '../types/CardStyle'
import { CardValue } from '../types/CardValue'
import { Flames } from './Flames'

export function Card(props: {
  cardValue: CardValue
  cardStyle: CardStyle
  isUp: boolean
  drawCard: () => void
}) {
  const { cardValue, cardStyle, isUp, drawCard } = props
  const theme = useTheme()
  const [showSpinner, setShowSpinner] = React.useState(false)
  const [progress, setProgress] = React.useState(0)
  const [peek, setPeek] = React.useState(false)
  const killIt = React.useRef(false)
  const longLength = 1600
  const longDelay = 300
  const segPercent = 5

  const refProgress = React.useRef(0)

  React.useEffect(() => {
    refProgress.current = progress
  }, [progress])

  function startSpinner() {
    if (isUp) return
    setProgress(0)
    killIt.current = false
    setShowSpinner(true)
    setTimeout(() => advanceSpinner(0), longDelay)
  }

  function advanceSpinner(amount: number) {
    if (killIt.current) {
      return
    }

    const newAmount = Math.min(amount + segPercent + 1, 100)
    const ticks = Math.floor((longLength - longDelay) / (100 / segPercent))
    setProgress(newAmount)

    if (newAmount !== 100) {
      setTimeout(() => {
        advanceSpinner(newAmount)
      }, ticks)
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
        drawCard()
      }
      setProgress(0)
    },
    onFinish: () => {
      updateSpinner(false)
    },
    cancelOnMovement: 20,
  })

  return (
    <Box
      display={'flex'}
      justifyContent={'center'}
      alignItems={'center'}
      minWidth={'110px'}
      position={'relative'}
      maxWidth={'350px'}
      width={'100%'}
      zIndex={z.card}
      sx={{ userSelect: 'none' }}
      {...onPress()}
    >
      <Box
        position={'absolute'}
        left={0}
        top={0}
        width={'100%'}
        height={'100%'}
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
        zIndex={z.leftMenu}
        color={'white'}
        sx={{ opacity: showSpinner ? 1 : 0, transition: '0.3s ease opacity' }}
      >
        <CircularProgress variant="determinate" value={progress} size={80} />
      </Box>
      <Box
        position={'relative'}
        display={'flex'}
        height={0}
        paddingTop={'75%'}
        paddingBottom={'75%'}
        width={'100%'}
        justifyContent={'center'}
        alignItems={'center'}
        overflow={'hidden'}
      >
        <Box
          position={'absolute'}
          display={'flex'}
          left={0}
          top={0}
          width={'100%'}
          height={0}
          sx={
            isUp || peek
              ? cardStyles[cardStyle](flameSets[cardValue][3])
              : cardStyles[cardStyle]()
          }
          paddingTop={'75%'}
          paddingBottom={'75%'}
          justifyContent={'center'}
          alignItems={'center'}
        />
        {(isUp || peek) && (
          <div>
            {isUp && <Flames cardValue={cardValue} />}
            <Box
              fontWeight={'bold'}
              fontSize={'80px'}
              alignSelf={'center'}
              display={'flex'}
              color={'white'}
              zIndex={z.cardNumber}
              position={'relative'}
              sx={{
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
              }}
            >
              {cardValue}
            </Box>
          </div>
        )}
      </Box>
    </Box>
  )
}
