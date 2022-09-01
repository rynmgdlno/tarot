import React, { useState, useEffect } from 'react'
import { auth } from '../../../../../firebase/firebaseConfig'
import * as EmailValidator from 'email-validator'

import CustomButton from '../../../../../components/custom-button'
import FormInput from '../../../../../components/formInput'

import '../user-modal.scss'

const ChangeEmail = ({ handleChange, handleSubmit, userInfo }) => {
  const { newEmail, currentPassword } = userInfo
  const [clicked, setClicked] = useState(false)
  const [btnDisabled, setBtnDisabled] = useState(true)
  const currentEmail = auth ? auth.currentUser.email : ''

  useEffect(() => {
    if (currentPassword && EmailValidator.validate(newEmail)) {
      setBtnDisabled(false)
    } else {
      setBtnDisabled(true)
    }
  }, [currentPassword, newEmail])

  return (
    <div className='sign-in-form'>
      {
        currentEmail && <p>Current Email: {currentEmail}</p>
      }
      <FormInput
        className={clicked && btnDisabled && !EmailValidator.validate(newEmail) ? 'alert' : undefined}
        name='newEmail'
        label='New Email:'
        type='text'
        placeholder='new email'
        onChange={handleChange}
        value={userInfo.newEmail}
      />
      <FormInput
        className={clicked && btnDisabled && !currentPassword ? 'alert' : undefined}
        name='currentPassword'
        label='Password:'
        type='password'
        placeholder='password'
        onChange={handleChange}
        value={userInfo.currentPassword}
      />
      <CustomButton
        className={btnDisabled ? 'disabled-button' : 'account-button'}
        onClick={!btnDisabled ? () => handleSubmit() : () => setClicked(true)}>
        Submit
      </CustomButton>
      {
        clicked && btnDisabled &&
        <p className='alert'>Please fill out the form correctly.</p>
      }
    </div>
  )
}

export default ChangeEmail