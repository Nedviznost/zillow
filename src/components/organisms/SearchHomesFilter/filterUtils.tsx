import RangeSlider from 'src/components/molecules/RangeSlider'

import Autocomplete from 'src/components/molecules/Autocomplete'
import { RadioGroup } from '@headlessui/react'
import { PopoverButton } from 'src/components/molecules/PopoverMenuItem'
import { addDollar, shortenNumber } from 'src/lib/util'
import { useEffect, useState } from 'react'
import { catchError, debounceTime, EMPTY, map, Subject, tap } from 'rxjs'
import { useAppDispatch, useAppSelector } from 'src/store'
import { setHomesFilter } from 'src/store/home/homeSlice'
import {
  selectMapSearchOptions,
  MapSlice,
  setViewport,
  setSearchText,
} from 'src/store/map/mapSlice'
import { useSearchPlaces } from 'src/store/map/mapHooks'
import { condoSwitch } from 'src/components/helpers/helpers'

const homeTypes = [
  'Single_Family_Home',
  'Condo',
  'Townhouse',
  'Mobile_Manufactured',
  'Lot_Land',
  'Unknown',
].sort() as (
  | 'Single Family Home'
  | 'Condo'
  | 'Townhouse'
  | 'Mobile Manufactured'
  | 'Lot Land'
  | 'Unknown'
)[]

const statusTypes = [
  'se_prodava',
  'prodadeno',
].sort() as (
  | 'se_prodava'
  | 'prodadeno'
)[]

export const filterDefaultValues = {
  status: 'se_prodava' as string,
  price: [0, 2_000_000] as [number, number],
  yearBuilt: [1900, 2023] as [number, number],
  sqft: [0, 1_000] as [number, number],
  beds: 'Неодредено' as '1' | '2' | '3' | '4' | '5' | 'Неодредено',
  bath: 'Неодредено' as '1' | '2' | '3' | '4' | '5' | 'Неодредено',
  homeType: homeTypes,
}

export const FilterButtonWithBadge = ({
  showBadge = false,
  title,
}: {
  showBadge: boolean
  title: string
}) => (
  <PopoverButton className='relative'>
    <>
      {showBadge ? (
        <div className='absolute top-0 w-2 h-2 rounded-full left-full bg-red/50' />
      ) : null}
      {title}
    </>
  </PopoverButton>
)

export const FilterPrice = ({
  value,
  onChange,
  className = 'px-4 mt-10',
}: any) => (
  <div>
    <div className='font-semibold'>Цена од до</div>
    <RangeSlider
      step={10_000}
      onChange={onChange}
      value={value}
      initialData={filterDefaultValues.price}
      className={`${className}`}
      labelFormat={(sliderValue) => `${addDollar(shortenNumber(sliderValue))}`}
    />
  </div>
)
export const FilterYear = ({
  value,
  onChange,
  className = 'px-4 mt-10',
}: any) => (
  <div>
    <div className='font-semibold'>Година на градба</div>
    <RangeSlider
      onChange={onChange}
      value={value}
      initialData={filterDefaultValues.yearBuilt}
      step={10}
      className={`${className}`}
    />
  </div>
)
export const FilterSqft = ({
  value,
  onChange,
  className = 'px-4 mt-10',
}: any) => (
  <div>
    <div className='font-semibold'>Квадратура</div>
    <RangeSlider
      onChange={onChange}
      value={value}
      initialData={filterDefaultValues.sqft}
      step={10}
      className={`${className}`}
    />
  </div>
)

export const FilterBeds = ({ value, onChange }: any) => (
  <RadioGroup value={value} onChange={onChange} className='space-y-2 '>
    <RadioGroup.Label className='font-semibold'>Соби</RadioGroup.Label>
    <div className='flex gap-3'>
      {['1', '2', '3', '4', '5'].map((item) => (
        <RadioGroup.Option key={item} value={`${item}`}>
          {({ checked }) => (
            <span
              className={`flex items-center justify-center w-10 h-10 bg-white border rounded-sm cursor-pointer ${checked
                ? ' border-primary-600 font-bold shadow-sm text-primary-600'
                : ' bg-gray-50 shadow-inner text-gray-600 '
                }`}
            >
              {item}
              {item !== 'x' && '+'}
            </span>
          )}
        </RadioGroup.Option>
      ))}
    </div>
  </RadioGroup>
)

export const FilterBath = ({ value, onChange }: any) => (
  <RadioGroup value={value} onChange={onChange} className='space-y-2'>
    <RadioGroup.Label className='font-semibold'>Бaњи</RadioGroup.Label>
    <div className='flex gap-3 my-2'>
      {['1', '2', '3', '4', '5'].map((item) => (
        <RadioGroup.Option key={item} value={`${item}`}>
          {({ checked }) => (
            <span
              className={`flex items-center justify-center w-10 h-10 bg-white border rounded-sm cursor-pointer ${checked
                ? ' border-primary-600 font-bold shadow-sm text-primary-600'
                : ' bg-gray-50 shadow-inner text-gray-600 '
                }`}
            >
              {item}
              {item !== 'x' && '+'}
            </span>
          )}
        </RadioGroup.Option>
      ))}
    </div>
  </RadioGroup>
)

