import { Box, Button, IconButton, Tooltip } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShuffle } from '@fortawesome/free-solid-svg-icons'
import { useCallback, useContext } from 'react'
import { DealerContext } from '../DealerContext'
import { useShakeDetector } from '../hooks/useShakeDetector'

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

    navigator.vibrate?.([20, 15, 20, 15, 20, 15, 20])

    setPendingShuffle({
      deck: [...deck.slice(0, cut), ...faceDown],
      deckIds: [...deckIds.slice(0, cut), ...faceDownIds],
      forcePeek: [...forcePeek.slice(0, cut), ...Array(faceDown.length).fill(false)],
    })
  }

  useShakeDetector(
    useCallback(() => {
      if (editModeOn && faceDownCount > 1) shuffleFaceDown()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [editModeOn, faceDownCount])
  )

  return (
    <Box
      sx={{
        position: 'absolute',
        left: 0,
        bottom: 0,
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '10px',
        padding: '14px',
        pointerEvents: 'none',
      }}
    >
      {editModeOn && (
        <Tooltip title="Shuffle face-down" placement="top" disableInteractive>
          <span style={{ pointerEvents: 'auto' }}>
            <IconButton
              onClick={shuffleFaceDown}
              disabled={faceDownCount <= 1}
              size="small"
              sx={{
                width: 38,
                height: 38,
                color: 'rgba(255,255,255,0.55)',
                background: 'rgba(0,0,0,0.35)',
                border: '1.5px solid rgba(255,255,255,0.18)',
                backdropFilter: 'blur(6px)',
                transition: '0.25s ease color, 0.25s ease background, 0.25s ease border-color',
                ':hover': {
                  background: 'rgba(0,0,0,0.55)',
                  color: 'rgba(255,255,255,0.85)',
                },
                '&.Mui-disabled': {
                  color: 'rgba(255,255,255,0.15)',
                  border: '1.5px solid rgba(255,255,255,0.08)',
                  background: 'rgba(0,0,0,0.2)',
                },
              }}
            >
              <FontAwesomeIcon icon={faShuffle} size="sm" />
            </IconButton>
          </span>
        </Tooltip>
      )}
      <Button
        onClick={() => setEditModeOn(!editModeOn)}
        sx={{
          pointerEvents: 'auto',
          borderRadius: '20px',
          paddingX: 3,
          paddingY: 0.75,
          color: 'white',
          backdropFilter: 'blur(6px)',
          fontFamily: 'sans-serif',
          letterSpacing: '0.05em',
          whiteSpace: 'nowrap',
          background: editModeOn ? 'midnightblue' : 'rgba(0,0,0,0.45)',
          border: `2px solid ${editModeOn ? 'rgba(100,100,220,0.8)' : 'rgba(255,255,255,0.25)'}`,
          transition: '0.3s ease background, 0.3s ease border-color',
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
