import { Box, Button } from '@mui/material'
import { useContext } from 'react'
import { DealerContext } from '../DealerContext'

export function EditToggle() {
  const { editModeOn, setEditModeOn } = useContext(DealerContext)
  return (
    <Box display={'flex'} justifyContent={'center'} margin={'5px'}>
      <Button
        variant={editModeOn ? 'contained' : 'outlined'}
        sx={{ borderRadius: '15px', width: '200px', lineHeight: 2 }}
        onClick={() => setEditModeOn(!editModeOn)}
      >
        {editModeOn ? 'Return to Game' : 'Reorder'}
      </Button>
    </Box>
  )
}
