import { Box } from '@mui/material'
import { cardStyles } from '../theme/cardStyles'
import { Colors } from '../theme/colors'
import { CardStyle } from '../types/CardStyle'

export function StyleButton(props: {
  cardStyle: CardStyle
  targetStyle: CardStyle
  setCardStyle: (cs: CardStyle) => void
}) {
  const { cardStyle, targetStyle, setCardStyle } = props
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
