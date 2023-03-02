import { Box, Tooltip } from '@mui/material'
import { Colors } from '../theme/colors'
import { DeckType, NemesisDeckType } from '../types/DeckType'

export function NemesisDeckTypeButton(props: {
  nemesisDeck: NemesisDeckType
  targetDeck: NemesisDeckType
  setNemesisDeck: (dt: NemesisDeckType) => void
  title: string
  tooltip: string
}) {
  const { nemesisDeck, targetDeck, setNemesisDeck, title, tooltip } = props
  const isOn = nemesisDeck === targetDeck
  return (
    <Tooltip title={tooltip}>
      <Box
        display={'flex'}
        borderRadius={'50%'}
        width={'50px'}
        height={'50px'}
        onClick={() => setNemesisDeck(targetDeck)}
        border={`3px solid ${isOn ? Colors.selectedItem : Colors.menuDark}`}
        justifyContent={'center'}
        alignItems={'center'}
        fontFamily={'sans-serif'}
        fontSize={'20px'}
        bgcolor={isOn ? Colors.aeonWhite : Colors.menu}
      >
        <Box>{title}</Box>
      </Box>
    </Tooltip>
  )
}
