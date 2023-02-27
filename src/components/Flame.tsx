import Box from '@mui/material/Box'

export function Flame(props: { color: string }) {
  return (
    <Box
      width={'100%'}
      height={0}
      paddingTop={'75%'}
      paddingBottom={'75%'}
      position={'absolute'}
      left={0}
      top={0}
    >
      F
    </Box>
  )
}
