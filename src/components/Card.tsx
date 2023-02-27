import { useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import { Colors } from '../theme/colors'
import { z } from '../theme/z'
import { Flames } from './Flames'

export function Card(props: { value: string }) {
  const { value } = props
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
        bgcolor={Colors.card}
      >
        <Flames set={0} />
        <Box
          fontWeight={'bold'}
          fontSize={'60px'}
          alignSelf={'center'}
          display={'flex'}
          color={'white'}
          zIndex={z.cardNumber}
          sx={{
            textShadow:
              '-1px -1px 25px darkslategray,' +
              '1px -1px 25px darkslategray, -1px 1px 25px darkslategray,' +
              '1px 1px 25px darkslategray',
            [theme.breakpoints.down('sm')]: {
              textShadow:
                '-1px -1px 5px darkslategray,' +
                '1px -1px 5px darkslategray, -1px 1px 5px darkslategray,' +
                '1px 1px 5px darkslategray',
            },
          }}
        >
          {value}
        </Box>
      </Box>
    </Box>
  )
}
