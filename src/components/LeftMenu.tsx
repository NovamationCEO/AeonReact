import { faGear } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Box } from '@mui/material'
import React from 'react'
import { cardStyles } from '../theme/cardStyles'
import { Colors } from '../theme/colors'
import { z } from '../theme/z'
import { CardStyle } from '../types/CardStyle'
import { DeckType } from '../types/DeckType'
import { StyleButton } from './StyleButton'

export function LeftMenu(props: {
  baseDeck: DeckType
  setBaseDeck: (dt: DeckType) => void
  cardStyle: CardStyle
  setCardStyle: (cs: CardStyle) => void
}) {
  const { baseDeck, setBaseDeck, cardStyle, setCardStyle } = props
  const [xPos, setXPos] = React.useState(-100)

  function moveDrawer() {
    setXPos((prevXPos) => -1 * (prevXPos + 100))
  }

  return (
    <Box
      height={'100%'}
      position={'absolute'}
      width={'80%'}
      maxWidth={'500px'}
      left={0}
      top={0}
      bgcolor={Colors.menu}
      borderRadius={'0px 50px 50px 0px'}
      overflow={'visible'}
      display={'flex'}
      padding={'20px'}
      sx={{
        transition: '0.5s transform ease',
        transform: `translateX(${xPos}%)`,
      }}
      zIndex={z.leftMenu}
      flexDirection={'column'}
    >
      <Box
        display={'grid'}
        gridAutoRows={'60px'}
        gridTemplateColumns={'repeat(auto-fill, 50px)'}
        gap={'10px'}
        alignItems={'center'}
        padding={'10px'}
        borderRadius={'40px'}
        bgcolor={Colors.menuDark}
      >
        <StyleButton
          cardStyle={cardStyle}
          targetStyle={'loops'}
          setCardStyle={setCardStyle}
        />
        <StyleButton
          cardStyle={cardStyle}
          targetStyle={'cracks'}
          setCardStyle={setCardStyle}
        />
      </Box>
      <Box
        bgcolor={Colors.menu}
        color={Colors.aeonWhite}
        boxShadow={'none'}
        position={'absolute'}
        display={'flex'}
        alignSelf={'center'}
        top={'calc(50% - 25px)'}
        right={'-24px'}
        justifyContent={'center'}
        width={'50px'}
        height={'50px'}
        borderRadius={'50%'}
        alignItems={'center'}
        onClick={moveDrawer}
        sx={{
          transform: `rotate(${xPos * 2}deg)`,
          transition: '0.7s ease transform',
        }}
      >
        <FontAwesomeIcon icon={faGear} size={'2x'} color={'black'} />
      </Box>
    </Box>
  )
}
