import { CSSProperties } from 'react'

function makeLoop(loopColor: string = '#2a2d38'): CSSProperties {
  const textureSize = 13
  const cardColor = '#191b22'
  const lVal = `#0000 46%, ${loopColor} 47% 53%, #0000 54%`
  return {
    backgroundImage:
      `radial-gradient(100% 100% at 100% 100%, ${lVal}),` +
      `radial-gradient(100% 100% at 0    0   , ${lVal}),` +
      `radial-gradient(100% 100%,#0000 22%, ${loopColor} 23% 29%, #0000 30% 34%, #2a2d38 35% 41%,#0000 42%)`,
    backgroundColor: cardColor,
    backgroundSize: `${textureSize * 2}px ${textureSize * 2}px`,
    backgroundPosition: `${textureSize}px ${textureSize}px, ${textureSize}px ${textureSize}px, 0px 0px`,
    filter: 'blur(1px)',
    animation: 'loopsDrift 30s linear infinite',
  }
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
    animation: 'cracksPulse 5s ease-in-out infinite',
  }
  return cardTexture
}

function makeScales(accentColor: string = '#252835'): CSSProperties {
  const w = 60, h = 30, c = '#191b22'
  return {
    backgroundImage: [
      `radial-gradient(circle at 100% 150%, ${c} 24%, ${accentColor} 25% 28%, transparent 29%)`,
      `radial-gradient(circle at 0% 150%, ${c} 24%, ${accentColor} 25% 28%, transparent 29%)`,
      `radial-gradient(circle at 50% 100%, transparent 10%, ${accentColor} 11% 14%, transparent 15%)`,
    ].join(', '),
    backgroundColor: c,
    backgroundSize: `${w}px ${h}px`,
    backgroundPosition: '0px 0px, 0px 0px, 0px 0px',
    animation: 'scalesDrift 20s linear infinite',
  }
}

function makeDiamonds(accentColor: string = '#252835'): CSSProperties {
  const s = 28, c = '#191b22'
  const line = `transparent calc(50% - 1.5px), ${accentColor} calc(50% - 1.5px) calc(50% + 1.5px), transparent calc(50% + 1.5px)`
  return {
    backgroundImage: [
      `linear-gradient(45deg, ${line})`,
      `linear-gradient(-45deg, ${line})`,
    ].join(', '),
    backgroundColor: c,
    backgroundSize: `${s}px ${s}px`,
    backgroundPosition: '0px 0px, 0px 0px',
    animation: 'diamondsDrift 22s linear infinite',
  }
}

function makeShimmer(glowColor: string = '#2a2d40'): CSSProperties {
  const s = 60, c = '#191b22'
  return {
    backgroundImage: [
      `radial-gradient(circle at 25% 25%, ${glowColor} 0%, transparent 50%)`,
      `radial-gradient(circle at 75% 75%, ${glowColor} 0%, transparent 50%)`,
    ].join(', '),
    backgroundColor: c,
    backgroundSize: `${s}px ${s}px`,
    backgroundPosition: '0px 0px, 0px 0px',
    animation: 'shimmerPulse 4s ease-in-out infinite',
  }
}

export const cardStyles = {
  loops: makeLoop,
  cracks: makeCracks,
  scales: makeScales,
  diamonds: makeDiamonds,
  shimmer: makeShimmer,
}
