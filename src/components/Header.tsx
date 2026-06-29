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
  const config = [deckLabels[baseDeck], nemesisLabels[nemesisDeck], extras || null]
    .filter(Boolean)
    .join(' · ')
  const progress = deck.length > 0 ? `${deckIndex + 1} / ${deck.length}` : ''

  return (
    <Box
      width={'100%'}
      bgcolor={Colors.header}
      color={Colors.aeonWhite}
      display={'flex'}
      alignItems={'center'}
      justifyContent={'space-between'}
      padding={'8px 16px'}
    >
      <Box>
        <Box
          fontFamily={
            'Gill Sans, Gill Sans MT, Calibri, Trebuchet MS, sans-serif'
          }
          fontWeight={'bold'}
          fontSize={'1.25em'}
          letterSpacing={'0.05em'}
          lineHeight={1.2}
        >
          Aeon's End
        </Box>
        <Box
          fontFamily={'sans-serif'}
          fontSize={'0.7em'}
          lineHeight={1.4}
          sx={{ opacity: 0.7 }}
        >
          {config}
        </Box>
      </Box>
      {progress && (
        <Box
          fontFamily={'monospace'}
          fontSize={'1.15em'}
          fontWeight={'bold'}
          sx={{ opacity: 0.85 }}
        >
          {progress}
        </Box>
      )}
    </Box>
  )
}
