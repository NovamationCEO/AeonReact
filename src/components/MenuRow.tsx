import { Box } from '@mui/material'
import { Colors } from '../theme/colors'

export function MenuRow(props: { children: any; colWidth?: string }) {
  const { children, colWidth = '50px' } = props
  return (
    <Box
      display={'grid'}
      gridAutoRows={'60px'}
      gridTemplateColumns={`repeat(auto-fill, ${colWidth})`}
      gap={'10px'}
      alignItems={'center'}
      padding={'10px'}
      borderRadius={'40px'}
      bgcolor={Colors.menuDark}
      margin={'5px'}
    >
      {children}
    </Box>
  )
}
