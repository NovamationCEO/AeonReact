import Box from '@mui/material/Box'
import React from 'react'
import './App.css'
import { CardRow } from './components/CardRow'
import { Header } from './components/Header'
import { LeftMenu } from './components/LeftMenu'
import { decks } from './constants/decks'
import { backgroundStyle } from './theme/backgroundStyle'
import { CardStyle } from './types/CardStyle'
import { CardValue } from './types/CardValue'
import { DeckType } from './types/DeckType'

function App() {
  const [baseDeck, setBaseDeck] = React.useState('twoplayer' as DeckType)
  const [cardStyle, setCardStyle] = React.useState('cracks' as CardStyle)
  const [revealed, setRevealed] = React.useState([] as CardValue[])
  const [currentDeck, setCurrentDeck] = React.useState(
    undefined as CardValue[] | undefined
  )

  React.useEffect(() => {
    if (!currentDeck) {
      setCurrentDeck(shuffleDeck(decks[baseDeck]))
    }
  }, [currentDeck, baseDeck])

  function drawCard() {
    if (!currentDeck) {
      return
    }
    if (!currentDeck.length) {
      const newDeck = shuffleDeck([...decks[baseDeck]])
      setCurrentDeck([...newDeck])
      setRevealed([])
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
      >
        <LeftMenu
          baseDeck={baseDeck}
          setBaseDeck={setBaseDeck}
          cardStyle={cardStyle}
          setCardStyle={setCardStyle}
        />
        <Box
          display={'flex'}
          flex={1}
          border={'2px solid red'}
          margin={'10px'}
          position={'relative'}
          onClick={drawCard}
        >
          <CardRow revealed={revealed} cardStyle={cardStyle} />
        </Box>
      </Box>
    </Box>
  )
}

export default App
