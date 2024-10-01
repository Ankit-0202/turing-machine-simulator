// frontend/src/components/StatusDisplay/StatusDisplay.model.ts

export interface StatusDisplayProps {
  currentState: string
  steps: number
  isStarted: boolean
  isHalted: boolean
  onStart: () => void
  onStep: () => void
  onRun: () => void
  onReset: () => void
}
