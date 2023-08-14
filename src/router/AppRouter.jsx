import { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import CalendarRoutes from '../calendar/routes/CalendarRoutes'
import AuthRoutes from '../auth/routes/AuthRoutes'
import { useAuthStore } from '../hooks'
import Loader from '../ui/components/Loader'

export default function AppRouter() {
  const { status, checkToken } = useAuthStore()

  useEffect(() => {
    checkToken()
  }, [])

  if (status === 'checking') {
    return <Loader />
  }

  let content
  if (status === 'not-authenticated') {
    content = (
      <>
        <Route path="auth/*" element={<AuthRoutes />} />
        <Route path="*" element={<Navigate to="auth/login" />} />
      </>
    )
  } else {
    content = (
      <>
        <Route path="/*" element={<CalendarRoutes />} />
        <Route path="*" element={<Navigate to="/*" />} />
      </>
    )
  }

  return <Routes>{content}</Routes>
}
