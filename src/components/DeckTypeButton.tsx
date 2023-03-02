import { Box } from '@mui/material'
import { Colors } from '../theme/colors'
import { DeckType } from '../types/DeckType'

export function DeckTypeButton(props: {
  baseDeck: DeckType
  targetDeck: DeckType
  setBaseDeck: (dt: DeckType) => void
  title: string
}) {
  const { baseDeck, targetDeck, setBaseDeck, title } = props
  const isOn = baseDeck === targetDeck
  return (
    <Box
      display={'flex'}
      borderRadius={'50%'}
      width={'50px'}
      height={'50px'}
      onClick={() => setBaseDeck(targetDeck)}
      border={`3px solid ${isOn ? Colors.selectedItem : Colors.menuDark}`}
      justifyContent={'center'}
      alignItems={'center'}
      fontFamily={'sans-serif'}
      fontSize={'20px'}
      bgcolor={isOn ? Colors.aeonWhite : Colors.menu}
    >
      <Box>{title}</Box>
    </Box>
  )
}
