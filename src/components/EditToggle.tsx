import { Box, Button } from '@mui/material'
import { useContext } from 'react'
import { DealerContext } from '../DealerContext'

const buttonSx = {
  pointerEvents: 'auto' as const,
  borderRadius: '20px',
  paddingX: 3,
  paddingY: 0.75,
  color: 'white',
  backdropFilter: 'blur(6px)',
  fontFamily: 'sans-serif',
  letterSpacing: '0.05em',
  whiteSpace: 'nowrap' as const,
  transition: '0.3s ease background, 0.3s ease border-color',
}

export function EditToggle() {
  const {
    editModeOn, setEditModeOn,
    deck, deckIds, deckIndex, forcePeek,
    pendingShuffle, setPendingShuffle,
  } = useContext(DealerContext)

  const faceDownCount = deck.length - (deckIndex + 1)

  function shuffleFaceDown() {
    const cut = deckIndex + 1
    const faceDown = deck.slice(cut)
    const faceDownIds = deckIds.slice(cut)

    for (let i = faceDown.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[faceDown[i], faceDown[j]] = [faceDown[j], faceDown[i]]
      ;[faceDownIds[i], faceDownIds[j]] = [faceDownIds[j], faceDownIds[i]]
    }

    setPendingShuffle({
      deck: [...deck.slice(0, cut), ...faceDown],
      deckIds: [...deckIds.slice(0, cut), ...faceDownIds],
      forcePeek: [...forcePeek.slice(0, cut), ...Array(faceDown.length).fill(false)],
    })
  }

  return (
    <Box
      sx={{
        position: 'absolute',
        left: 0,
        bottom: 0,
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        gap: '10px',
        padding: '14px',
        pointerEvents: 'none',
      }}
    >
      {editModeOn && (
        <Button
          onClick={shuffleFaceDown}
          disabled={faceDownCount <= 1}
          sx={{
            ...buttonSx,
            background: 'rgba(0,0,0,0.45)',
            border: '2px solid rgba(255,255,255,0.25)',
            ':hover': { background: 'rgba(0,0,0,0.65)' },
            '&.Mui-disabled': {
              color: 'rgba(255,255,255,0.3)',
              border: '2px solid rgba(255,255,255,0.1)',
            },
          }}
        >
          Shuffle Face-Down
        </Button>
      )}
      <Button
        onClick={() => setEditModeOn(!editModeOn)}
        sx={{
          ...buttonSx,
          background: editModeOn ? 'midnightblue' : 'rgba(0,0,0,0.45)',
          border: `2px solid ${editModeOn ? 'rgba(100,100,220,0.8)' : 'rgba(255,255,255,0.25)'}`,
          ':hover': {
            background: editModeOn ? '#14145a' : 'rgba(0,0,0,0.65)',
          },
        }}
      >
        {editModeOn ? 'Return to Game' : 'Reorder Deck'}
      </Button>
    </Box>
  )
}
