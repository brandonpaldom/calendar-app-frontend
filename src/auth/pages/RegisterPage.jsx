import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import { useAuthStore, useForm } from '../../hooks'
import AuthLayout from '../layout/AuthLayout'

const fields = {
  name: 'Client',
  email: 'client@demo.com',
  password: '123456',
  confirmPassword: '123456',
}

export default function RegisterPage() {
  const { startRegister, errorMessage } = useAuthStore()
  const { name, email, password, confirmPassword, handleInputChange } =
    useForm(fields)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      Swal.fire('Error', 'Passwords do not match', 'error')
    }
    startRegister({ name, email, password })
  }

  useEffect(() => {
    if (errorMessage !== undefined) {
      Swal.fire('Error', errorMessage, 'error')
    }
  }, [errorMessage])

  return (
    <AuthLayout title="Register">
      <form className="grid grid-cols-1 gap-6" onSubmit={handleSubmit}>
        <label className="block">
          <span className="text-neutral-700">Full name</span>
          <input
            type="text"
            className="input"
            name="name"
            value={name}
            onChange={handleInputChange}
          />
        </label>
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
        <label className="block">
          <span className="text-neutral-700">Confirm password</span>
          <input
            type="password"
            className="input"
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleInputChange}
          />
        </label>
        <button type="submit" className="btn btn-primary">
          Create account
        </button>
      </form>
      <p>
        Already have an account?{' '}
        <Link to="/auth/login" className="link">
          Login
        </Link>
      </p>
    </AuthLayout>
  )
}
