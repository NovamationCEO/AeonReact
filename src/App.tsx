import Box from '@mui/material/Box'
import React from 'react'
import './App.css'
import { Card } from './components/Card'
import { Header } from './components/Header'
import { LeftMenu } from './components/LeftMenu'
import { backgroundStyle } from './theme/backgroundStyle'

function App() {
  return (
    <Box sx={backgroundStyle}>
      <Header />
      <Box
        position={'relative'}
        flex={1}
        display={'flex'}
        height={'calc(100vh - 2em)'}
      >
        <LeftMenu />
        <Box
          display={'flex'}
          flex={'1'}
          border={'2px solid red'}
          margin={'10px'}
          position={'relative'}
        >
          <Card cardValue={'4'} />
        </Box>
      </Box>
    </Box>
  )
}

export default App
