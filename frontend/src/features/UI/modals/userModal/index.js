import React, { useState } from 'react'
import { auth } from '../../../../firebase/firebaseConfig'
import { useDispatch, useSelector } from 'react-redux'
import { currentUserSelector } from '../../../DATA/currentUserSlice'
import { menuToggle } from '../../menu/menuSlider/menuSliderSlice'
import {
  userNameSelector,
  userModalSelector,
  userModalToggle,
  thirdPartySelector
} from './userModalSlice'

import AccountSettings from './accountSettings/accountSettings'
import SignIn from './signIn/signIn'
import SignUp from './signUp/signUp'

import CustomButton from '../../../../components/custom-button'

import '../modal.scss'
import '../modal-animate.css'

const UserModal = () => {
  // redux / current user and login type state/dispatch
  const dispatch = useDispatch()
  const currentUser = useSelector(currentUserSelector)
  const isThirdParty = useSelector(thirdPartySelector)
  const userName = useSelector(userNameSelector)
  const userToggled = useSelector(userModalSelector)
  // form & page control 
  const [account, setAccount] = useState(false) // account page toggle
  const [signUp, setSignUp] = useState(false) // signup page toggle
  // UI state
  const modalInitialClass = userToggled == null ? 'modal-animate-off' : 'modal-animate-return'

  return (
    <div
      className={userToggled ? 'modal modal-animate' : `modal ${modalInitialClass}`}
    >
      <div className='user-menu'>
        {
          !currentUser && signUp ?
            <SignUp /> :
            !currentUser ?
              <div className='user-sub-menu'>
                <SignIn />
                <CustomButton className='account-button' onClick={() => setSignUp(true)}>Create New Account</CustomButton>
              </div> :
              <div className='user-header'>
                <h3 className="medFont">{currentUser ? userName || currentUser.displayName : 'error'}</h3>
                <div className='user-button-container'>
                  <CustomButton
                    onClick={() => auth.signOut()}
                    className='account-button'>Sign Out</CustomButton>
                  {
                    isThirdParty ?
                      <div className='third-party'>You are signed in with {isThirdParty}</div> :
                      <CustomButton
                        onClick={() => setAccount(!account)}
                        className='account-button'>Account Settings</CustomButton>
                  }
                </div>
              </div>
        }
      </div>
      {
        account &&
        <AccountSettings />
      }
      <div className='close-button-container'>
        <CustomButton
          onClick={() => {
            dispatch(userModalToggle(false))
            dispatch(menuToggle(false))
            setAccount(false)
            setSignUp(false)
          }}
          className='basic-button close-button'>Close</CustomButton>
      </div>
    </div>
  )
}

export default UserModal