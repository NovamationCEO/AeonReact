import { faGear } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Box } from '@mui/material'
import React from 'react'
import { Colors } from '../theme/colors'
import { z } from '../theme/z'
import { CardStyle } from '../types/CardStyle'
import { DeckType, NemesisDeckType } from '../types/DeckType'
import { DeckTypeButton } from './DeckTypeButton'
import { MenuRow } from './MenuRow'
import { NemesisDeckTypeButton } from './NemesisDeckTypeButton'
import { StyleButton } from './StyleButton'

export function LeftMenu(props: {
  baseDeck: DeckType
  setBaseDeck: (dt: DeckType) => void
  cardStyle: CardStyle
  setCardStyle: (cs: CardStyle) => void
  nemesisDeck: NemesisDeckType
  setNemesisDeck: (nd: NemesisDeckType) => void
  menuVisible: boolean
  toggleMenu: () => void
}) {
  const {
    baseDeck,
    setBaseDeck,
    cardStyle,
    setCardStyle,
    nemesisDeck,
    setNemesisDeck,
    menuVisible,
    toggleMenu,
  } = props

  const xPos = menuVisible ? 0 : -100

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
      <MenuRow>
        <StyleButton
          cardStyle={cardStyle}
          targetStyle={'cracks'}
          setCardStyle={setCardStyle}
        />
        <StyleButton
          cardStyle={cardStyle}
          targetStyle={'loops'}
          setCardStyle={setCardStyle}
        />
      </MenuRow>

      <MenuRow>
        <DeckTypeButton
          baseDeck={baseDeck}
          setBaseDeck={setBaseDeck}
          targetDeck={'oneplayer'}
          title={'1'}
        />
        <DeckTypeButton
          baseDeck={baseDeck}
          setBaseDeck={setBaseDeck}
          targetDeck={'twoplayer'}
          title={'2'}
        />
        <DeckTypeButton
          baseDeck={baseDeck}
          setBaseDeck={setBaseDeck}
          targetDeck={'threeplayer'}
          title={'3'}
        />
        <DeckTypeButton
          baseDeck={baseDeck}
          setBaseDeck={setBaseDeck}
          targetDeck={'fourplayer'}
          title={'4'}
        />
        <DeckTypeButton
          baseDeck={baseDeck}
          setBaseDeck={setBaseDeck}
          targetDeck={'fourplayerAB'}
          title={'AB'}
        />
      </MenuRow>
      <MenuRow>
        <NemesisDeckTypeButton
          nemesisDeck={nemesisDeck}
          targetDeck={'base'}
          setNemesisDeck={setNemesisDeck}
          tooltip={'Standard Nemesis Deck'}
          title={'NN'}
        />
        <NemesisDeckTypeButton
          nemesisDeck={nemesisDeck}
          targetDeck={'nx'}
          setNemesisDeck={setNemesisDeck}
          title={'NX'}
          tooltip={"I Don't Remember"}
        />
        <NemesisDeckTypeButton
          nemesisDeck={nemesisDeck}
          targetDeck={'nd'}
          setNemesisDeck={setNemesisDeck}
          title={'ND'}
          tooltip={'Thief of Dreams'}
        />
      </MenuRow>
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
        onClick={() => toggleMenu()}
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
