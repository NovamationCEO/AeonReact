import { Box } from '@mui/material'
import { CardStyle } from '../types/CardStyle'
import { CardValue } from '../types/CardValue'
import { Card } from './Card'
import { FaceDownCard } from './FaceDownCard'

export function CardRow(props: {
  revealed: CardValue[]
  cardStyle: CardStyle
  deckSize?: number
}) {
  const { revealed = [], cardStyle, deckSize = 6 } = props
  const faceDownCards = Array.from(Array(deckSize - revealed.length).keys())

  return (
    <Box
      border={'2px solid cyan'}
      width={'100%'}
      alignItems={'center'}
      position={'relative'}
      display={'grid'}
      gridTemplateColumns={'repeat(auto-fit, minmax(110px, 1fr))'}
      gap={'10px'}
      justifyItems={'center'}
    >
      {revealed.map((revealedValue, n) => {
        return <Card cardValue={revealedValue} cardStyle={cardStyle} key={n} />
      })}
      {faceDownCards.map((blankCard, j) => {
        return <FaceDownCard cardStyle={cardStyle} key={'b' + j} />
      })}
    </Box>
  )
}
