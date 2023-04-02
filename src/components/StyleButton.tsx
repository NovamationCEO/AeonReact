import { Box } from '@mui/material'
import { cardStyles } from '../theme/cardStyles'
import { Colors } from '../theme/colors'
import { CardStyle } from '../types/CardStyle'
import { useContext } from 'react'
import { DealerContext } from '../DealerContext'

export function StyleButton(props: { targetStyle: CardStyle }) {
  const { targetStyle } = props
  const { cardStyle, setCardStyle } = useContext(DealerContext)

  return (
    <Box
      display={'flex'}
      borderRadius={'50%'}
      width={'50px'}
      height={'50px'}
      sx={cardStyles[targetStyle]('gray')}
      onClick={() => setCardStyle(targetStyle)}
      border={`3px solid ${
        cardStyle === targetStyle ? Colors.selectedItem : Colors.menuDark
      }`}
    />
  )
}
