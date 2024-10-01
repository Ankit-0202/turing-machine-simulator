// frontend/src/components/TapeDisplay/TapeDisplay.model.ts

import { MachineType } from '../../types'

export interface TapeDisplayProps {
  tape: string
  head: number
  machineType: MachineType
}
