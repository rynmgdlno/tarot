import React, { useState } from 'react'

import CustomButton from '../../../../../components/custom-button'
import FormInput from '../../../../../components/formInput'

import '../user-modal.scss'

const ChangeUser = ({ handleChange, handleSubmit, userInfo }) => {
  const [clicked, setClicked] = useState(false)
  const btnDisabled = userInfo.newName.length < 6
  const btnClass = btnDisabled ? 'disabled-button' : ''

  return (
    <div className='sign-in-form'>
      <p>Change Username</p>
      <FormInput
        className={clicked && btnDisabled ? 'alert' : undefined}
        name='newName'
        label='New Username:'
        type='text'
        placeholder='new username'
        onChange={handleChange}
        value={userInfo.newName}
        autoComplete='new-password'
      />
      <CustomButton
        className={`account-button ${btnClass}`}
        onClick={!btnDisabled ? () => handleSubmit() : () => setClicked(true)}>
        Submit
      </CustomButton>
      {
        clicked && btnDisabled &&
        <p className='alert'>Username must be at least 6 characters</p>
      }
    </div>
  )
}

export default ChangeUser