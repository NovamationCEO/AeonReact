import { Box } from '@mui/material'
import { useContext } from 'react'
import { DealerContext } from '../DealerContext'

export function IntensityWidget() {
  const { nemesisDeck, intensityValue, setIntensityValue } = useContext(DealerContext)

  if (nemesisDeck !== 'intensity') return null

  const dec = () => setIntensityValue(v => Math.max(1, v - 1))
  const inc = () => setIntensityValue(v => Math.min(6, v + 1))

  const btnSx = (disabled: boolean) => ({
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.3em',
    fontWeight: 'bold',
    cursor: disabled ? 'default' : 'pointer',
    color: disabled ? 'rgba(200,100,40,0.35)' : 'rgba(255,150,60,0.9)',
    userSelect: 'none' as const,
    transition: '0.15s ease color',
    lineHeight: 1,
  })

  return (
    <Box
      sx={{
        position: 'absolute',
        top: 10,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        gap: '2px',
        bgcolor: 'rgba(10, 4, 2, 0.78)',
        border: '1px solid rgba(180, 60, 20, 0.45)',
        borderRadius: '22px',
        padding: '3px 8px',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        boxShadow: '0 2px 12px rgba(0,0,0,0.5)',
        whiteSpace: 'nowrap',
      }}
    >
      <Box onClick={intensityValue > 1 ? dec : undefined} sx={btnSx(intensityValue <= 1)}>
        −
      </Box>
      <Box
        sx={{
          color: 'rgba(255,200,140,0.95)',
          fontSize: '1.25em',
          fontWeight: 'bold',
          fontFamily: 'sans-serif',
          minWidth: '1.6em',
          textAlign: 'center',
          letterSpacing: '-0.02em',
        }}
      >
        {intensityValue}
      </Box>
      <Box onClick={intensityValue < 6 ? inc : undefined} sx={btnSx(intensityValue >= 6)}>
        +
      </Box>
    </Box>
  )
}
