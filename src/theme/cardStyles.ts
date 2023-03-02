import { CSSProperties } from 'react'

const textureSize = 13
const loopColor = '#6B5344'
const cardColor = '#F8ECC9'
const lVal = `#0000 46%, ${loopColor} 47% 53%, #0000 54%`
const cardTexture: CSSProperties = {
  background:
    `radial-gradient(100% 100% at 100% 100%, ${lVal}) ${textureSize}px ${textureSize}px,` +
    `radial-gradient(100% 100% at 0    0   , ${lVal}) ${textureSize}px ${textureSize}px,` +
    `radial-gradient(100% 100%,#0000 22%, ${loopColor} 23% 29%, #0000 30% 34%, ${loopColor} 35% 41%,#0000 42%) ` +
    `${cardColor}`,
  backgroundSize: `${textureSize * 2}px ${textureSize * 2}px`,
  border: `1px solid ${loopColor}`,
  filter: 'blur(1px)',
}

export const cardStyles = {
  loops: cardTexture,
}
