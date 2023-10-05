import { RefreshIcon, GlobeIcon } from '@heroicons/react/solid'
import { useCallback, useEffect, useState } from 'react'
import Mapbox from 'src/components/organisms/Mapbox'
import {
  PanelContainer,
  Panel,
  MapMessage,
  FetchingBool,
} from 'src/components/organisms/MapboxContent/MapboxContent'
import ZoomControls from 'src/components/organisms/ZoomControls'
import {
  MapControl,
  MapControlAction,
} from 'src/components/organisms/ZoomControls/ZoomControls'
import { notify } from 'src/hooks'
import { useAppDispatch, useAppSelector } from 'src/store'
import { MapProvider } from 'src/store/map/mapContext'
import { selectViewport, setViewport } from 'src/store/map/mapSlice'
import { useSearchAddress } from 'src/store/streams'
import * as yup from 'yup'
import Pin from '@heroicons/react/outline/LocationMarkerIcon'
import PinSolid from '@heroicons/react/solid/LocationMarkerIcon'
import { Marker } from 'react-map-gl'
import Autocomplete from 'src/components/molecules/Autocomplete'

export type AddressSearchType = {
  address: string
  city: string
  state: string
  postcode: string
  latitude: number
  longitude: number
}

export const newHomeSchema = yup
  .object({
    address: yup.string().required('внеси ја адресата.'),
    bath: yup
      .number()
      .typeError(
        'внеси го бројот на Бaњи. На пример 2. Вашата куќа има купатило така ?'
      )
      .min(0, 'негативен број? Сериозно?')
      .max(10000, `не ми личи дека е возможно.`),
    plan: yup.number(),
    beds: yup
      .number()
      .typeError('внеси го бројот на соби. На пример 2.')
      .min(0, 'негативен број? Сериозно?')
      .max(10000, 'не.'),
    price: yup
      .number()
      .typeError('Внеси ја цената.')
      .min(0, 'негативен број? Сериозно?'),
    sqft: yup
      .number()
      .typeError(
        'Внеси ја квадратурата на вашата куќа во метри квадратни. Пример 300'
      )
      .min(0, 'негативен број? Сериозно?'),
    city: yup.string(),
    description: yup
      .string()
      .required(
        'Внеси неколку зборови за куќата што пробуваш да ја продадеш. Сакаш да ја продадеш или не ?'
      ),
    title: yup
      .string()
      .required(
        'Внеси неколку зборови за куќата што пробуваш да ја продадеш. Сакаш да ја продадеш или не ?'
      ),
    facts: yup.string(),
    published: yup.boolean(),
    features: yup.string(),
    state: yup.string(),
    style: yup
      .string()
      .required('Избери стил дури и да не  ја наоѓаш куќата со посебен стил.'),
    yearBuilt: yup
      .number()
      .min(1500, 'Таа куќа припаѓа на музеј.')
      .max(2022, `Тоа е дата за во иднина. Во изградба уф!`)
      .required('внеси ја година на изградба.'),
    lat: yup
      .number()
      .min(10, 'Географска ширина мора да е од -90 до 90')
      .max(80, ` Географска ширина мора да е од -90 до 90`)
      .required('Географска ширина мора да се внесе.'),
    lng: yup
      .number()
      .min(10, 'Географска должина мора да е од -180 до 180')
      .max(30, `Географска должина мора да е од -180 до 180`)
      .required('Слика е задолжителна.'),
    imgs: yup
      .array()
    // .of(yup.string())
    // .required('селектирај 1 до 20 слики')
    // .min(1, 'селектирај 1 до 20 слики')
    // .max(30, 'селектирај 1 до 20 слики'),
    ,

    zipcode: yup.string(),
    status: yup.string().required('Избери статус'),
  })
  .required()

export type NewHomeSchema = yup.InferType<typeof newHomeSchema>

