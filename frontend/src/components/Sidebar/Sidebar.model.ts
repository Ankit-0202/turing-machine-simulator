// frontend/src/components/Sidebar/Sidebar.model.ts

export interface SidebarProps {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  children: React.ReactNode
}
