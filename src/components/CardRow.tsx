import { Box } from '@mui/material'
import { CardStyle } from '../types/CardStyle'
import { CardValue } from '../types/CardValue'
import { Card } from './Card'

export function CardRow(props: {
  deck: CardValue[]
  deckIndex: number
  cardStyle: CardStyle
  drawCard: () => void
}) {
  const { deck, cardStyle, deckIndex, drawCard } = props

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
              cardStyle={cardStyle}
              key={n}
              isUp={deckIndex >= n}
              drawCard={drawCard}
            />
          )
        })}
      </Box>
    </Box>
  )
}
