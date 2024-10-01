// frontend/src/components/Settings/Settings.model.ts

import { TransitionInput } from '../../types'

export interface SettingsProps {
  isOpen: boolean
  toggleSettings: () => void
  startState: string
  setStartState: React.Dispatch<React.SetStateAction<string>>
  transitions: TransitionInput[]
}
