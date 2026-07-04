import { CSSProperties } from 'react'

function velvet(): CSSProperties {
  return {
    background:
      'radial-gradient(hsl(219, 44%, 65%) 4%, hsl(219, 44%, 18%) 9%, hsla(219, 44%, 20%, 0) 9%),' +
      'radial-gradient(hsl(219, 44%, 27%) 4%, hsl(219, 44%, 18%) 8%, hsla(219, 44%, 20%, 0) 10% ) 50px 50px,' +
      'radial-gradient(hsla(219, 44%, 30%, 0.8) 20%, hsla(219, 44%, 20%, 0) ) 50px 0,' +
      'radial-gradient(hsla(219, 44%, 30%, 0.8) 20%, hsla(219, 44%, 20%, 0) ) 0 50px,' +
      'radial-gradient(hsla(219, 44%, 20%, 1) 35%, hsla(219, 44%, 20%, 0) 60% ) 50px 0,' +
      'radial-gradient(hsla(219, 44%, 20%, 1) 35%, hsla(219, 44%, 20%, 0) 60% ) 100px 50px,' +
      'radial-gradient(hsla(219, 44%, 15%, 0.7), hsla(219, 44%, 20%, 0)) 0 0,' +
      'radial-gradient(hsla(219, 44%, 15%, 0.7), hsla(219, 44%, 20%, 0)) 50px 50px,' +
      'linear-gradient(45deg, hsla(219, 44%, 20%, 0) 49%, hsla(219, 44%, 0%, 1) 50%, hsla(219, 44%, 20%, 0) 70%) 0 0,' +
      'linear-gradient( -45deg, hsla(219, 44%, 20%, 0) 49%, hsla(219, 44%, 0%, 1) 50%, hsla(219, 44%, 20%, 0) 70% ) 0 0',
    backgroundColor: 'steelblue',
    backgroundSize: '100px 100px',
  }
}

function arcane(): CSSProperties {
  // Starfield: tiny radial-gradients as stars scattered across a 200×200px tile.
  // Top-left quadrant has extra density so the 50px preview button shows stars.
  const stars: [number, number, number][] = [
    [5, 5, 0.5], [12, 15, 1], [45, 18, 1], [23, 32, 0.5],
    [18, 42, 0.5], [34, 45, 1], [48, 48, 1.5],
    [67, 8, 0.5], [145, 23, 1.5], [188, 12, 0.5],
    [98, 38, 0.5], [167, 52, 1], [75, 58, 1],
    [23, 75, 0.5], [132, 68, 1.5], [186, 85, 0.5],
    [55, 98, 1], [175, 105, 0.5],
    [8, 122, 1], [115, 118, 0.5], [158, 135, 1.5],
    [42, 148, 1], [88, 165, 0.5], [195, 152, 1],
    [28, 185, 1.5], [142, 178, 0.5],
  ]
  const starGradients = stars.map(
    ([x, y, r]) => `radial-gradient(${r}px ${r}px at ${x}px ${y}px, rgba(210,225,255,0.88), transparent)`
  )
  return {
    backgroundImage: [
      ...starGradients,
      'radial-gradient(ellipse 120px 80px at 60% 35%, hsla(270,45%,18%,0.55), transparent)',
      'radial-gradient(ellipse 90px 120px at 25% 70%, hsla(220,50%,15%,0.4), transparent)',
    ].join(', '),
    backgroundColor: 'hsl(238, 48%, 7%)',
    backgroundSize: '200px 200px',
  }
}

function felt(): CSSProperties {
  return {
    backgroundImage: [
      // Horizontal fiber lines
      'repeating-linear-gradient(0deg, transparent 0px, transparent 3px, rgba(0,0,0,0.18) 3px, rgba(0,0,0,0.18) 4px)',
      // Vertical fiber lines (slightly looser weave)
      'repeating-linear-gradient(90deg, transparent 0px, transparent 4px, rgba(255,255,255,0.05) 4px, rgba(255,255,255,0.05) 5px)',
      // Directional sheen — cloth lit from upper-left
      'linear-gradient(160deg, rgba(255,255,255,0.06) 0%, transparent 40%, rgba(0,0,0,0.14) 100%)',
    ].join(', '),
    backgroundColor: 'hsl(152, 35%, 11%)',
  }
}

function brocade(): CSSProperties {
  return {
    backgroundImage: [
      // Primary gold diamond grid
      'linear-gradient(45deg, hsla(42,75%,52%,0.15) 1px, transparent 1px)',
      'linear-gradient(-45deg, hsla(42,75%,52%,0.15) 1px, transparent 1px)',
      // Secondary finer grid — half-spacing lines inside each diamond
      'linear-gradient(45deg, transparent 9px, hsla(42,75%,52%,0.07) 9px, hsla(42,75%,52%,0.07) 10px, transparent 10px)',
      'linear-gradient(-45deg, transparent 9px, hsla(42,75%,52%,0.07) 9px, hsla(42,75%,52%,0.07) 10px, transparent 10px)',
      // Tiny gold dot at each diamond intersection
      'radial-gradient(1.5px 1.5px at 0px 0px, hsla(42,85%,65%,0.4), transparent)',
      // Deep corner vignette for depth
      'radial-gradient(ellipse at center, hsla(348,30%,14%,0) 40%, hsla(348,40%,5%,0.55) 100%)',
    ].join(', '),
    backgroundColor: 'hsl(348, 38%, 9%)',
    backgroundSize: '20px 20px, 20px 20px, 20px 20px, 20px 20px, 20px 20px, 100% 100%',
  }
}

export const backgroundStyles = { velvet, arcane, felt, brocade }
