import React from 'react'

export function useShakeDetector(
  callback: () => void,
  options?: { threshold?: number; cooldown?: number }
) {
  const { threshold = 18, cooldown = 1500 } = options ?? {}
  const callbackRef = React.useRef(callback)
  callbackRef.current = callback

  React.useEffect(() => {
    let lastShake = 0
    function handleMotion(e: DeviceMotionEvent) {
      const a = e.accelerationIncludingGravity
      if (!a) return
      const magnitude = Math.sqrt((a.x ?? 0) ** 2 + (a.y ?? 0) ** 2 + (a.z ?? 0) ** 2)
      const now = Date.now()
      if (magnitude > threshold && now - lastShake > cooldown) {
        lastShake = now
        callbackRef.current()
      }
    }
    window.addEventListener('devicemotion', handleMotion)
    return () => window.removeEventListener('devicemotion', handleMotion)
  }, [threshold, cooldown])
}
