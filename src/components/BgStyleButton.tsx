import { Box } from '@mui/material'
import { backgroundStyles } from '../theme/backgroundStyles'
import { BgStyle } from '../types/BgStyle'
import { useContext } from 'react'
import { DealerContext } from '../DealerContext'

export function BgStyleButton({ targetStyle }: { targetStyle: BgStyle }) {
  const { bgStyle, setBgStyle } = useContext(DealerContext)
  return (
    <Box
      onClick={() => setBgStyle(targetStyle)}
      sx={{
        display: 'flex',
        borderRadius: '50%',
        width: '50px',
        height: '50px',
        border: `3px solid ${bgStyle === targetStyle ? '#f0b840' : 'rgba(255, 255, 255, 0.2)'}`,
        ...backgroundStyles[targetStyle](),
        cursor: 'pointer',
      }}
    />
  )
}
