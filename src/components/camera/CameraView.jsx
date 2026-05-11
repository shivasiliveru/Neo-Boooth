import { useEffect, useRef, useState, useImperativeHandle, forwardRef } from 'react'

function CameraView({ filter, filterIntensity, cameraOn, onCameraReady, facingMode = 'user' }, ref) {
  const localVideoRef = useRef(null)
  const canvasRef = useRef(null)
  const [isReady, setIsReady] = useState(false)
  const animationRef = useRef(null)
  const filterRef = useRef(filter)
  const lastFilterRef = useRef(null)

  useImperativeHandle(ref, () => ({
    getCanvas: () => canvasRef.current,
    getVideo: () => localVideoRef.current
  }))

  useEffect(() => {
    if (lastFilterRef.current === filter) return
    lastFilterRef.current = filter

    if (!cameraOn) return
    
    if ((lastFilterRef.current === 'noir' || filterRef.current === 'noir') && filter !== 'noir') {
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
      if (localVideoRef.current?.srcObject) {
        localVideoRef.current.srcObject.getTracks().forEach(t => t.stop())
        localVideoRef.current.srcObject = null
      }
      setIsReady(false)
      
      setTimeout(() => {
        startFreshCamera()
      }, 100)
      return
    }
    
    filterRef.current = filter
  }, [filter, cameraOn])

  const startFreshCamera = async () => {
    const video = localVideoRef.current
    const canvas = canvasRef.current
    if (!video || !canvas) return

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: { ideal: 640 }, height: { ideal: 480 }, facingMode }
      })
      video.srcObject = stream
      await video.play()
      setIsReady(true)
      onCameraReady?.(true)
    } catch (err) {
      console.error('Camera error:', err)
    }
  }

  useEffect(() => {
    if (!cameraOn) {
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
      if (localVideoRef.current?.srcObject) {
        localVideoRef.current.srcObject.getTracks().forEach(t => t.stop())
      }
      setIsReady(false)
      return
    }

    const video = localVideoRef.current
    const canvas = canvasRef.current
    if (!video || !canvas) return

    let stream = null

    const startCamera = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
video: { width: { ideal: 1920 }, height: { ideal: 1080 }, facingMode }
        })
        video.srcObject = stream
        await video.play()
        setIsReady(true)
        onCameraReady?.(true)

        const render = () => {
          if (!video || video.paused || video.ended || !cameraOn) {
            animationRef.current = requestAnimationFrame(render)
            return
          }

          const ctx = canvas.getContext('2d', { alpha: false })
          const vw = video.videoWidth || 640
          const vh = video.videoHeight || 480

          if (vw > 0 && vh > 0) {
            canvas.width = vw
            canvas.height = vh

            ctx.save()
            ctx.scale(-1, 1)
            ctx.drawImage(video, -vw, 0, vw, vh)
            ctx.restore()

            if (filter && filter !== 'none') {
              ctx.filter = filter
              ctx.drawImage(canvas, 0, 0)
              ctx.filter = 'none'
            }
          }

          animationRef.current = requestAnimationFrame(render)
        }

        render()
      } catch (err) {
        console.error('Camera error:', err)
        setIsReady(false)
        onCameraReady?.(false)
      }
    }

    startCamera()

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
      if (stream) stream.getTracks().forEach(t => t.stop())
    }
  }, [cameraOn, filter, onCameraReady])

  if (!cameraOn) {
    return (
      <div className="relative w-full h-full rounded-2xl overflow-hidden glass border-2 border-pink-200 bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-pink-100 flex items-center justify-center">
            <svg className="w-10 h-10 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
            </svg>
          </div>
          <p className="text-gray-400 font-exo">Camera is off</p>
        </div>
      </div>
    )
  }

  return (
    <div className="relative w-full h-full rounded-2xl overflow-hidden glass border-2 border-pink-200">
      <canvas ref={canvasRef} className="w-full h-full object-contain" />
      <video ref={localVideoRef} autoPlay playsInline muted className="hidden" />

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-pink-primary rounded-tl-lg" />
        <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-pink-primary rounded-tr-lg" />
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-pink-primary rounded-bl-lg" />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-pink-primary rounded-br-lg" />
      </div>
      
      {isReady && (
        <div className="absolute top-4 right-4">
          <span className="px-2 py-1 bg-green-500 text-white text-xs rounded-full flex items-center gap-1">
            <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
            LIVE
          </span>
        </div>
      )}
    </div>
  )
}

export default forwardRef(CameraView)