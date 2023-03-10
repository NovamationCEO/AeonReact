import Box from '@mui/material/Box'
import React from 'react'
import './App.css'
import { ActionRow } from './components/ActionRow'
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
  const [revealed, setRevealed] = React.useState([] as CardValue[])
  const [currentDeck, setCurrentDeck] = React.useState(
    undefined as CardValue[] | undefined
  )
  const [menuVisible, setMenuVisible] = React.useState(false)

  React.useEffect(() => {
    if (!currentDeck) {
      setCurrentDeck(freshDeck())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentDeck])

  React.useEffect(() => {
    setCurrentDeck(freshDeck())
    setRevealed([])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [baseDeck, nemesisDeck])

  function freshDeck() {
    return shuffleDeck(
      [...decks[baseDeck]].concat([...nemesisDecks[nemesisDeck]])
    )
  }

  function drawCard() {
    if (!currentDeck || !currentDeck.length) {
      setCurrentDeck(freshDeck())
      setRevealed([])
      return
    }

    const newCard = currentDeck.pop()
    if (!newCard) return
    setRevealed(revealed.concat([newCard]))
  }

  function shuffleDeck(deck: CardValue[]): CardValue[] {
    // this.historySource.value.push("|");
    let tempDeck = [...deck]
    for (let i = 0; i < 14; i++) {
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
          revealed={revealed}
          cardStyle={cardStyle}
          drawCard={drawCard}
        />
        <ActionRow />
      </Box>
    </Box>
  )
}

export default App
