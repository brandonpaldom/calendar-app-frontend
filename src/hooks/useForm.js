import { useEffect, useMemo, useState } from 'react'

export const useForm = (initialFormData = {}, formValidations = {}) => {
  const [formState, setFormState] = useState(initialFormData)
  const [formValidation, setFormValidation] = useState({})

  useEffect(() => {
    createValidators()
  }, [formState])

  const isFormValid = useMemo(() => {
    for (const formValue of Object.keys(formValidation)) {
      if (formValidation[formValue] !== null) return false
    }
    return true
  }, [formValidation])

  useEffect(() => {
    setFormState(initialFormData)
  }, [initialFormData])

  const handleInputChange = ({ target }) => {
    const { name, value } = target
    setFormState({
      ...formState,
      [name]: value,
    })
  }

  const handleFormReset = () => {
    setFormState(initialFormData)
  }

  const createValidators = () => {
    const formCheckValues = {}
    for (const formField of Object.keys(formValidations)) {
      const [fn, errorMessage = 'This field is required'] =
        formValidations[formField]
      formCheckValues[`${formField}Valid`] = fn(formState[formField])
        ? null
        : errorMessage
    }
    setFormValidation(formCheckValues)
  }

  return {
    ...formState,
    formState,
    isFormValid,
    formValidation,
    handleInputChange,
    handleFormReset,
  }
}
