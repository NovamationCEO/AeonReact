import Box from '@mui/material/Box'
import { flameSets } from '../theme/flameSets'
import { Flame } from './Flame'

export function Flames(props: { cardValue: keyof typeof flameSets }) {
  const { cardValue } = props
  const col = flameSets[cardValue]

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
      <Flame percent={100} color={col[0]} pulse={1.3} wobble={2.3} />
      <Flame percent={90} color={col[1]} pulse={1.5} wobble={2.5} />
      <Flame percent={80} color={col[2]} pulse={1.8} wobble={2.9} />
      <Flame percent={70} color={col[3]} pulse={2.2} wobble={3.3} />
    </Box>
  )
}
