let _ctx: AudioContext | null = null

function getCtx(): AudioContext {
  if (!_ctx) _ctx = new AudioContext()
  if (_ctx.state === 'suspended') _ctx.resume()
  return _ctx
}

function tone(
  freq: number,
  durationSec: number,
  type: OscillatorType,
  volume: number,
  delayMs = 0
) {
  try {
    const c = getCtx()
    const t = c.currentTime + delayMs / 1000
    const osc = c.createOscillator()
    const gain = c.createGain()
    osc.connect(gain)
    gain.connect(c.destination)
    osc.type = type
    osc.frequency.value = freq
    gain.gain.setValueAtTime(volume, t)
    gain.gain.exponentialRampToValueAtTime(0.0001, t + durationSec)
    osc.start(t)
    osc.stop(t + durationSec)
  } catch { /* AudioContext unavailable or blocked */ }
}

// Short crisp click — normal card draw
export function playDraw() {
  tone(1100, 0.075, 'sine', 0.12)
}

// Lower, heavier — nemesis card draw
export function playNemesisDraw() {
  tone(300, 0.20, 'square', 0.09)
  tone(580, 0.08, 'sine', 0.05, 20)
}

// Three ascending notes — deck reshuffle / wrap
export function playReshuffle() {
  ;[580, 780, 1040].forEach((f, i) => tone(f, 0.13, 'sine', 0.10, i * 85))
}

// Cascade of soft taps — face-down shuffle
export function playShuffle() {
  for (let i = 0; i < 6; i++) {
    tone(1000 - i * 55, 0.07, 'sine', 0.08, i * 48)
  }
}
