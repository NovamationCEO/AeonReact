import { faEye, faGear } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Box from '@mui/material/Box'
import React from 'react'
import { Colors } from '../theme/colors'
import { ActionButton } from './ActionButton'

export function BottomMenu() {
  const [isOpen, setIsOpen] = React.useState(false)
  const [isHovered, setIsHovered] = React.useState(false)
  return (
    <Box
      position={'absolute'}
      left={0}
      bottom={0}
      width={'100%'}
      height={isOpen || isHovered ? '15%' : '10px'}
      bgcolor={Colors.menu}
      sx={{ transition: '0.5s ease height' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Box
        position={'absolute'}
        top={'-12px'}
        left={'calc(50% - 12px)'}
        borderRadius={'50%'}
        bgcolor={Colors.menu}
        width={'24px'}
        height={'24px'}
        justifyContent={'center'}
        alignItems={'center'}
        display={'flex'}
        onClick={() => setIsOpen((prev) => !prev)}
        sx={{
          transform: `rotate(${isOpen || isHovered ? 0 : -150}deg)`,
          transition: '0.7s ease transform',
        }}
      >
        <FontAwesomeIcon icon={faGear} size={'sm'} color={'black'} />
      </Box>
      <Box
        width={'100%'}
        display={'grid'}
        padding={'20px'}
        gridTemplateColumns={'repeat(auto-fit, minmax(60px, 70px))'}
        gap={'10px'}
      >
        <ActionButton icon={faEye} clickAction={peek} />
        <ActionButton icon={faGear} />
      </Box>
    </Box>
  )
}

function peek() {
  console.log('Peek')
}
