import { useSelector } from 'react-redux'
import { useAuthStore } from '../../hooks'
import Logo from '../../ui/components/Logo'

export default function Navbar() {
  const { user } = useSelector((state) => state.auth)
  const { startLogout } = useAuthStore()

  const handleLogout = () => {
    startLogout()
  }

  return (
    <nav className="flex flex-col gap-2 justify-center px-6 py-3 sm:py-0 sm:h-16 border-b border-neutral-100">
      <div className="flex items-center justify-between">
        <Logo />
        <div className="flex items-center space-x-4">
          <p className="hidden sm:block">
            Welcome, <span className="font-bold">{user?.name}</span>
          </p>
          <button className="btn btn-neutral" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
      <div className="block sm:hidden">
        <p>
          Welcome, <span className="font-bold">{user?.name}</span>
        </p>
      </div>
    </nav>
  )
}
