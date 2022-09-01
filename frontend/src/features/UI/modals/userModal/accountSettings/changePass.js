import React, { useEffect, useState } from 'react'

import CustomButton from '../../../../../components/custom-button'
import FormInput from '../../../../../components/formInput'

import '../user-modal.scss'

const ChangePass = ({ handleChange, handleSubmit, userInfo }) => {
  const { currentPassword, newPassword, confirmPassword } = userInfo
  const [clicked, setClicked] = useState(false)
  const [btnDisabled, setBtnDisabled] = useState(true)
  const btnClass = btnDisabled ? 'disabled-button' : ''
  const passMatch = newPassword === confirmPassword

  useEffect(() => {
    if (currentPassword && passMatch && newPassword.length >= 8 && confirmPassword.length >= 8) {
      setBtnDisabled(false)
    } else {
      setBtnDisabled(true)
    }
  }, [confirmPassword, currentPassword, newPassword, passMatch])

  return (
    <div className='sign-in-form'>
      <p>Change Password</p>
      <FormInput
        className={clicked && btnDisabled && !userInfo.currentPassword && 'alert'}
        name='currentPassword'
        label='Current Password:'
        type='password'
        placeholder='current password'
        onChange={handleChange}
        value={userInfo.currentPassword}
      />
      <FormInput
        className={clicked && btnDisabled && userInfo.newPassword.length < 8 ? 'alert' : ''}
        name='newPassword'
        label='New Password:'
        type='password'
        placeholder='new password'
        onChange={handleChange}
        value={userInfo.newPassword}
      />
      <FormInput
        className={clicked && btnDisabled && userInfo.confirmPassword.length < 8 && 'alert'}
        name='confirmPassword'
        label='Confirm Password:'
        type='password'
        placeholder='confirm password'
        onChange={handleChange}
        value={userInfo.confirmPassword}
      />
      <CustomButton
        className={`account-button ${btnClass}`}
        type='submit'
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

export default ChangePass