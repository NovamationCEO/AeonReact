import Box from '@mui/material/Box'
import React, { CSSProperties } from 'react'
import './App.css'
import { Background } from './components/Background'
import { Card } from './components/Card'
import { Header } from './components/Header'
import { LeftMenu } from './components/LeftMenu'
import { RightMenu } from './components/RightMenu'

function App() {
  const backgroundStyle: CSSProperties = {
    position: 'relative',
    display: 'flex',
    width: '100%',
    height: '100vh',
    maxWidth: '100vw',
    maxHeight: '100vh',
    flex: 1,
    flexDirection: 'column',
    background:
      'radial-gradient(hsl(219, 44%, 65%) 4%, hsl(219, 44%, 18%) 9%, hsla(219, 44%, 20%, 0) 9%),' +
      'radial-gradient(hsl(219, 44%, 27%) 4%, hsl(219, 44%, 18%) 8%, hsla(219, 44%, 20%, 0) 10% ) 50px 50px,' +
      'radial-gradient(hsla(219, 44%, 30%, 0.8) 20%, hsla(219, 44%, 20%, 0) ) 50px 0,' +
      'radial-gradient(hsla(219, 44%, 30%, 0.8) 20%, hsla(219, 44%, 20%, 0) ) 0 50px,' +
      'radial-gradient(hsla(219, 44%, 20%, 1) 35%, hsla(219, 44%, 20%, 0) 60% ) 50px 0,' +
      'radial-gradient(hsla(219, 44%, 20%, 1) 35%, hsla(219, 44%, 20%, 0) 60% ) 100px 50px,' +
      'radial-gradient(hsla(219, 44%, 15%, 0.7), hsla(219, 44%, 20%, 0)) 0 0,' +
      'radial-gradient(hsla(219, 44%, 15%, 0.7), hsla(219, 44%, 20%, 0)) 50px 50px,' +
      'linear-gradient(45deg, hsla(219, 44%, 20%, 0) 49%, hsla(219, 44%, 0%, 1) 50%, hsla(219, 44%, 20%, 0) 70%) 0 0,' +
      'linear-gradient( -45deg, hsla(219, 44%, 20%, 0) 49%, hsla(219, 44%, 0%, 1) 50%, hsla(219, 44%, 20%, 0) 70% ) 0 0',
    backgroundColor: 'steelblue',
    backgroundSize: '100px 100px',
    padding: 0,
    justifyContent: 'flex-start',
    overflow: 'hidden',
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
        <LeftMenu />
        {/* <RightMenu /> */}
        <Box
          display={'flex'}
          flex={'1'}
          border={'2px solid red'}
          margin={'10px'}
          position={'relative'}
        >
          <Card value={'K'} />
        </Box>
      </Box>
    </Box>
  )
}

export default App
