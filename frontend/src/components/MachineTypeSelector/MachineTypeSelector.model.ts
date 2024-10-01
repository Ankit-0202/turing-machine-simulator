// frontend/src/components/MachineTypeSelector/MachineTypeSelector.model.ts

import { MachineType } from '../../types'

export interface MachineTypeSelectorProps {
  selectedType: MachineType
  setSelectedType: React.Dispatch<React.SetStateAction<MachineType>>
}
