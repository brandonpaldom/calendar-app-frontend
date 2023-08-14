import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import { useAuthStore, useForm } from '../../hooks'
import AuthLayout from '../layout/AuthLayout'

const fields = {
  email: 'client@demo.com',
  password: 'client',
}

export default function LoginPage() {
  const { startLogin, errorMessage } = useAuthStore()
  const { email, password, handleInputChange } = useForm(fields)

  const handleSubmit = (e) => {
    e.preventDefault()
    startLogin({ email, password })
  }

  useEffect(() => {
    if (errorMessage !== undefined) {
      Swal.fire('Error', errorMessage, 'error')
    }
  }, [errorMessage])

  return (
    <AuthLayout title="Login">
      <form className="grid grid-cols-1 gap-6" onSubmit={handleSubmit}>
        <label className="block">
          <span className="text-neutral-700">Email address</span>
          <input
            type="email"
            className="input"
            name="email"
            value={email}
            onChange={handleInputChange}
          />
        </label>
        <label className="block">
          <span className="text-neutral-700">Password</span>
          <input
            type="password"
            className="input"
            name="password"
            value={password}
            onChange={handleInputChange}
          />
        </label>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
      <p>
        Don&apos;t have an account?{' '}
        <Link to="/auth/register" className="link">
          Register
        </Link>
      </p>
    </AuthLayout>
  )
}
