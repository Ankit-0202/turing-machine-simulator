// frontend/src/components/Controls/Controls.model.ts

export interface ControlsProps {
  onStart: () => void
  onStep: () => void
  onRun: () => void
  onReset: () => void
  isStarted: boolean
  isHalted: boolean
}
