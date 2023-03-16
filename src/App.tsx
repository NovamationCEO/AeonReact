import Box from '@mui/material/Box'
import React from 'react'
import './App.css'
import { CardRow } from './components/CardRow'
import { Header } from './components/Header'
import { LeftMenu } from './components/LeftMenu'
import { LeftMenuScrim } from './components/LeftMenuScrim'
import { decks, nemesisDecks } from './constants/decks'
import { backgroundStyle } from './theme/backgroundStyle'
import { CardStyle } from './types/CardStyle'
import { CardValue } from './types/CardValue'
import { DeckType, NemesisDeckType } from './types/DeckType'

function App() {
  const [baseDeck, setBaseDeck] = React.useState('twoplayer' as DeckType)
  const [nemesisDeck, setNemesisDeck] = React.useState(
    'base' as NemesisDeckType
  )
  const [cardStyle, setCardStyle] = React.useState('cracks' as CardStyle)
  const [deck, setDeck] = React.useState([] as CardValue[])
  const [deckIndex, setDeckIndex] = React.useState(0)
  const [menuVisible, setMenuVisible] = React.useState(false)
  const [isDebouncing, setIsDebouncing] = React.useState(false)

  React.useEffect(() => {
    freshDeck()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [baseDeck, nemesisDeck])

  function freshDeck() {
    setDeck(
      shuffleDeck([...decks[baseDeck]].concat([...nemesisDecks[nemesisDeck]]))
    )
  }

  function drawCard() {
    if (isDebouncing) {
      return
    }
    setIsDebouncing(true)
    const newIndex = (deckIndex + 1) % deck.length
    setDeckIndex(newIndex)
    if (!newIndex) {
      freshDeck()
    }
    setTimeout(() => {
      setIsDebouncing(false)
    }, 500)
  }

  function shuffleDeck(deck: CardValue[]): CardValue[] {
    let tempDeck = [...deck]
    for (let i = 0; i < 21; i++) {
      tempDeck = tempDeck.sort(() => Math.random() - 0.5)
    }
    return tempDeck
  }

  return (
    <Box sx={backgroundStyle}>
      <Header />
      <Box
        position={'relative'}
        flex={1}
        display={'flex'}
        height={'calc(100vh - 2em)'}
        flexDirection={'column'}
      >
        <LeftMenu
          baseDeck={baseDeck}
          setBaseDeck={setBaseDeck}
          cardStyle={cardStyle}
          setCardStyle={setCardStyle}
          nemesisDeck={nemesisDeck}
          setNemesisDeck={setNemesisDeck}
          menuVisible={menuVisible}
          toggleMenu={() => setMenuVisible((prev) => !prev)}
        />
        <LeftMenuScrim
          menuVisible={menuVisible}
          menuOff={() => setMenuVisible(false)}
        />
        <CardRow
          deck={deck}
          deckIndex={deckIndex}
          cardStyle={cardStyle}
          drawCard={drawCard}
        />
      </Box>
    </Box>
  )
}

export default App
