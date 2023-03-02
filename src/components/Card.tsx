import { useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import { cardStyles } from '../theme/cardStyles'
import { flameSets } from '../theme/flameSets'
import { z } from '../theme/z'
import { Flames } from './Flames'

export function Card(props: { cardValue: keyof typeof flameSets }) {
  const { cardValue } = props
  const theme = useTheme()
  return (
    <Box
      display={'flex'}
      justifyContent={'center'}
      alignItems={'center'}
      minWidth={'120px'}
      position={'relative'}
      maxWidth={'300px'}
      width={'12%'}
      zIndex={z.card}
    >
      <Box
        position={'relative'}
        display={'flex'}
        height={0}
        paddingTop={'75%'}
        paddingBottom={'75%'}
        border={'1px solid blue'}
        width={'100%'}
        justifyContent={'center'}
        alignItems={'center'}
        // bgcolor={Colors.card}
      >
        <Box
          position={'absolute'}
          left={0}
          top={0}
          width={'100%'}
          height={0}
          sx={cardStyles.loops}
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
          }}
        >
          {cardValue}
        </Box>
      </Box>
    </Box>
  )
}
