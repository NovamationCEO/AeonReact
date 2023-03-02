import { useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import { cardStyles } from '../theme/cardStyles'
import { flameSets } from '../theme/flameSets'
import { z } from '../theme/z'
import { CardStyle } from '../types/CardStyle'
import { CardValue } from '../types/CardValue'
import { Flames } from './Flames'

export function Card(props: { cardValue: CardValue; cardStyle: CardStyle }) {
  const { cardValue, cardStyle } = props
  const theme = useTheme()
  return (
    <Box
      display={'flex'}
      justifyContent={'center'}
      alignItems={'center'}
      minWidth={'120px'}
      position={'relative'}
      maxWidth={'350px'}
      width={'12%'}
      zIndex={z.card}
      sx={{ userSelect: 'none' }}
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
          sx={cardStyles[cardStyle](flameSets[cardValue][3])}
          paddingTop={'75%'}
          paddingBottom={'75%'}
          justifyContent={'center'}
          alignItems={'center'}
        />
        <Flames cardValue={cardValue} />
        <Box
          fontWeight={'bold'}
          fontSize={'80px'}
          alignSelf={'center'}
          display={'flex'}
          color={'white'}
          zIndex={z.cardNumber}
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
      </Box>
    </Box>
  )
}
