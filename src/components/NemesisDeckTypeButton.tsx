import { Box, Tooltip } from '@mui/material'
import { Colors } from '../theme/colors'
import { NemesisDeckType } from '../types/DeckType'
import { DealerContext } from '../DealerContext'
import { useContext } from 'react'

export function NemesisDeckTypeButton(props: {
  targetDeck: NemesisDeckType
  title: string
  tooltip: string
}) {
  const { targetDeck, title, tooltip } = props
  const { nemesisDeck, setNemesisDeck } = useContext(DealerContext)

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
