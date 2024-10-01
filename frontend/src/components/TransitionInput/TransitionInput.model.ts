// frontend/src/components/TransitionInput/TransitionInput.model.ts

import { TransitionInput } from 'types'

export interface TransitionInputProps {
  transitions: TransitionInput[]
  setTransitions: React.Dispatch<React.SetStateAction<TransitionInput[]>>
}
