import { useEffect, useState } from 'react' 
import { onAuthStateChanged } from 'firebase/auth'
import { auth, db } from 'src/config/firebase'
import { doc, getDoc } from 'firebase/firestore'
import { User } from 'src/types'
import { useAppDispatch, useAppSelector } from '..'
import { resetUser, selectUid, setUser } from './userSlice'


export const useUserListener = () => {
  const dispatch = useAppDispatch()

  useEffect(
    () =>
      onAuthStateChanged(auth, async (user) => {
        if (!user) {
          dispatch(resetUser())
          return
        }
        const docRef = doc(db, 'korisnici', user?.uid)
        const docSnap = await getDoc(docRef)
        const userData = docSnap.data() as User
        if (userData) {
          dispatch(
            setUser({
              uid: user?.uid || null,
              email: user?.email || null,
              name: userData.name || '',
              agent: userData.agent || false,
              phone: userData.phone || null,
              img: userData.img || null,
              agencyImg: userData.agencyImg || null,
              agencyName: userData.agencyName || null,
              expiring: userData.expiring || "",
            })
          )
        } else {
          dispatch(
            setUser({
              uid: user?.uid || null,
              email: user?.email || null,
              name: '',
              agent: false,
              phone: '',
              img: '',
              agencyImg: '',
              agencyName: '',
              expiring: ""
            })
          )
        }
      }),
    []
  )
}

export const useGetToken = () => {
  const [token, settoken] = useState<string | null | undefined>(null)
  const uid = useAppSelector(selectUid)

  useEffect(() => {
    ; (async () => {
      const tokenId = await auth.currentUser?.getIdToken(false)
      settoken(tokenId)
    })()
  }, [uid])
  return token
}

export const getToken = async () => {
  // const t0 = performance.now()
  const token = await auth.currentUser?.getIdToken(false)

  // const t1 = performance.now()
  // console.log(`Call to doSomething took ${t1 - t0} milliseconds.`)

  return token
}
