import { Box } from '@mui/material'
import { Colors } from '../theme/colors'
import { DeckType } from '../types/DeckType'
import { useContext } from 'react'
import { DealerContext } from '../DealerContext'

export function DeckTypeButton(props: { targetDeck: DeckType; title: string }) {
  const { targetDeck, title } = props
  const { baseDeck, setBaseDeck } = useContext(DealerContext)

  const isOn = baseDeck === targetDeck
  return (
    <Box
      onClick={() => setBaseDeck(targetDeck)}
      sx={{
        display: 'flex',
        borderRadius: '50%',
        width: '50px',
        height: '50px',
        border: `3px solid ${isOn ? '#f0b840' : 'rgba(255, 255, 255, 0.2)'}`,
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'sans-serif',
        fontSize: '20px',
        color: 'rgba(255, 255, 255, 0.9)',
        bgcolor: isOn ? 'rgba(240, 184, 64, 0.15)' : 'rgba(255, 255, 255, 0.06)',
        cursor: 'pointer',
      }}
    >
      <Box>{title}</Box>
    </Box>
  )
}
