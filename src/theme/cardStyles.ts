import { CSSProperties } from 'react'

function makeLoop(): CSSProperties {
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
  return cardTexture
}

function makeCracks(crackColor: string = '#20222a'): CSSProperties {
  const textureSize = 50
  const cardColor = '#191b22'
  const sVal = `${textureSize * 2}px ${textureSize * 2}px`
  const gVal = '35.36% 35.36% at'
  const cVal = `#0000 66%, ${crackColor} 68% 70%, #0000 72%`
  const cardTexture: CSSProperties = {
    background:
      `radial-gradient(${gVal} 100% 25%, ${cVal}) ${textureSize}px ${textureSize}px / ${sVal}, ` +
      `radial-gradient(${gVal} 0 75%, ${cVal}) ${textureSize}px ${textureSize}px / ${sVal}, ` +
      `radial-gradient(${gVal} 100% 25%, ${cVal}) 0 0 / ${sVal}, ` +
      `radial-gradient(${gVal} 0 75%, ${cVal}) 0 0 / ${sVal}, ` +
      `repeating-conic-gradient(${cardColor} 0 25%, #0000 0 50%) 0 0 / ${sVal}, ` +
      `radial-gradient(${cVal}) 0 ${
        textureSize / 2
      }px / ${textureSize}px ${textureSize}px ${cardColor}`,
    backgroundAttachment: 'fixed',
  }
  return cardTexture
}

export const cardStyles = {
  loops: makeLoop,
  cracks: makeCracks,
}
