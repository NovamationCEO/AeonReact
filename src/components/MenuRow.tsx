import { Box } from '@mui/material'
import { ReactNode } from 'react'
import { Colors } from '../theme/colors'

export function MenuRow(props: { children: ReactNode; colWidth?: string }) {
  const { children, colWidth = '50px' } = props
  return (
    <Box
      sx={{
        display: 'grid',
        gridAutoRows: '60px',
        gridTemplateColumns: `repeat(auto-fill, ${colWidth})`,
        gap: '10px',
        alignItems: 'center',
        padding: '10px',
        borderRadius: '40px',
        bgcolor: 'rgba(255, 255, 255, 0.06)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: 'inset 0 1px 1px rgba(255, 255, 255, 0.05)',
        margin: '5px',
      }}
    >
      {children}
    </Box>
  )
}
