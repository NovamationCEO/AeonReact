import { Box, Button } from '@mui/material'
import { useContext } from 'react'
import { DealerContext } from '../DealerContext'
import { Colors } from '../theme/colors'

export function EditToggle() {
  const { editModeOn, setEditModeOn } = useContext(DealerContext)
  return (
    <Box position={'absolute'} left={0} bottom={'30px'} width={'100%'}>
      <Box display={'flex'} justifyContent={'center'} margin={'5px'}>
        <Button
          variant={editModeOn ? 'contained' : 'outlined'}
          sx={{
            borderRadius: '15px',
            width: '200px',
            lineHeight: 2,
            ':hover': {
              background: editModeOn ? undefined : Colors.menu,
            },
          }}
          onClick={() => setEditModeOn(!editModeOn)}
        >
          {editModeOn ? 'Return to Game' : 'Reorder'}
        </Button>
      </Box>
    </Box>
  )
}
