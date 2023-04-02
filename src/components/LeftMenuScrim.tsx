import { Box } from '@mui/material'
import { z } from '../theme/z'
import { useContext } from 'react'
import { DealerContext } from '../DealerContext'

export function LeftMenuScrim() {
  const Context = useContext(DealerContext)

  return (
    <Box
      width={'100%'}
      height={'100%'}
      bgcolor="black"
      onClick={() => Context.setMenuVisible(false)}
      position={'absolute'}
      left={0}
      right={0}
      zIndex={z.scrim}
      sx={{
        opacity: Context.menuVisible ? 0.7 : 0,
        transition: '0.75s ease opacity',
        pointerEvents: Context.menuVisible ? 'auto' : 'none',
      }}
    />
  )
}
