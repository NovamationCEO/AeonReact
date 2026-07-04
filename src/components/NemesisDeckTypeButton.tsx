import { Box } from '@mui/material'
import { Colors } from '../theme/colors'
import { NemesisDeckType } from '../types/DeckType'
import { DealerContext } from '../DealerContext'
import { useContext } from 'react'

export function NemesisDeckTypeButton(props: {
  targetDeck: NemesisDeckType
  title: string
}) {
  const { targetDeck, title } = props
  const { nemesisDeck, setNemesisDeck } = useContext(DealerContext)

  const isOn = nemesisDeck === targetDeck
  return (
    <Box
      onClick={() => setNemesisDeck(targetDeck)}
      sx={{
        display: 'flex',
        borderRadius: '25px',
        height: '50px',
        border: `3px solid ${isOn ? '#f0b840' : 'rgba(255, 255, 255, 0.2)'}`,
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'sans-serif',
        fontSize: { xs: '15px', sm: '20px' },
        color: 'rgba(255, 255, 255, 0.9)',
        bgcolor: isOn ? 'rgba(240, 184, 64, 0.15)' : 'rgba(255, 255, 255, 0.06)',
        cursor: 'pointer',
      }}
    >
      <Box>{title}</Box>
    </Box>
  )
}
