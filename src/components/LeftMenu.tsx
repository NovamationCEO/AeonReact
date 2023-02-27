import { faGear } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Box } from '@mui/material'
import React from 'react'
import { Colors } from '../theme/colors'
import { z } from '../theme/z'

export function LeftMenu() {
  const [xPos, setXPos] = React.useState(-100)

  function moveDrawer() {
    setXPos((prevXPos) => -1 * (prevXPos + 100))
  }

  return (
    <Box
      height={'100%'}
      position={'absolute'}
      width={'80%'}
      maxWidth={'500px'}
      left={0}
      top={0}
      bgcolor={Colors.leftMenu}
      borderRadius={'0px 50px 50px 0px'}
      overflow={'visible'}
      display={'flex'}
      padding={'20px'}
      sx={{
        transition: '0.5s transform ease',
        transform: `translateX(${xPos}%)`,
      }}
      zIndex={z.leftMenu}
    >
      <Box
        bgcolor={Colors.leftMenu}
        color={Colors.aeonWhite}
        boxShadow={'none'}
        position={'absolute'}
        display={'flex'}
        alignSelf={'center'}
        right={'-24px'}
        justifyContent={'center'}
        width={'50px'}
        height={'50px'}
        borderRadius={'50%'}
        alignItems={'center'}
        onClick={moveDrawer}
        sx={{
          transform: `rotate(${xPos * 2}deg)`,
          transition: '0.7s ease transform',
        }}
      >
        <FontAwesomeIcon icon={faGear} size={'2x'} color={'black'} />
      </Box>
    </Box>
  )
}
