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
      display={'flex'}
      borderRadius={'25px'}
      // width={'300px'}
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
  )
}
