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
        border: `3px solid ${isOn ? Colors.selectedItem : Colors.menuDark}`,
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'sans-serif',
        fontSize: '20px',
        bgcolor: isOn ? Colors.aeonWhite : Colors.menu,
        cursor: 'pointer',
      }}
    >
      <Box>{title}</Box>
    </Box>
  )
}
