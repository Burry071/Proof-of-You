"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { ArrowRight, RefreshCw } from "lucide-react"

export function ZkProofVisualizer() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [step, setStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [speed, setSpeed] = useState([50])
  const animationRef = useRef<number | null>(null)
  const lastTimeRef = useRef<number>(0)

  // Animation parameters
  const totalSteps = 4
  const circleRadius = 30
  const personRadius = 15
  const dataRadius = 8
  const arrowLength = 80
  const colors = {
    person: "#10b981", // emerald-600
    data: "#ef4444", // red-500
    proof: "#3b82f6", // blue-500
    verifier: "#8b5cf6", // violet-500
    success: "#10b981", // emerald-600
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    canvas.width = canvas.clientWidth
    canvas.height = canvas.clientHeight

    // Draw initial state
    drawVisualization(ctx, 0)

    // Handle window resize
    const handleResize = () => {
      canvas.width = canvas.clientWidth
      canvas.height = canvas.clientHeight
      drawVisualization(ctx, step)
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    drawVisualization(ctx, step)
  }, [step])

  useEffect(() => {
    if (isPlaying) {
      lastTimeRef.current = performance.now()
      animationRef.current = requestAnimationFrame(animate)
    } else if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isPlaying, speed])

  const animate = (time: number) => {
    const elapsed = time - lastTimeRef.current
    const frameRate = 1000 / ((101 - speed[0]) * 10) // Convert speed to milliseconds

    if (elapsed > frameRate) {
      lastTimeRef.current = time
      setStep((prevStep) => {
        const nextStep = prevStep + 0.02
        if (nextStep >= totalSteps) {
          setIsPlaying(false)
          return 0
        }
        return nextStep
      })
    }

    animationRef.current = requestAnimationFrame(animate)
  }

  const drawVisualization = (ctx: CanvasRenderingContext2D, currentStep: number) => {
    const width = ctx.canvas.width
    const height = ctx.canvas.height

    // Clear canvas
    ctx.clearRect(0, 0, width, height)

    // Calculate positions
    const centerY = height / 2
    const personX = width * 0.2
    const verifierX = width * 0.8
    const personY = centerY
    const verifierY = centerY

    // Draw person
    ctx.beginPath()
    ctx.arc(personX, personY, circleRadius, 0, Math.PI * 2)
    ctx.fillStyle = "#f0fdf4" // emerald-50
    ctx.fill()
    ctx.strokeStyle = colors.person
    ctx.lineWidth = 2
    ctx.stroke()

    // Draw person icon
    ctx.beginPath()
    ctx.arc(personX, personY - 5, personRadius, 0, Math.PI * 2)
    ctx.fillStyle = colors.person
    ctx.fill()
    ctx.beginPath()
    ctx.moveTo(personX - 10, personY + 15)
    ctx.lineTo(personX + 10, personY + 15)
    ctx.lineTo(personX, personY - 5)
    ctx.closePath()
    ctx.fillStyle = colors.person
    ctx.fill()

    // Draw verifier
    ctx.beginPath()
    ctx.arc(verifierX, verifierY, circleRadius, 0, Math.PI * 2)
    ctx.fillStyle = "#f5f3ff" // violet-50
    ctx.fill()
    ctx.strokeStyle = colors.verifier
    ctx.lineWidth = 2
    ctx.stroke()

    // Draw verifier icon (magnifying glass)
    ctx.beginPath()
    ctx.arc(verifierX - 5, verifierY - 5, 10, 0, Math.PI * 2)
    ctx.strokeStyle = colors.verifier
    ctx.lineWidth = 3
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(verifierX + 3, verifierY + 3)
    ctx.lineTo(verifierX + 12, verifierY + 12)
    ctx.strokeStyle = colors.verifier
    ctx.lineWidth = 3
    ctx.stroke()

    // Animation based on current step
    if (currentStep < 1) {
      // Step 0-1: Person has private data
      const dataX = personX + currentStep * 40 - 20
      const dataY = personY - 40

      // Draw data
      ctx.beginPath()
      ctx.arc(dataX, dataY, dataRadius, 0, Math.PI * 2)
      ctx.fillStyle = colors.data
      ctx.fill()

      // Draw data label
      ctx.font = "12px Arial"
      ctx.fillStyle = "#000"
      ctx.textAlign = "center"
      ctx.fillText("DOB", dataX, dataY + 4)

      // Draw text explanation
      ctx.font = "14px Arial"
      ctx.fillStyle = "#000"
      ctx.textAlign = "center"
      ctx.fillText("User has private date of birth data", width / 2, height - 30)
    } else if (currentStep < 2) {
      // Step 1-2: Generate proof
      const progress = currentStep - 1
      const dataX = personX - 20
      const dataY = personY - 40
      const proofX = personX + progress * 40
      const proofY = personY - 40 + progress * 40

      // Draw data
      ctx.beginPath()
      ctx.arc(dataX, dataY, dataRadius, 0, Math.PI * 2)
      ctx.fillStyle = colors.data
      ctx.fill()

      // Draw data label
      ctx.font = "12px Arial"
      ctx.fillStyle = "#000"
      ctx.textAlign = "center"
      ctx.fillText("DOB", dataX, dataY + 4)

      // Draw proof being generated
      ctx.beginPath()
      ctx.arc(proofX, proofY, dataRadius * progress, 0, Math.PI * 2)
      ctx.fillStyle = colors.proof
      ctx.fill()

      // Draw proof label
      if (progress > 0.5) {
        ctx.font = "12px Arial"
        ctx.fillStyle = "#fff"
        ctx.textAlign = "center"
        ctx.fillText("ZKP", proofX, proofY + 4)
      }

      // Draw text explanation
      ctx.font = "14px Arial"
      ctx.fillStyle = "#000"
      ctx.textAlign = "center"
      ctx.fillText("Generating zero-knowledge proof of age", width / 2, height - 30)
    } else if (currentStep < 3) {
      // Step 2-3: Send proof to verifier
      const progress = currentStep - 2
      const proofX = personX + 40 + progress * (verifierX - personX - 80)
      const proofY = personY

      // Draw proof
      ctx.beginPath()
      ctx.arc(proofX, proofY, dataRadius, 0, Math.PI * 2)
      ctx.fillStyle = colors.proof
      ctx.fill()

      // Draw proof label
      ctx.font = "12px Arial"
      ctx.fillStyle = "#fff"
      ctx.textAlign = "center"
      ctx.fillText("ZKP", proofX, proofY + 4)

      // Draw arrow
      const arrowStartX = personX + circleRadius
      const arrowEndX = verifierX - circleRadius

      ctx.beginPath()
      ctx.moveTo(arrowStartX, personY)
      ctx.lineTo(arrowEndX, verifierY)
      ctx.strokeStyle = "#94a3b8" // slate-400
      ctx.lineWidth = 2
      ctx.stroke()

      // Arrow head
      const arrowHeadSize = 10
      ctx.beginPath()
      ctx.moveTo(arrowEndX, verifierY)
      ctx.lineTo(arrowEndX - arrowHeadSize, verifierY - arrowHeadSize / 2)
      ctx.lineTo(arrowEndX - arrowHeadSize, verifierY + arrowHeadSize / 2)
      ctx.closePath()
      ctx.fillStyle = "#94a3b8" // slate-400
      ctx.fill()

      // Draw text explanation
      ctx.font = "14px Arial"
      ctx.fillStyle = "#000"
      ctx.textAlign = "center"
      ctx.fillText("Sending proof to verifier (no personal data transmitted)", width / 2, height - 30)
    } else {
      // Step 3-4: Verification complete
      const progress = Math.min(1, currentStep - 3)

      // Draw proof at verifier
      ctx.beginPath()
      ctx.arc(verifierX, verifierY - 40, dataRadius, 0, Math.PI * 2)
      ctx.fillStyle = colors.proof
      ctx.fill()

      // Draw proof label
      ctx.font = "12px Arial"
      ctx.fillStyle = "#fff"
      ctx.textAlign = "center"
      ctx.fillText("ZKP", verifierX, verifierY - 40 + 4)

      // Draw verification success indicator
      if (progress > 0.5) {
        ctx.beginPath()
        ctx.arc(verifierX, verifierY, circleRadius * 1.3, 0, Math.PI * 2)
        ctx.strokeStyle = colors.success
        ctx.lineWidth = 3 * progress
        ctx.stroke()

        // Draw checkmark
        const checkSize = 20 * progress
        ctx.beginPath()
        ctx.moveTo(verifierX - checkSize / 2, verifierY)
        ctx.lineTo(verifierX - checkSize / 6, verifierY + checkSize / 2)
        ctx.lineTo(verifierX + checkSize / 2, verifierY - checkSize / 3)
        ctx.strokeStyle = colors.success
        ctx.lineWidth = 3
        ctx.stroke()
      }

      // Draw text explanation
      ctx.font = "14px Arial"
      ctx.fillStyle = "#000"
      ctx.textAlign = "center"
      ctx.fillText("Verification successful! Age confirmed without revealing birthdate", width / 2, height - 30)
    }

    // Draw step indicators
    const indicatorRadius = 6
    const indicatorSpacing = 20
    const indicatorsWidth = (totalSteps - 1) * indicatorSpacing
    const indicatorsStartX = (width - indicatorsWidth) / 2

    for (let i = 0; i < totalSteps; i++) {
      const indicatorX = indicatorsStartX + i * indicatorSpacing
      ctx.beginPath()
      ctx.arc(indicatorX, 20, indicatorRadius, 0, Math.PI * 2)

      if (i < Math.floor(currentStep)) {
        ctx.fillStyle = colors.success
      } else if (i === Math.floor(currentStep)) {
        ctx.fillStyle = "#d1fae5" // emerald-100
        ctx.strokeStyle = colors.success
        ctx.lineWidth = 2
        ctx.stroke()
      } else {
        ctx.fillStyle = "#e2e8f0" // slate-200
      }

      ctx.fill()
    }
  }

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const handleReset = () => {
    setIsPlaying(false)
    setStep(0)
  }

  const handleStepForward = () => {
    setIsPlaying(false)
    setStep((prevStep) => {
      const nextStep = Math.floor(prevStep) + 1
      return nextStep >= totalSteps ? 0 : nextStep
    })
  }

  return (
    <div className="w-full max-w-2xl space-y-4">
      <div className="relative aspect-video w-full overflow-hidden rounded-lg border bg-background">
        <canvas ref={canvasRef} className="h-full w-full" />
      </div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon" onClick={handlePlayPause}>
            {isPlaying ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="6" y="4" width="4" height="16" />
                <rect x="14" y="4" width="4" height="16" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
            )}
            <span className="sr-only">{isPlaying ? "Pause" : "Play"}</span>
          </Button>
          <Button variant="outline" size="icon" onClick={handleReset}>
            <RefreshCw className="h-4 w-4" />
            <span className="sr-only">Reset</span>
          </Button>
          <Button variant="outline" size="icon" onClick={handleStepForward}>
            <ArrowRight className="h-4 w-4" />
            <span className="sr-only">Next Step</span>
          </Button>
        </div>
        <div className="flex w-full items-center space-x-2 sm:w-auto">
          <span className="text-sm text-muted-foreground">Speed:</span>
          <Slider className="w-[100px]" value={speed} min={10} max={100} step={1} onValueChange={setSpeed} />
        </div>
      </div>
    </div>
  )
}
