import { faGear } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Box } from '@mui/material'
import React, { useContext } from 'react'
import { Colors } from '../theme/colors'
import { z } from '../theme/z'
import { DeckTypeButton } from './DeckTypeButton'
import { MenuRow } from './MenuRow'
import { NemesisDeckTypeButton } from './NemesisDeckTypeButton'
import { StyleButton } from './StyleButton'
import { DealerContext } from '../DealerContext'

export function LeftMenu(props: {}) {
  const {
    baseDeck,
    setBaseDeck,
    nemesisDeck,
    setNemesisDeck,
    menuVisible,
    setMenuVisible,
  } = useContext(DealerContext)

  const xPos = menuVisible ? 0 : -100

  function toggleMenu() {
    setMenuVisible(!menuVisible)
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
      <MenuRow>
        <StyleButton targetStyle={'cracks'} />
        <StyleButton targetStyle={'loops'} />
      </MenuRow>

      <MenuRow>
        <DeckTypeButton targetDeck={'oneplayer'} title={'1'} />
        <DeckTypeButton targetDeck={'twoplayer'} title={'2'} />
        <DeckTypeButton targetDeck={'threeplayer'} title={'3'} />
        <DeckTypeButton targetDeck={'fourplayer'} title={'4'} />
        <DeckTypeButton targetDeck={'fourplayerAB'} title={'AB'} />
      </MenuRow>
      <MenuRow>
        <NemesisDeckTypeButton
          targetDeck={'base'}
          tooltip={'Standard Nemesis Deck'}
          title={'NN'}
        />
        <NemesisDeckTypeButton
          targetDeck={'nx'}
          title={'NX'}
          tooltip={"I Don't Remember"}
        />
        <NemesisDeckTypeButton
          targetDeck={'nd'}
          title={'ND'}
          tooltip={'Thief of Dreams'}
        />
        <NemesisDeckTypeButton
          targetDeck={'mb'}
          title={'MB'}
          tooltip={'Paradox of Myth and Bone'}
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