export const FilterHomeType = ({ value, onChange }: any) => (
  <fieldset className='space-y-2'>
    <legend className='font-semibold'>Тип на дом</legend>
    {filterDefaultValues.homeType.map((c) => (
      <label key={c} className='flex items-start whitespace-nowrap'>
        <input
          onChange={() => {
            const exists = value.includes(c)
            const newArr = exists
              ? value.filter((item: string) => item !== c)
              : [...value, c]
            onChange(newArr.sort())
          }}
          checked={value.includes(c)}
          type='checkbox'
          className='flex-shrink-0 w-4 h-4 mr-1'
          value={value[c]}
        />
        <div className='text-sm leading-tight select-none'>
          {condoSwitch(c)}
        </div>
      </label>
    ))}
  </fieldset>
)

export const FilterStatusType = ({ value, onChange, hidden }: any) => (

  <select
    value={value}
    className={` ${hidden && "hidden md:block"} max-w-[130px] px-3 py-2 placeholder-gray-500 border border-gray-200 rounded shadow-sm appearance-none
      focus:outline-none focus:ring-primary-500 focus:border-primary-500 text-sm`}
    onChange={(e) => onChange(e.target.value)}
  >
    <option value='se_prodava'>🔴 Се продава</option>
    <option value='se_izdava'>🟣 Се издава</option>
    <option value='prodadeno'>🟡 Продадено</option>
  </select >
)

export const ResetButton = ({ reset, className }: any) => (
  <button
    className={`px-2 py-1 text-sm border rounded border-gray-400 text-black ${className}`}
    type='button'
    onClick={() => reset()}
  >
    Ресетирај
  </button>
)

export const FilterButton = ({ setShowSidebar }: any) => (
  <button
    type='button'
    className='px-2 py-1 text-sm border rounded border-gray-400 text-black md:hidden'
    onClick={() => setShowSidebar((state: any) => !state)}
  >
    {/* <FilterIcon className='w-5 h-5 lg:hidden' /> */}
    Филтри
  </button>
)

export const useDispatchHomeFilter = ({ filterData, dirtyFields }: any) => {
  const dispatch = useAppDispatch()

  const [input$] = useState(
    () =>
      new Subject<{
        data: typeof filterData
        dirtyData: typeof dirtyFields
      }>()
  )

  useEffect(() => {
    const subscription = input$
      .pipe(
        debounceTime(1000),
        map(({ data, dirtyData }) => {
          const keys = Object.keys(dirtyData)
          return Object.fromEntries(
            Object.entries(data).filter(([key]) => keys.includes(key))
          )
        }),
        tap((v) => {
          if (v.status === undefined) {
            dispatch(setHomesFilter({ ...v, status: "se_prodava" }))
          } else {
            dispatch(setHomesFilter(v))
          }

        }),
        catchError(() => EMPTY)
      )
      .subscribe()
    return () => subscription.unsubscribe()
  }, [dispatch, input$])

  useEffect(() => {
    input$.next({ data: filterData, dirtyData: dirtyFields })
  }, [dirtyFields, filterData, input$])
}

export const LocationSearch = ({
  onChange,
  className,
}: {
  onChange?: () => void
  className?: string
}) => {
  useSearchPlaces()
  const dispatch = useAppDispatch()
  const cityList = useAppSelector(selectMapSearchOptions)
  const searchText = useAppSelector((state) => state.map.searchText)
  return (
    <Autocomplete<
      MapSlice['mapSearchOptions']['data'][number],
      false,
      false,
      false
    >
      options={cityList.data}
      noOptionsText={searchText ? 'Без резултат' : 'Внеси нешто...'}
      placeholder='Внеси нешто...'
      getOptionLabel={(x) => x.displayName}
      onInputChange={(_, v) => dispatch(setSearchText(v))}
      loading={cityList.fetching}
      isOptionEqualToValue={(a, b) => a.displayName === b.displayName}
      onChange={(_, v) => {
        if (v) {
          const { latitude, longitude } = v
          const zoom = v.zoom && v.zoom + 4
          dispatch(setViewport({ latitude, longitude, zoom }))
          if (onChange) onChange()
        }
      }}
      className={`rounded-lg ${className}`}
    />
  )
}

export const DirtyMarker = ({ isDirty }: { isDirty: boolean }) =>
  isDirty ? (
    <div className='sticky top-0 w-2 h-2 rounded-full left-full bg-red/50 -mb-2' />
  ) : null
