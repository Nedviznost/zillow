import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { collection, query, where, getDocs } from 'firebase/firestore'

import { db } from 'src/config/firebase'
import { Agent } from 'src/types'
import { setAgents } from './agentSlice'

export const useGetAgents = () => {
  const dispatch = useDispatch()
  const data = [] as Agent[]
  async function getAgents() {
    const q = query(collection(db, 'korisnici'), where('agent', '==', true))
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      data.push(doc.data() as Agent)
    })
    dispatch(
      setAgents({
        data,
      })
    )
  }
  useEffect(() => {
    getAgents()
  }, [])
}
