import { Box, Button } from '@mui/material'
import { useContext } from 'react'
import { DealerContext } from '../DealerContext'

export function EditToggle() {
  const { editModeOn, setEditModeOn } = useContext(DealerContext)
  return (
    <Box
      sx={{
        position: 'absolute',
        left: 0,
        bottom: 0,
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        padding: '14px',
        pointerEvents: 'none',
      }}
    >
      <Button
        onClick={() => setEditModeOn(!editModeOn)}
        sx={{
          pointerEvents: 'auto',
          borderRadius: '20px',
          paddingX: 4,
          paddingY: 0.75,
          color: 'white',
          background: editModeOn ? 'midnightblue' : 'rgba(0,0,0,0.45)',
          border: `2px solid ${
            editModeOn ? 'rgba(100,100,220,0.8)' : 'rgba(255,255,255,0.25)'
          }`,
          backdropFilter: 'blur(6px)',
          fontFamily: 'sans-serif',
          letterSpacing: '0.05em',
          ':hover': {
            background: editModeOn ? '#14145a' : 'rgba(0,0,0,0.65)',
          },
          transition: '0.3s ease background, 0.3s ease border-color',
        }}
      >
        {editModeOn ? 'Return to Game' : 'Reorder Deck'}
      </Button>
    </Box>
  )
}
