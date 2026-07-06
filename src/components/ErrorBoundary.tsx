import React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

type Props = { children: React.ReactNode }
type State = { error: Error | null }

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { error: null }
  }

  static getDerivedStateFromError(error: Error): State {
    return { error }
  }

  render() {
    const { error } = this.state
    if (!error) return this.props.children

    return (
      <Box
        sx={{
          height: '100dvh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 3,
          background: 'rgba(4,6,24,0.97)',
          color: 'white',
          padding: '24px',
          textAlign: 'center',
        }}
      >
        <Box
          sx={{
            fontFamily: 'Gill Sans, Gill Sans MT, Calibri, Trebuchet MS, sans-serif',
            fontWeight: 'bold',
            fontSize: '1.4em',
            letterSpacing: '0.05em',
            color: 'rgba(240,184,64,0.9)',
          }}
        >
          Something went wrong
        </Box>
        <Box
          sx={{
            fontFamily: 'monospace',
            fontSize: '0.78em',
            color: 'rgba(255,255,255,0.35)',
            maxWidth: '400px',
            wordBreak: 'break-word',
          }}
        >
          {error.message}
        </Box>
        <Button
          onClick={() => window.location.reload()}
          sx={{
            borderRadius: '20px',
            paddingX: 4,
            paddingY: 1,
            color: 'white',
            border: '1.5px solid rgba(255,255,255,0.25)',
            fontFamily: 'sans-serif',
            letterSpacing: '0.05em',
            background: 'rgba(255,255,255,0.07)',
            ':hover': { background: 'rgba(255,255,255,0.13)' },
          }}
        >
          Reload
        </Button>
      </Box>
    )
  }
}
