import PropTypes from 'prop-types'

export default function AuthLayout({ title, children }) {
  return (
    <div className="py-6 sm:bg-neutral-50 w-full h-[100dvh] sm:grid sm:justify-center sm:items-start sm:pt-12">
      <div className="bg-white flex flex-col gap-6 p-6 sm:w-[480px] sm:shadow-lg sm:rounded-lg">
        <h1>{title}</h1>
        {children}
      </div>
    </div>
  )
}

AuthLayout.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
}
