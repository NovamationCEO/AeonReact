import Box from '@mui/material/Box'
import '../theme/keyframes.css'

export function Flame(props: {
  percent: number
  color: string
  pulse: number
  wobble: number
}) {
  const { percent, color, pulse, wobble } = props

  const pos = `${(100 - percent) / 2}%`
  const size = `${percent}%`

  return (
    <Box
      position={'absolute'}
      left={pos}
      top={pos}
      height={size}
      width={size}
      sx={{
        filter: 'blur(6px)',
        animation: `pulse ${pulse}s linear infinite alternate`,
      }}
    >
      <Box
        borderRadius={'75% 50%'}
        height={'100%'}
        width={'100%'}
        sx={{
          animation: `wobble ${wobble}s linear infinite alternate`,
        }}
        bgcolor={color}
      />
    </Box>
  )
}
