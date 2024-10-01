// frontend/src/components/TransitionHistory/TransitionHistory.model.ts

export interface TransitionHistoryProps {
  transitions: TransitionTaken[]
}

export interface TransitionTaken {
  step: number
  current_state: string
  read_symbol: string
  write_symbol: string
  direction: string
  new_state: string
  breakpoint: boolean
}
