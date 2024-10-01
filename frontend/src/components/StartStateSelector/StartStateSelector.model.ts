// frontend/src/components/StartStateSelector/StartStateSelector.model.ts

import { TransitionInput } from 'types'

export interface StartStateSelectorProps {
  transitions: TransitionInput[]
  startState: string
  setStartState: React.Dispatch<React.SetStateAction<string>>
}
