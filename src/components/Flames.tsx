import Box from '@mui/material/Box'
import { flameSets } from '../theme/flameSets'
import { Flame } from './Flame'

export function Flames(props: { set: number }) {
  const { set } = props
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
      <Flame percent={100} color={flameSets[set][0]} pulse={1.3} wobble={2.3} />
      <Flame percent={90} color={flameSets[set][1]} pulse={1.5} wobble={2.5} />
    </Box>
  )
}
