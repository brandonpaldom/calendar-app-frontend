import { useDispatch, useSelector } from 'react-redux'
import {
  handleCloseDateDialog,
  handleOpenDateDialog,
} from '../features/ui/uiSlice'

export function useUIStore() {
  const { isDateDialogOpen } = useSelector((state) => state.ui)
  const dispatch = useDispatch()

  const openDateDialog = () => {
    dispatch(handleOpenDateDialog())
  }

  const closeDateDialog = () => {
    dispatch(handleCloseDateDialog())
  }

  return { isDateDialogOpen, openDateDialog, closeDateDialog }
}
