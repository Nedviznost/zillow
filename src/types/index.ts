/* eslint-disable camelcase */
import { ReactElement } from 'react'

export type CounterStatus = 'idle' | 'loading' | 'failed'

export type User = {
  uid: string | null
  email: string | null
  name: string | null
  agent: boolean | false
  phone: string | null
  img: string | null
  agencyImg: string | null
  agencyName: string | null
  expiring: string | null
}
export type Agent = {
  uid: string | null
  email: string | null
  name: string | null
  agent: boolean | false
  phone: string | null
  img: string | null
  agencyImg: string | null
  agencyName: string | null
}

export type HomeDetailed = {
  id: number
  lat: any
  lng: any
  address: string
  yearBuilt: string
  type: string[]
  bath: number
  beds: number
  price: number
  sqft: number
  plan?: number | null | undefined
  imgs?: any | null | undefined
  style?: any | null | undefined
  status?: any | null | undefined
  created_at?: Date
  updated_at?: Date
}

export type Item = {
  id: string
  primary: string
  secondary: string
}

export type SigninInfo = {
  email: string
  password: string
}
export type SignupInfo = SigninInfo & {
  name?: string
  isLandlord?: boolean
}

export type AsyncData<T> = {
  data: T
  fulfilled?: boolean
  loading?: boolean
  error?: boolean
}

export type AsyncUser = AsyncData<User>

export type Children = ReactElement | ReactElement[] | string

export type NotificationType = {
  id: string
  message: Children
  type?: 'success' | 'error' | 'info' | 'warning'
  position?:
    | 'top-right'
    | 'top-left'
    | 'top-center'
    | 'bottom-right'
    | 'bottom-left'
    | 'bottom-center'
}

export type Viewport = {
  latitude: number
  longitude: number
  zoom: number
}

export type Bounds = [[number, number], [number, number]]

export type PlaceTypesType =
  | 'region'
  | 'postcode'
  | 'district'
  | 'place'
  | 'locality'
  | 'neighborhood'
  | 'address'
  | 'poi'

export type MapSearch = {
  displayName: string
} & Viewport

export type MenuType = {
  [key: string]: {
    title: string
    menu: { subtitle: string; url: string }[]
  }[]
}

export type AllColors =
  | 'primary'
  | 'black'
  | 'white'
  | 'red'
  | 'green'
  | 'yellow'
  | 'gray'
