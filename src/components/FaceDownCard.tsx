import Box from '@mui/material/Box'
import { cardStyles } from '../theme/cardStyles'
import { z } from '../theme/z'
import { CardStyle } from '../types/CardStyle'

export function FaceDownCard(props: { cardStyle: CardStyle }) {
  const { cardStyle } = props
  return (
    <Box
      display={'flex'}
      justifyContent={'center'}
      alignItems={'center'}
      minWidth={'110px'}
      position={'relative'}
      maxWidth={'300px'}
      width={'100%'}
      zIndex={z.card}
    >
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
          sx={cardStyles[cardStyle]()}
          paddingTop={'75%'}
          paddingBottom={'75%'}
          justifyContent={'center'}
          alignItems={'center'}
        />
      </Box>
    </Box>
  )
}
