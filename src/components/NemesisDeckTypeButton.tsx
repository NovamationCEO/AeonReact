import { Box, Tooltip } from '@mui/material'
import { Colors } from '../theme/colors'
import { NemesisDeckType } from '../types/DeckType'
import { nemesisVariants } from '../constants/nemesisVariants'
import { DealerContext } from '../DealerContext'
import { useContext } from 'react'

export function NemesisDeckTypeButton(props: { targetDeck: NemesisDeckType }) {
  const { targetDeck } = props
  const { nemesisDeck, setNemesisDeck } = useContext(DealerContext)
  const { label, description } = nemesisVariants[targetDeck]

  const isOn = nemesisDeck === targetDeck
  return (
    <Tooltip
      title={description}
      placement="top"
      enterDelay={600}
      enterTouchDelay={600}
      leaveTouchDelay={2500}
      arrow
    >
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
        <Box>{label}</Box>
      </Box>
    </Tooltip>
  )
}
