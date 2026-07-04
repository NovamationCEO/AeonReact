import { Box } from '@mui/material'
import { useContext } from 'react'
import { DealerContext } from '../DealerContext'
import { nemesisVariants } from '../constants/nemesisVariants'
import { INTENSITY_MIN, INTENSITY_MAX } from '../constants/intensity'

export function IntensityWidget() {
  const { nemesisDeck, intensityValue, setIntensityValue } = useContext(DealerContext)

  if (!nemesisVariants[nemesisDeck].hasIntensity) return null

  const atMax = intensityValue >= INTENSITY_MAX
  const warning = intensityValue >= INTENSITY_MAX - 1  // 5 or 6

  const dec = () => setIntensityValue(v => Math.max(INTENSITY_MIN, v - 1))
  const inc = () => setIntensityValue(v => Math.min(INTENSITY_MAX, v + 1))

  const accentColor = warning ? 'rgba(255,80,50,0.9)' : 'rgba(255,150,60,0.9)'
  const dimColor = warning ? 'rgba(200,80,50,0.3)' : 'rgba(200,100,40,0.35)'
  const borderColor = warning
    ? 'rgba(220,60,30,0.65)'
    : 'rgba(180,60,20,0.45)'

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
    color: disabled ? dimColor : accentColor,
    userSelect: 'none' as const,
    transition: '0.2s ease color',
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
        flexDirection: 'column',
        alignItems: 'center',
        gap: '2px',
      }}
    >
      <Box
        sx={{
          fontSize: '0.52em',
          fontFamily: 'sans-serif',
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: warning ? 'rgba(255,120,80,0.75)' : 'rgba(200,120,60,0.65)',
          transition: '0.3s ease color',
          userSelect: 'none',
        }}
      >
        Intensity
      </Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '2px',
          bgcolor: 'rgba(10,4,2,0.78)',
          border: `1px solid ${borderColor}`,
          borderRadius: '22px',
          padding: '3px 8px',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          boxShadow: warning
            ? '0 2px 12px rgba(200,40,20,0.35)'
            : '0 2px 12px rgba(0,0,0,0.5)',
          transition: '0.3s ease border-color, 0.3s ease box-shadow',
          whiteSpace: 'nowrap',
        }}
      >
        <Box
          onClick={intensityValue > INTENSITY_MIN ? dec : undefined}
          sx={btnSx(intensityValue <= INTENSITY_MIN)}
        >
          −
        </Box>
        <Box
          key={intensityValue}
          sx={{
            color: warning ? 'rgba(255,140,100,0.97)' : 'rgba(255,200,140,0.95)',
            fontSize: '1.25em',
            fontWeight: 'bold',
            fontFamily: 'sans-serif',
            minWidth: '1.6em',
            textAlign: 'center',
            letterSpacing: '-0.02em',
            animation: 'intensityPop 0.32s cubic-bezier(0.34,1.56,0.64,1)',
            transition: '0.3s ease color',
          }}
        >
          {intensityValue}
        </Box>
        <Box
          onClick={!atMax ? inc : undefined}
          sx={btnSx(atMax)}
        >
          +
        </Box>
      </Box>
    </Box>
  )
}
