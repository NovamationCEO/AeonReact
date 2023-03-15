import { LongPressDetectEvents, useLongPress } from 'use-long-press'
import React from 'react'

const LongPressButton = () => {
  const callback = React.useCallback(() => {
    console.log('Long pressed!')
  }, [])
  const bind = useLongPress(callback, {
    // onStart: (event, meta) => console.log('Press started', meta),
    // onFinish: (event, meta) => console.log('Long press finished', meta),
    // onCancel: (event, meta) => console.log('Press cancelled', meta),
    //onMove: () => console.log("Detected mouse or touch movement"),
    filterEvents: (event) => true, // All events can potentially trigger long press
    threshold: 500,
    captureEvent: true,
    cancelOnMovement: false,
    detect: LongPressDetectEvents.BOTH,
  })

  return (
    <div className="App">
      <button
        {...bind('useLongPressEvent')}
        style={{ width: 400, height: 200, fontSize: 50 }}
        onClick={() => console.log('CLICK')}
      >
        Press and hold
      </button>
    </div>
  )
}

export default LongPressButton
