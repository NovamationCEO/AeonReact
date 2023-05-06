import { CSSProperties } from 'react'

export const backgroundStyle: CSSProperties = {
  position: 'relative',
  display: 'flex',
  width: '100%',
  height: '100vh',
  maxWidth: '100vw',
  maxHeight: '100%',
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
