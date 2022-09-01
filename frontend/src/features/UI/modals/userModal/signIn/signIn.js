import React, { useEffect, useState } from 'react'
import * as EmailValidator from 'email-validator'

import { signInEmail, signInWithGoogle, resetPassEmail } from '../../../../../firebase/firebaseAuth'

import CustomButton from '../../../../../components/custom-button'
import FormInput from '../../../../../components/formInput'
import GoogleIcon from '../../../../../assets/icons/google.icon'

import '../user-modal.scss'

const SignIn = () => {
  const [userInfo, setUserInfo] = useState({
    email: '',
    password: ''
  })
  const { email, password } = userInfo
  const [clicked, setClicked] = useState(false)
  const [btnDisabled, setBtnDisabled] = useState(true)
  const [errorMessage, setErrorMessage] = useState(false)
  const [reset, setReset] = useState(false)

  const handleChange = e => {
    const { name, value } = e.target
    setUserInfo({
      ...userInfo, [name]: value
    })
  }

  const handleSubmit = () => {
    const { email, password } = userInfo
    signInEmail(email, password)
    setUserInfo({
      email: '',
      password: ''
    })
  }

  useEffect(() => {
    if (password.length > 7 && EmailValidator.validate(email)) {
      setBtnDisabled(false)
    } else {
      setBtnDisabled(true)
    }
  }, [email, password])

  return (
    <div className='sign-in'>
      <p>Hello!</p>
      <form className='sign-in-form'>
        <FormInput
          className={clicked && btnDisabled && !EmailValidator.validate(email) ? 'alert' : undefined}
          placeholder='email'
          label='email:'
          name='email'
          type='email'
          onChange={handleChange} />
        <FormInput
          className={clicked && btnDisabled && password.length < 8 ? 'alert' : undefined}
          placeholder='password'
          label='password:'
          name='password'
          type='password'
          onChange={handleChange} />
        {
          errorMessage &&
          <span>{errorMessage.message}</span>
        }
      </form>
      {
        clicked && btnDisabled &&
        <p className='alert'>Please fill out the form correctly.</p>
      }
      <CustomButton
        onClick={!btnDisabled ? () => handleSubmit() : () => setClicked(true)}
        type='submit'
        className={btnDisabled ? 'disabled-button' : undefined}>Sign In</CustomButton>
      <CustomButton
        onClick={signInWithGoogle}
        className='google-button'>
        Sign In with<GoogleIcon className='btn-icn' /></CustomButton>
      {
        errorMessage.code === 'auth/too-many-requests' &&
        <CustomButton
          onClick={() => {
            resetPassEmail(userInfo.email)
            setReset(true)
            setErrorMessage(false)
            setUserInfo({
              email: '',
              password: ''
            })
          }}
          className='afm-button'>Reset Password</CustomButton>
      }
      {
        reset && <p>Check your email for a link to reset your password.</p>
      }
    </div>
  )
}

export default SignIn