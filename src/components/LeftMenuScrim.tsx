import { Box } from '@mui/material'

export function LeftMenuScrim(props: {
  menuVisible: boolean
  menuOff: () => void
}) {
  const { menuVisible, menuOff } = props

  if (!menuVisible) return null

  return (
    <Box width={'100%'} height={'100%'} bgcolor="black" onClick={menuOff}></Box>
  )
}
