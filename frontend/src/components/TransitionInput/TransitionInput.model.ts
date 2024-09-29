// frontend/src/components/TransitionInput/TransitionInput.model.ts

import { TransitionInput } from '../../types'

export interface TransitionInputComponentProps {
  transitions: TransitionInput[]
  setTransitions: React.Dispatch<React.SetStateAction<TransitionInput[]>>
}
