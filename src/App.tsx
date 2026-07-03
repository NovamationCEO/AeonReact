import Box from '@mui/material/Box'
import React from 'react'
import { CardRow } from './components/CardRow'
import { Header } from './components/Header'
import { LeftMenu } from './components/LeftMenu'
import { LeftMenuScrim } from './components/LeftMenuScrim'
import { Dealer } from './Dealer'
import { backgroundStyle } from './theme/backgroundStyle'
import { EditToggle } from './components/EditToggle'

function App() {
  return (
    <Dealer>
      <Box sx={backgroundStyle}>
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
          <CardRow />
          <EditToggle />
        </Box>
      </Box>
    </Dealer>
  )
}

export default App
