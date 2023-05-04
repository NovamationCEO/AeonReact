import { Box } from '@mui/material'
import { Card } from './Card'
import { useContext } from 'react'
import { DealerContext } from '../DealerContext'

export function CardRow() {
  const { deck, deckIndex } = useContext(DealerContext)

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
        gridTemplateColumns={'repeat(auto-fit, minmax(120px, 1fr))'}
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
