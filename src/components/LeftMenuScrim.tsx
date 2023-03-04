import { Box } from '@mui/material'
import { z } from '../theme/z'

export function LeftMenuScrim(props: {
  menuVisible: boolean
  menuOff: () => void
}) {
  const { menuVisible, menuOff } = props

  return (
    <Box
      width={'100%'}
      height={'100%'}
      bgcolor="black"
      onClick={menuOff}
      position={'absolute'}
      left={0}
      right={0}
      zIndex={z.scrim}
      sx={{
        opacity: menuVisible ? 0.7 : 0,
        transition: '0.75s ease opacity',
        pointerEvents: menuVisible ? 'auto' : 'none',
      }}
    />
  )
}
