import Box from '@mui/material/Box'
import React, { useContext } from 'react'
import { CardRow } from './components/CardRow'
import { Header } from './components/Header'
import { LeftMenu } from './components/LeftMenu'
import { LeftMenuScrim } from './components/LeftMenuScrim'
import { Dealer } from './Dealer'
import { DealerContext } from './DealerContext'
import { backgroundStyle } from './theme/backgroundStyle'
import { backgroundStyles } from './theme/backgroundStyles'
import { EditToggle } from './components/EditToggle'
import { GameSummary } from './components/GameSummary'
import { HistoryPanel } from './components/HistoryPanel'
import { IntensityWidget } from './components/IntensityWidget'
import { ErrorBoundary } from './components/ErrorBoundary'

function AppContent() {
  const { bgStyle } = useContext(DealerContext)
  return (
    <Box sx={{ ...backgroundStyle, ...backgroundStyles[bgStyle]() }}>
      <Header />
      <Box
        sx={{
          position: 'relative',
          flex: 1,
          display: 'flex',
          overflow: 'hidden',
          flexDirection: 'column',
        }}
      >
        <LeftMenu />
        <LeftMenuScrim />
        <HistoryPanel />
        <IntensityWidget />
        <CardRow />
        <EditToggle />
      </Box>
      <GameSummary />
    </Box>
  )
}

function App() {
  return (
    <ErrorBoundary>
      <Dealer>
        <AppContent />
      </Dealer>
    </ErrorBoundary>
  )
}

export default App
