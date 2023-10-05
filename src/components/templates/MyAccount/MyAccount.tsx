/* eslint-disable default-case */
/* eslint-disable @next/next/no-img-element */
import Container from 'src/components/atoms/Container'
import { useAppSelector } from 'src/store'
import { selectUser, setUser } from 'src/store/user/userSlice'
import Label from 'src/components/atoms/HtmlLabel'
import Input from 'src/components/atoms/HtmlInput'
import {
  Avatar,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  FormGroup,
  FormHelperText,
} from '@mui/material'
import Badge from 'src/components/atoms/Badge'
import Button from 'src/components/atoms/Button'
import { User } from 'src/types'
import { useEffect, useState } from 'react'
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage'
import { updateDoc, doc } from 'firebase/firestore'
import { db } from 'src/config/firebase'
import { useDispatch } from 'react-redux'
import { useRedirectUnAuthenticatedUsers } from 'src/hooks'
import {
  FormSection,
  FormSectionTitle,
} from '../AddNewHomeTemplate/AddNewHomeTemplate'

export interface IMyAccountProps { }

const MyAccount = () => {
  useRedirectUnAuthenticatedUsers()
  const user = useAppSelector(selectUser)
  const [state, setState] = useState(user as User)
  const [uploading, setUploading] = useState(false)
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    setState(user as User)
  }, [user])

  // if (!user) {
  //   return <div> NO USER </div>
  // }

  async function handleChange() {
    setLoading(true)
    const docRef = doc(db, 'korisnici', user!.uid || '')
    await updateDoc(docRef, state as User).then(() => {
      setLoading(false)
      dispatch(setUser(state as User))
    })
  }

  function uploadAgencyPhoto(e: any) {
    const file = e.target!.files[0]
    setUploading(true)
    const storage = getStorage()
    const mountainsRef = ref(storage, file.name)
    const uploadTask = uploadBytesResumable(mountainsRef, file)
    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        console.log(`Upload is ${progress}% done`)

        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused')
            break
          case 'running':
            console.log('Upload is running')
            break
          default:
        }
      },
      (error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case 'storage/unauthorized':
            // User doesn't have permission to access the object
            setUploading(false)
            break
          case 'storage/canceled':
            setUploading(false)
            // User canceled the upload
            break
          case 'storage/unknown':
            setUploading(false)
            // Unknown error occurred, inspect error.serverResponse
            break
        }
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref)
          .then((downloadURL) => {
            setState({ ...state, img: downloadURL })
            return downloadURL
          })
          .then(async (responce) => {
            const docRef = doc(db, 'korisnici', user!.uid || '')
            // Update the timestamp field with the value from the server
            await updateDoc(docRef, {
              img: responce,
            })
            setUploading(false)
            dispatch(setUser({ ...state, agencyImg: responce } as User))
          })
      }
    )
  }


  function uploadPhoto(e: any) {
    const file = e.target!.files[0]
    setUploading(true)
    const storage = getStorage()
    const mountainsRef = ref(storage, file.name)
    const uploadTask = uploadBytesResumable(mountainsRef, file)
    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        console.log(`Upload is ${progress}% done`)

        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused')
            break
          case 'running':
            console.log('Upload is running')
            break
          default:
        }
      },
      (error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case 'storage/unauthorized':
            // User doesn't have permission to access the object
            setUploading(false)
            break
          case 'storage/canceled':
            setUploading(false)
            // User canceled the upload
            break
          case 'storage/unknown':
            setUploading(false)
            // Unknown error occurred, inspect error.serverResponse
            break
        }
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref)
          .then((downloadURL) => {
            setState({ ...state, img: downloadURL })
            return downloadURL
          })
          .then(async (responce) => {
            const docRef = doc(db, 'korisnici', user!.uid || '')
            // Update the timestamp field with the value from the server
            await updateDoc(docRef, {
              img: responce,
            })
            setUploading(false)
            dispatch(setUser({ ...state, img: responce } as User))
          })
      }
    )
  }

  const IzmeniButton = () =>
    (
      <Button
        isLoading={loading}
        className='mt-2'
        fullWidth
        onClick={() => handleChange()}
      >
        Измени
      </Button>
    ) as any

  return (
    <Container className='h-screen max-w-6xl mb-24'>
      <div className='mb-2 text-2xl font-semibold'>Детали за Корисникот</div>
      <FormSection
        title={<FormSectionTitle title='Основни информации' description='' />}
      >
        <div className=''>
          <div className=' flex justify-center items-center relative'>
            {uploading && <CircularProgress className='absolute z-50' />}
            <input
              className=' absolute z-40 rounded-full overflow-hidden cursor-pointer pt-40'
              style={{ width: 150, height: 150 }}
              type='file'
              accept='image/*'
              onChange={uploadPhoto}
            />
            <Avatar
              sx={{ width: 150, height: 150 }}
              src={state?.img || '/no_cover.png'}
            />
          </div>
          <div className='my-2 w-full flex justify-center'>
            <Badge size='sm'>Измени профилната слика</Badge>
          </div>

          <Label title='Име'>
            <Input
              placeholder={state?.name?.toUpperCase() || ''}
              defaultValue={state?.name?.toUpperCase() || ''}
              onChange={(e) => setState({ ...state, name: e.target.value })}
            />
          </Label>
          <Label title='Е-маил'>
            <Input readOnly placeholder={state?.email || ''} disabled />
          </Label>
          <Label title='Телефон'>
            <Input
              placeholder={state?.phone || '+389-- --- ---'}
              defaultValue={state?.phone || ''}
              onChange={(e) => setState({ ...state, phone: e.target.value })}
            />
          </Label>
          <IzmeniButton />
        </div>
      </FormSection>
      <div className='my-5 w-full' />
      <FormSection
        title={
          <FormSectionTitle
            title='Агенција'
            description='Со станување на агенција вашиот профил ќе се најде на листата на Агенции'
          />
        }
      >
        <div className='w-full'>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  onChange={(e) => {
                    setState({ ...state, agent: e.target.checked }
                    )
                  }}
                  defaultChecked={user?.agent}
                />
              }
              label='Агенција'
            />
            <FormHelperText>Стани агенција</FormHelperText>
          </FormGroup>
          {state?.agent && (
            <>
              <div className='w-full flex justify-center items-center relative'>
                <img
                  src={state?.agencyImg || '/no_cover.png'}
                  alt=''
                  className=' cursor-pointer object-cover h-44 bg-gray-400 w-full rounded-2xl object-top '
                />
                <input
                  className='  absolute z-40 h-40 overflow-hidden cursor-pointer pt-52 w-full'
                  type='file'
                  accept='image/*'
                  onChange={uploadAgencyPhoto}
                />
              </div>
              <div className='my-2 w-full flex justify-center'>
                <Badge size='sm'>Измени профилната слика на Агенција</Badge>
              </div>
              <Label title='Име на Агенција'>
                <Input
                  disabled={!state?.agent}
                  readOnly={!state?.agent}
                  placeholder={state?.agencyName?.toUpperCase() || ''}
                  defaultValue={state?.agencyName?.toUpperCase() || ''}
                  onChange={(e) =>
                    setState({ ...state, agencyName: e.target.value })
                  }
                />
              </Label>
            </>
          )}
          <IzmeniButton />
        </div>
      </FormSection>
    </Container>
  )
}

export default MyAccount
