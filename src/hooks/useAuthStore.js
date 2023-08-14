import { useDispatch, useSelector } from 'react-redux'
import { checking, clearError, login, logout } from '../features/auth/authSlice'
import calendarApi from '../api/calendarApi'
import { handleLogoutCalendar } from '../features/calendar/calendarSlice'

export function useAuthStore() {
  const { status, user, errorMessage } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  const startLogin = async ({ email, password }) => {
    dispatch(checking())
    try {
      const {
        data: { data },
      } = await calendarApi.post('/auth/login', {
        email,
        password,
      })
      localStorage.setItem('token', data.token)
      localStorage.setItem('token-init-date', new Date().getTime())
      dispatch(login({ name: data.name, uid: data.uid }))
    } catch (error) {
      dispatch(logout('Invalid credentials'))
      setTimeout(() => {
        dispatch(clearError())
      }, 300)
    }
  }

  const startRegister = async ({ name, email, password }) => {
    dispatch(checking())
    try {
      const {
        data: { data },
      } = await calendarApi.post('/auth/register', {
        name,
        email,
        password,
      })
      localStorage.setItem('token', data.token)
      localStorage.setItem('token-init-date', new Date().getTime())
      dispatch(login({ name: data.name, uid: data.uid }))
    } catch (error) {
      console.log(error)
      dispatch(logout(error.response.data.message))
      setTimeout(() => {
        dispatch(clearError())
      }, 300)
    }
  }

  const checkToken = async () => {
    const token = localStorage.getItem('token')
    if (!token) {
      return dispatch(logout())
    }
    try {
      const {
        data: { data },
      } = await calendarApi.get('/auth/renew')
      localStorage.setItem('token', data.token)
      localStorage.setItem('token-init-date', new Date().getTime())
      dispatch(login({ name: data.name, uid: data.uid }))
    } catch (error) {
      localStorage.clear()
      dispatch(logout())
    }
  }

  const startLogout = () => {
    localStorage.clear()
    dispatch(handleLogoutCalendar())
    dispatch(logout())
  }

  return {
    status,
    user,
    errorMessage,
    startLogin,
    startRegister,
    checkToken,
    startLogout,
  }
}
