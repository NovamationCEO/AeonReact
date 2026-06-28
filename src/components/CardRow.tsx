import { Box, useMediaQuery } from '@mui/material'
import { Card } from './Card'
import { useContext } from 'react'
import { DealerContext } from '../DealerContext'

export function CardRow() {
  const { deck, deckIndex } = useContext(DealerContext)
  const smallScreen = useMediaQuery('(max-width: 499px)')
  const columnValues = `repeat(auto-fit, minmax(${smallScreen ? '98' : '120'}px, 1fr))`

  return (
    <Box
      height={'100%'}
      alignContent={'center'}
      display={'flex'}
      flexWrap={'wrap'}
      margin={'10px'}
    >
      <Box
        alignItems={'center'}
        position={'relative'}
        display={'grid'}
        gridTemplateColumns={columnValues}
        gridAutoRows={'min-content'}
        gap={'10px'}
        justifyItems={'center'}
        flex={3}
      >
        {deck.map((cardValue, n) => {
          return (
            <Card
              cardValue={cardValue}
              key={n}
              isUp={deckIndex >= n}
              currentIndex={n}
            />
          )
        })}
      </Box>
    </Box>
  )
}
