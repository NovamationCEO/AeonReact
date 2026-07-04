import { faGear } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Box } from '@mui/material'
import { useContext } from 'react'
import { Colors } from '../theme/colors'
import { z } from '../theme/z'
import { DeckTypeButton } from './DeckTypeButton'
import { MenuRow } from './MenuRow'
import { NemesisDeckTypeButton } from './NemesisDeckTypeButton'
import { StyleButton } from './StyleButton'
import { BgStyleButton } from './BgStyleButton'
import { DealerContext } from '../DealerContext'

function SectionLabel({ label }: { label: string }) {
  return (
    <Box
      sx={{
        fontFamily: 'sans-serif',
        fontSize: '0.68em',
        color: 'rgba(155, 185, 230, 0.85)',
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        paddingLeft: '14px',
        paddingTop: '10px',
        paddingBottom: '2px',
        textShadow: '0 0 8px rgba(100, 150, 255, 0.4)',
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
        background: 'rgba(8, 10, 40, 0.72)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderRadius: '0px 50px 50px 0px',
        overflow: 'visible',
        display: 'flex',
        transition: '0.5s transform ease',
        transform: `translateX(${xPos}%)`,
        zIndex: z.leftMenu,
        flexDirection: 'column',
        boxShadow:
          '8px 0 32px rgba(0, 0, 0, 0.6), inset 0 0 0 1px rgba(255, 255, 255, 0.1)',
      }}
    >
      {/* Clip wrapper: clips scrollable content to the rounded menu shape without affecting the gear icon */}
      <Box
        sx={{
          flex: 1,
          overflow: 'hidden',
          borderRadius: '0px 50px 50px 0px',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box
          sx={{
            flex: 1,
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            direction: 'rtl',
          }}
        >
          <Box
            sx={{
              direction: 'ltr',
              display: 'flex',
              flexDirection: 'column',
              padding: '20px',
            }}
          >
            <Box
              sx={{
                fontFamily:
                  'Gill Sans, Gill Sans MT, Calibri, Trebuchet MS, sans-serif',
                fontWeight: 'bold',
                fontSize: '1.25em',
                color: 'rgba(255, 255, 255, 0.95)',
                letterSpacing: '0.05em',
                padding: '4px 10px 12px',
                borderBottom: '1px solid rgba(255, 255, 255, 0.15)',
                textShadow: '0 0 14px rgba(140, 180, 255, 0.5)',
              }}
            >
              Setup
            </Box>

            <SectionLabel label="Card Style" />
            <MenuRow>
              <StyleButton targetStyle={'cracks'} />
              <StyleButton targetStyle={'loops'} />
              <StyleButton targetStyle={'scales'} />
              <StyleButton targetStyle={'diamonds'} />
              <StyleButton targetStyle={'shimmer'} />
            </MenuRow>

            <SectionLabel label="Background" />
            <MenuRow>
              <BgStyleButton targetStyle={'velvet'} />
              <BgStyleButton targetStyle={'arcane'} />
              <BgStyleButton targetStyle={'felt'} />
              <BgStyleButton targetStyle={'brocade'} />
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
              <Box
                sx={{
                  display: 'flex',
                  borderRadius: '25px',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  overflow: 'hidden',
                  height: '50px',
                }}
              >
                {([['Friend', hasFriend, setHasFriend], ['Foe', hasFoe, setHasFoe]] as const).map(
                  ([label, isOn, setter], i) => (
                    <Box
                      key={label}
                      onClick={() => setter(!isOn)}
                      sx={{
                        flex: 1,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        fontFamily: 'sans-serif',
                        fontSize: '16px',
                        fontWeight: isOn ? 'bold' : 'normal',
                        color: isOn ? '#f0b840' : 'rgba(255,255,255,0.7)',
                        bgcolor: isOn ? 'rgba(240,184,64,0.15)' : 'rgba(255,255,255,0.04)',
                        borderRight: i === 0 ? '1px solid rgba(255,255,255,0.2)' : 'none',
                        cursor: 'pointer',
                        transition: '0.2s ease background-color, 0.2s ease color',
                        userSelect: 'none',
                      }}
                    >
                      {label}
                    </Box>
                  )
                )}
              </Box>
            </MenuRow>
          </Box>
        </Box>
      </Box>

      <Box
        onClick={toggleMenu}
        role={'button'}
        aria-label={menuVisible ? 'Close settings' : 'Open settings'}
        sx={{
          bgcolor: 'rgba(8, 10, 40, 0.82)',
          color: Colors.aeonWhite,
          boxShadow:
            '0 2px 14px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.1)',
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
        <FontAwesomeIcon icon={faGear} size={'2x'} color={'rgba(255,255,255,0.85)'} />
      </Box>
    </Box>
  )
}
