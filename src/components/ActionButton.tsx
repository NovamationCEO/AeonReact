import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Box } from '@mui/material'
import { Colors } from '../theme/colors'

export function ActionButton(props: {
  icon: IconProp
  clickAction?: () => void
}) {
  const { icon, clickAction = () => null } = props

  return (
    <Box
      width={'50px'}
      height={'50px'}
      display={'flex'}
      justifyContent={'center'}
      alignItems={'center'}
      bgcolor={Colors.menuDark}
      borderRadius={'50%'}
      onClick={clickAction}
      sx={{
        cursor: 'pointer',
        transition: '0.5s ease background',
        ':hover': { background: Colors.menu },
      }}
    >
      <FontAwesomeIcon icon={icon} size={'2x'} />
    </Box>
  )
}