export const MapLocationPicker = ({
  editHome,
  setValue,
  className,
}: {
  editHome: any
  setValue: Function
  className?: string
}) => {
  const [marker, setMarker] = useState(() => (
    {
      lat: 0,
      lng: 0,
    }
  ))

  const [searchText, setSearchText] = useState('')
  const [location, setLocation] = useState('')

  const {
    data: searchTextData,
    loading: searchTextFetching,
    error: searchTextError,
  } = useSearchAddress({ searchText })
  const {
    data: markerDragData,
    loading: markerDragFetching,
    error: markerDragError,
  } = useSearchAddress({ searchText: location })

  const dispatch = useAppDispatch()

  const setAddress = useCallback(
    (v: {
      latitude?: number
      longitude?: number
      address?: string
      state?: string
      city?: string
      postcode?: string
    }) => {
      const { latitude, longitude, address, city, postcode, state } = v
      setValue('lat', marker.lat)
      setValue('lng', marker.lng)
      setValue('address', address)
      setValue('state', state)
      setValue('city', city)
      setValue('zipcode', postcode)
    },
    [setValue]
  )


  useEffect(() => {
    if (editHome && !!editHome.editHome) {
      const { lat } = editHome.editHome
      const { lng } = editHome.editHome
      setMarker({
        lat,
        lng
      })
      setValue('lat', lat)
      setValue('lng', lng)
    }
  }, [editHome, setValue])

  useEffect(() => {
    if (markerDragData?.length > 0) {
      setAddress(markerDragData[0])
      const { latitude, longitude } = markerDragData[0]
      if (latitude && longitude) {
        notify({ message: `Сочувана локација со ${latitude}, ${longitude}` })
        setValue('lat', latitude)
        setValue('lng', longitude)
      }
    }
  }, [markerDragData, setAddress])

  const viewport = useAppSelector(selectViewport)

  return (
    <MapProvider className={`h-96 ${className}`}>
      <Mapbox>
        <Marker
          longitude={marker.lng}
          latitude={marker.lat}
          draggable
          // onDragStart={onMarkerDragStart}
          onDrag={(event: { lngLat: [number, number] }) => {
            setMarker({
              lng: event.lngLat[0],
              lat: event.lngLat[1],
            })
          }}
          onDragEnd={(event) => {
            setLocation(event.lngLat.join(','))
          }}
        >
          <PinSolid className='w-6 h-6' />
        </Marker>
        <PanelContainer>
          <Panel position='left-top'>
            <Autocomplete<AddressSearchType, false, false, false>
              options={searchTextData}
              getOptionLabel={(x) => x.address}
              onInputChange={(_, v) => {
                setSearchText(v)
              }}
              loading={searchTextFetching}
              isOptionEqualToValue={(a, b) => a.address === b.address}
              onChange={(_, v) => {
                if (v) {
                  const { latitude, longitude } = v
                  setMarker({ lat: latitude, lng: longitude })
                  dispatch(setViewport({ latitude, longitude, zoom: 14 }))
                  setAddress(v)
                }
              }}
              className='rounded-lg shadow-lg'
            />
          </Panel>
          <Panel position='right-top'>
            <ZoomControls>
              <ZoomControls.ZoomIn />
              <ZoomControls.ZoomOut />
              <MapControlAction
                action={() =>
                  setMarker({ lat: viewport.latitude, lng: viewport.longitude })
                }
                Icon={Pin}
              />
              <MapControlAction
                action={() => {
                  setAddress({})
                }}
                Icon={RefreshIcon}
              />
              <MapControl
                action={setViewport({
                  latitude: marker.lat,
                  longitude: marker.lng,
                  zoom: 9,
                })}
                Icon={GlobeIcon}
              />
            </ZoomControls>
          </Panel>
          <Panel position='center-bottom'>
            <FetchingBool fetching={searchTextFetching || markerDragFetching} />
            <MapMessage message={markerDragError} />
          </Panel>
        </PanelContainer>
      </Mapbox>
    </MapProvider>
  )
}
