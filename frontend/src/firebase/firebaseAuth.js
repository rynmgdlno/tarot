import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import firebase, { auth, firestore } from "./firebaseConfig";
import { updatePalettes } from './firebasePalettes';

import { currentUserSelector, setCurrentUser } from '../features/DATA/currentUserSlice';
import { setSavedPalettes } from '../features/DATA/savedPalettesSlice';
import { setThirdParty } from '../features/UI/modals/userModal/userModalSlice';

// Google Sign In 
const googleProvider = new firebase.auth.GoogleAuthProvider()
googleProvider.setCustomParameters({ prompt: 'select_account' })
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider)


// Email/Password Sign In
export const signInEmail = async (email, password) => {
  try {
    await auth.signInWithEmailAndPassword(email, password)
  } catch (error) {
    return error
  }
}


// Add User Doc to DB on Auth
export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return
  const userRef = firestore.doc(`users/${userAuth.uid}`)
  const snapShot = await userRef.get()
  if (!snapShot.exists) {
    const { displayName, email } = userAuth
    const createdAt = new Date()
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch (error) {
      return error
    }
  }
  return userRef
}


// Re-Authenticate User
export const userReAuth = async (currentPassword) => {
  const user = auth.currentUser
  const credential = firebase.auth.EmailAuthProvider.credential(
    user.email,
    currentPassword
  )
  try {
    await user.reauthenticateWithCredential(credential)
  } catch (error) {
    return error
  }
}


// Send Password Reset Email
export const resetPassEmail = async (email) => {
  await auth.sendPasswordResetEmail(email)
}


// * // Hook for onAuthStateChanged. Currently calling in Tarot but can probably move 
// * // back to userModal. Dependent on number of rerenders and FB queries.

export const useFirebaseAuth = (auth) => {
  const dispatch = useDispatch()
  const currentUser = useSelector(currentUserSelector)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async user => {
      if (user) {
        const userRef = await createUserProfileDocument(user)
        userRef.onSnapshot(snapShot => {
          const id = snapShot.id
          const { displayName, email } = snapShot.data()
          dispatch(setCurrentUser({
            id: id,
            displayName: displayName,
            email: email
          }))
          // Retrieving Saved Palettes and adding to store
          updatePalettes(id).then(palettes => dispatch(setSavedPalettes(palettes)))
        })
        // sets state for google/github login to hide account settings menu
        if (user.providerData[0].providerId === 'password') {
          dispatch(setThirdParty(false))
        } else {
          dispatch(setThirdParty(user.providerData[0].providerId))
        }
      } else {
        dispatch(setCurrentUser(null))
      }
    })
    return () => {
      unsubscribe()
    }
  }, [auth, dispatch])
  return currentUser
}