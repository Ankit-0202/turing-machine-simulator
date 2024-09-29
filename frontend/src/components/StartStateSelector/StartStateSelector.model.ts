// frontend/src/components/StartStateSelector/StartStateSelector.model.ts

export interface StartStateSelectorProps {
  validStates: string[]
  selectedStartState: string
  setSelectedStartState: (state: string) => void
}
