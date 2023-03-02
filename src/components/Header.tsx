import Box from '@mui/material/Box'
import { Colors } from '../theme/colors'

export function Header() {
  return (
    <Box
      width={'100vw'}
      bgcolor={Colors.header}
      fontFamily={'Gill Sans, Gill Sans MT, Calibri, Trebuchet MS, sans-serif'}
      color={Colors.aeonWhite}
      display={'flex'}
      lineHeight={'0.5em'}
      padding={'10px'}
    >
      Aeon's End
    </Box>
  )
}
