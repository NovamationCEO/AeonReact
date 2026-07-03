import { faGear } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Box, FormControlLabel, Switch } from '@mui/material'
import { useContext } from 'react'
import { Colors } from '../theme/colors'
import { z } from '../theme/z'
import { DeckTypeButton } from './DeckTypeButton'
import { MenuRow } from './MenuRow'
import { NemesisDeckTypeButton } from './NemesisDeckTypeButton'
import { StyleButton } from './StyleButton'
import { DealerContext } from '../DealerContext'

function SectionLabel({ label }: { label: string }) {
  return (
    <Box
      sx={{
        fontFamily: 'sans-serif',
        fontSize: '0.7em',
        color: 'rgba(0,0,0,0.5)',
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        paddingLeft: '14px',
        paddingTop: '10px',
        paddingBottom: '2px',
      }}
    >
      {label}
    </Box>
  )
}

export function LeftMenu() {
  const {
    menuVisible,
    setMenuVisible,
    hasFriend,
    setHasFriend,
    hasFoe,
    setHasFoe,
  } = useContext(DealerContext)

  const xPos = menuVisible ? 0 : -100

  function toggleMenu() {
    setMenuVisible(!menuVisible)
  }

  return (
    <Box
      sx={{
        height: '100%',
        position: 'absolute',
        width: '80%',
        maxWidth: '500px',
        left: 0,
        top: 0,
        bgcolor: Colors.menu,
        borderRadius: '0px 50px 50px 0px',
        overflow: 'visible',
        display: 'flex',
        padding: '20px',
        transition: '0.5s transform ease',
        transform: `translateX(${xPos}%)`,
        zIndex: z.leftMenu,
        flexDirection: 'column',
      }}
    >
      <Box
        sx={{
          fontFamily: 'Gill Sans, Gill Sans MT, Calibri, Trebuchet MS, sans-serif',
          fontWeight: 'bold',
          fontSize: '1.15em',
          color: 'rgba(0,0,0,0.65)',
          padding: '4px 10px 4px',
        }}
      >
        Setup
      </Box>

      <SectionLabel label="Card Style" />
      <MenuRow>
        <StyleButton targetStyle={'cracks'} />
        <StyleButton targetStyle={'loops'} />
      </MenuRow>

      <SectionLabel label="Players" />
      <MenuRow>
        <DeckTypeButton targetDeck={'oneplayer'} title={'1'} />
        <DeckTypeButton targetDeck={'twoplayer'} title={'2'} />
        <DeckTypeButton targetDeck={'threeplayer'} title={'3'} />
        <DeckTypeButton targetDeck={'fourplayer'} title={'4'} />
        <DeckTypeButton targetDeck={'fourplayerAB'} title={'AB'} />
      </MenuRow>

      <SectionLabel label="Nemesis Variant" />
      <MenuRow colWidth={'100%'}>
        <NemesisDeckTypeButton
          targetDeck={'base'}
          title={'Standard Nemesis Deck'}
        />
        <NemesisDeckTypeButton
          targetDeck={'nx'}
          title={'Charged Nemesis Card'}
        />
        <NemesisDeckTypeButton targetDeck={'nd'} title={'Thief of Dreams'} />
        <NemesisDeckTypeButton
          targetDeck={'mb'}
          title={'Paradox of Myth and Bone'}
        />
      </MenuRow>

      <SectionLabel label="Optional Cards" />
      <MenuRow colWidth={'100%'}>
        <FormControlLabel
          control={
            <Switch
              checked={hasFriend}
              onChange={(_evt, val) => setHasFriend(val)}
            />
          }
          label="Friend"
        />
        <FormControlLabel
          control={
            <Switch checked={hasFoe} onChange={(_evt, val) => setHasFoe(val)} />
          }
          label="Foe"
        />
      </MenuRow>

      <Box
        onClick={toggleMenu}
        role={'button'}
        aria-label={menuVisible ? 'Close settings' : 'Open settings'}
        sx={{
          bgcolor: Colors.menu,
          color: Colors.aeonWhite,
          boxShadow: 'none',
          position: 'absolute',
          display: 'flex',
          top: '60px',
          right: '-24px',
          justifyContent: 'center',
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          alignItems: 'center',
          cursor: 'pointer',
          transform: `rotate(${xPos * 2}deg)`,
          transition: '0.7s ease transform',
        }}
      >
        <FontAwesomeIcon icon={faGear} size={'2x'} color={'black'} />
      </Box>
    </Box>
  )
}
