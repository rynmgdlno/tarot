import { userReAuth } from "./firebaseAuth";
import { auth } from "./firebaseConfig";

// const user = auth.currentUser

// // Update Username
// export const updateUserName = async (newName) => {
//   try {
//     await user.updateProfile({
//       displayName: newName
//     })
//     return 'Updated User Name Successfully'
//   } catch (error) {
//     return error
//   }
// }

// // Update Email
// export const updateEmail = async (newEmail, currentPassword) => {
//   try {
//     await userReAuth(currentPassword)
//     await user.updateEmail(newEmail)
//     return 'Email Updated Successfully'
//   } catch (error) {
//     return error
//   }
// }

// // Update Password
// export const updatePass = async (currentPassword, newPassword) => {
//   try {
//     await userReAuth(currentPassword)
//     await user.updatePassword(newPassword)
//   } catch (error) {
//     return error
//   }
// }

//TODO: Test this and remove unnecessary functions
// Update User // Handles updating of display name, password and email
export const updateUser = async (newName, newEmail, newPassword, currentPassword) => {
  const user = auth.currentUser
  if (newName) {
    try {
      await user.updateProfile({
        displayName: newName
      })
      return {
        status: 'success',
        message: 'Updated User Name Successfully'
      }
    } catch (error) {
      return error
    }
  }

  if (newEmail) {
    try {
      // assigning reAuth response to variable for handling
      const reAuth = await userReAuth(currentPassword)
      // if there is an error: 
      if (reAuth) {
        return {
          status: 'error',
          message: reAuth.message
        }
      } else {
        await user.updateEmail(newEmail)
        return {
          status: 'success',
          message: 'Email Updated Successfully'
        }
      }
    } catch (error) {
      return (error)
    }
  }

  if (newPassword) {
    try {
      await userReAuth(currentPassword)
      const reAuth = await userReAuth(currentPassword)
      if (reAuth) {
        return {
          status: 'error',
          message: reAuth.message
        }
      } else {
        await user.updatePassword(newPassword)
        return {
          status: 'success',
          message: 'Password Updated Successfully'
        }
      }
    } catch (error) {
      return error
    }
  }
}