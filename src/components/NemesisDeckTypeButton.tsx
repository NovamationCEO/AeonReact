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
        border: `3px solid ${isOn ? Colors.selectedItem : Colors.menuDark}`,
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'sans-serif',
        fontSize: { xs: '15px', sm: '20px' },
        bgcolor: isOn ? Colors.aeonWhite : Colors.menu,
        cursor: 'pointer',
      }}
    >
      <Box>{title}</Box>
    </Box>
  )
}
