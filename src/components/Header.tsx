import Box from '@mui/material/Box'
import { useContext } from 'react'
import { DealerContext } from '../DealerContext'
import { DeckType, NemesisDeckType } from '../types/DeckType'
import { Colors } from '../theme/colors'

const deckLabels: Record<DeckType, string> = {
  oneplayer: 'Solo',
  twoplayer: '2 Player',
  threeplayer: '3 Player',
  fourplayer: '4 Player',
  fourplayerAB: '4P Team',
}

const nemesisLabels: Record<NemesisDeckType, string> = {
  base: 'Standard',
  nx: 'Charged',
  nd: 'Thief of Dreams',
  mb: 'Myth & Bone',
}

export function Header() {
  const { baseDeck, nemesisDeck, deck, deckIndex, hasFriend, hasFoe } =
    useContext(DealerContext)

  const extras = [hasFriend && 'Friend', hasFoe && 'Foe']
    .filter(Boolean)
    .join(' · ')
  const config = [
    deckLabels[baseDeck],
    nemesisLabels[nemesisDeck],
    extras || null,
  ]
    .filter(Boolean)
    .join(' · ')
  const progress = deck.length > 0 ? `${deckIndex + 1} / ${deck.length}` : ''

  return (
    <Box
      sx={{
        width: '100%',
        background: 'rgba(8, 10, 40, 0.78)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 2px 24px rgba(0, 0, 0, 0.5)',
        color: Colors.aeonWhite,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '8px 16px',
      }}
    >
      <Box>
        <Box
          sx={{
            fontFamily:
              'Gill Sans, Gill Sans MT, Calibri, Trebuchet MS, sans-serif',
            fontWeight: 'bold',
            fontSize: '1.25em',
            letterSpacing: '0.05em',
            lineHeight: 1.2,
            textShadow: '0 0 14px rgba(140, 180, 255, 0.5)',
          }}
        >
          Aeon's End
        </Box>
        <Box
          sx={{
            fontFamily: 'sans-serif',
            fontSize: '0.7em',
            lineHeight: 1.4,
            color: 'rgba(155, 185, 230, 0.85)',
          }}
        >
          {config}
        </Box>
      </Box>
      {progress && (
        <Box
          sx={{
            fontFamily: 'monospace',
            fontSize: '1.15em',
            fontWeight: 'bold',
            color: Colors.selectedItem,
            textShadow: '0 0 10px rgba(240, 184, 64, 0.4)',
          }}
        >
          {progress}
        </Box>
      )}
    </Box>
  )
}
