import { createAsyncThunk } from '@reduxjs/toolkit'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut as firebaseSignout,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth'
import { getFunctions, httpsCallable } from 'firebase/functions'
import { auth, db } from 'src/config/firebase'
import { doc, setDoc } from 'firebase/firestore'
import { SigninInfo, SignupInfo } from '../../types'

// Wrap the functions with createAsyncThunk to include them within the redux flow. We dont have to wrap these functions with try catch as we handle with in extra reducers.

export const signin = createAsyncThunk(
  'user/signin',
  async ({ email, password }: SigninInfo) => {
    await signInWithEmailAndPassword(auth, email, password).then(() => {
      updateProfile(auth.currentUser as any, {
        displayName: auth.currentUser?.displayName,
      })
    })
  }
)

export const signup = createAsyncThunk(
  'user/signup',
  async ({ email, password, name, isLandlord }: SignupInfo) => {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    ).then(async (res) => {
      const user = {
        name,
        email,
        displayName: name,
        agencyName: '', 
        agent: isLandlord,
        img: '',
        agencyImg: '',
        phone: '',
        uid: res.user.uid,
        expiring: ''
      }
      await setDoc(doc(db, 'korisnici', res.user.uid), user)
      return { res, user }
    })
    updateProfile(userCredential.res.user, {
      displayName: userCredential.user.name,
    })
  }
)
export const signout = createAsyncThunk('user/signout', async () => {
  await firebaseSignout(auth)
})

export const forgotPassword = createAsyncThunk(
  'user/forgotPassword',
  async (email: string) => {
    await sendPasswordResetEmail(auth, email)
  }
)

export const googleSignin = createAsyncThunk('user/googleSignin', async () => {
  await signInWithPopup(auth, new GoogleAuthProvider())
})

export const resetUserTask = createAsyncThunk('user/reset', async () => {
  const resetTestUser = httpsCallable(getFunctions(), 'resetTestUser')
  await resetTestUser()
})
