// frontend/src/components/TransitionInput/TransitionInput.model.ts

export interface TransitionInputProps {
  transitions: TransitionInput[]
  setTransitions: React.Dispatch<React.SetStateAction<TransitionInput[]>>
}

export interface TransitionInput {
  current_state: string
  read_symbol: string
  write_symbol: string
  direction: 'l' | 'r' | '*'
  new_state: string
  breakpoint?: boolean
}
