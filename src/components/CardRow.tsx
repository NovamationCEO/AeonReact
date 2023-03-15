import { Box } from '@mui/material'
import { CardStyle } from '../types/CardStyle'
import { CardValue } from '../types/CardValue'
import { Card } from './Card'
import { FaceDownCard } from './FaceDownCard'

export function CardRow(props: {
  revealed: CardValue[]
  cardStyle: CardStyle
  deckSize?: number
  drawCard: () => void
}) {
  const { revealed = [], cardStyle, deckSize = 6, drawCard } = props
  const faceDownCards = Array.from(Array(deckSize - revealed.length).keys())

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
        onClick={drawCard}
      >
        {revealed.map((revealedValue, n) => {
          return (
            <Card cardValue={revealedValue} cardStyle={cardStyle} key={n} />
          )
        })}
        {faceDownCards.map((_blankCard, j) => {
          return <Card cardStyle={cardStyle} key={'b' + j} />
        })}
      </Box>
    </Box>
  )
}
