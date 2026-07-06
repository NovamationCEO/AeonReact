import { Box } from '@mui/material'
import { z } from '../theme/z'
import { useContext } from 'react'
import { DealerContext } from '../DealerContext'

export function LeftMenuScrim() {
  const Context = useContext(DealerContext)

  return (
    <Box
      onClick={() => Context.setMenuVisible(false)}
      sx={{
        width: '100%',
        height: '100%',
        bgcolor: 'black',
        position: 'absolute',
        left: 0,
        right: 0,
        zIndex: z.scrim,
        opacity: Context.menuVisible !== false ? 0.7 : 0,
        transition: '0.75s ease opacity',
        pointerEvents: Context.menuVisible !== false ? 'auto' : 'none',
      }}
    />
  )
}
