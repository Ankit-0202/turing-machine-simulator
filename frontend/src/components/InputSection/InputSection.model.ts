// frontend/src/components/InputSection/InputSection.model.ts

export interface InputSectionProps {
  inputString: string
  setInputString: React.Dispatch<React.SetStateAction<string>>
  bulkInput: string
  setBulkInput: React.Dispatch<React.SetStateAction<string>>
  handleBulkInput: () => void
}
