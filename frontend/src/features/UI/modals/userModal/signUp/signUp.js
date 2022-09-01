import React, { useState, useEffect } from 'react'
import { auth } from '../../../../../firebase/firebaseConfig'
import * as EmailValidator from 'email-validator'

import FormInput from '../../../../../components/formInput'
import CustomButton from '../../../../../components/custom-button'

import '../user-modal.scss'
import { createUserProfileDocument } from '../../../../../firebase/firebaseAuth'

const SignUp = () => {
  const [userInfo, setUserInfo] = useState({
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const { displayName, email, password, confirmPassword } = userInfo
  const [clicked, setClicked] = useState(false)
  const [btnDisabled, setBtnDisabled] = useState(true)
  const [errorMessage, setErrorMessage] = useState(false)
  const passMatch = password === confirmPassword

  const handleChange = e => {
    const { name, value } = e.target
    setUserInfo({
      ...userInfo, [name]: value
    })
  }

  const handleSubmit = async e => {
    const { email, password } = userInfo

    try {
      const { user } = await auth.createUserWithEmailAndPassword(email, password)
      await createUserProfileDocument(user, { displayName })
      setUserInfo({
        displayName: '',
        email: '',
        password: '',
        confirmPassword: ''
      })
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        setErrorMessage('email in use')
      } else {
        setErrorMessage(error.code)
      }
    }
  }

  useEffect(() => {
    if (password.length > 7 && passMatch && EmailValidator.validate(email)) {
      setBtnDisabled(false)
    } else {
      setBtnDisabled(true)
    }
  }, [email, confirmPassword, password, passMatch])

  return (
    <div className='sign-up'>
      <h2>Sign Up</h2>
      <form className='sign-up-form'>
        <FormInput
          className={clicked && btnDisabled && !displayName && 'alert'}
          placeholder='user name'
          label='user name:'
          name='displayName'
          type='text'
          onChange={handleChange}
          value={displayName} />
        <FormInput
          className={clicked && btnDisabled && !EmailValidator.validate(email) && 'alert'}
          placeholder='email'
          label='email:'
          name='email'
          type='email'
          onChange={handleChange}
          value={email} />
        <FormInput
          className={clicked && btnDisabled && password.length < 8 && 'alert'}
          placeholder='password'
          label='password:'
          name='password'
          type='password'
          onChange={handleChange}
          value={password} />
        <FormInput
          className={clicked && btnDisabled && confirmPassword.length < 8 && 'alert'}
          placeholder='confirm password'
          label='confirm password:'
          name='confirmPassword'
          type='password'
          onChange={handleChange}
          value={confirmPassword} />
        {
          errorMessage &&
          <span>{errorMessage.message}</span>
        }
      </form>
      <CustomButton
        className={btnDisabled && 'disabled-button'}
        onClick={!btnDisabled ? () => handleSubmit() : () => setClicked(true)}>
        Submit
      </CustomButton>
      {
        !passMatch ? <p>Passwords do not match.</p> :
          clicked && btnDisabled &&
          <p className='alert'>Please fill out the form correctly.</p>
      }
    </div>
  )
}

export default SignUp