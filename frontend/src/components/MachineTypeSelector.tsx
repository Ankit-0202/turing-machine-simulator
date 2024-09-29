// frontend/src/components/MachineTypeSelector.tsx

import React, { useEffect } from 'react'
import { MachineType } from '../types'

interface Props {
  selectedType: MachineType
  setSelectedType: React.Dispatch<React.SetStateAction<MachineType>>
}

const MachineTypeSelector: React.FC<Props> = ({
  selectedType,
  setSelectedType
}) => {
  useEffect(() => {
    const savedType = localStorage.getItem('machineType') as MachineType
    if (savedType && Object.values(MachineType).includes(savedType)) {
      setSelectedType(savedType)
    }
  }, [setSelectedType])

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newType = e.target.value as MachineType
    setSelectedType(newType)
    localStorage.setItem('machineType', newType)
  }

  return (
    <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow ml-4">
      <h3 className="text-xl font-semibold mb-4 pb-2">Machine Type</h3>
      <select
        value={selectedType}
        onChange={handleChange}
        className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-600 dark:text-white"
      >
        <option value={MachineType.STANDARD}>Standard</option>
        <option value={MachineType.LEFT_BOUNDED}>Left-Bounded</option>
        {/* Add more options here as you add more machine types */}
      </select>
    </div>
  )
}

export default MachineTypeSelector
