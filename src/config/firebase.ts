import { initializeApp } from 'firebase/app'
// import { getAnalytics } from 'firebase/analytics'

import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyBZTm7P6Hp31M7Ii4KH1tIYtjnRdhTvE2M',
  authDomain: 'zillow5mk.firebaseapp.com',
  // databaseURL:
  //   'https://zillow5mk-default-rtdb.europe-west1.firebasedatabase.app',
  databaseURL: 'gs://zillow5mk.appspot.com',
  projectId: 'zillow5mk',
  storageBucket: 'zillow5mk.appspot.com',
  messagingSenderId: '919627546742',
  appId: '1:919627546742:web:ffc1be3a4fd060e8929f57',
  measurementId: 'G-9XG7SWFTG1',
}

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig)
// const analytics = getAnalytics(firebaseApp)
export const db = getFirestore(firebaseApp)
export const auth = getAuth(firebaseApp)

export const collections = {
  // Example
  // USERS: 'users',
}
