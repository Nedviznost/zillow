import PopoverMenu, {
  PopoverPanel,
} from 'src/components/molecules/PopoverMenuItem'

import { useState, memo } from 'react'
import { useForm, Controller } from 'react-hook-form'
import Sidebar from 'src/components/molecules/Sidebar'
import {
  filterDefaultValues,
  FilterPrice,
  FilterBath,
  FilterBeds,
  FilterButtonWithBadge,
  FilterSqft,
  FilterYear,
  FilterHomeType,
  ResetButton,
  FilterButton,
  useDispatchHomeFilter,
  LocationSearch,
  DirtyMarker,
  FilterStatusType,
} from './filterUtils'

const SearchHomesFilter = ({
  sidebarOpenDefault = false,
}: {
  sidebarOpenDefault?: boolean
}) => {
  const {
    watch,
    control,
    formState: { dirtyFields, isDirty },
    reset,
  } = useForm({
    defaultValues: filterDefaultValues,
  })

  const filterData = watch()
  useDispatchHomeFilter({ filterData, dirtyFields })

  const [showSidebar, setShowSidebar] = useState(sidebarOpenDefault)

  return (
    <div className='absolute md:relative top:10 z-50 w-full flex items-center justify-center gap-12 md:mb-2'>
      <div className='w-full md:relative flex items-center gap-8 md:mb-2 max-w-6xl bg-white'>
        {/**
         * Absolutely positioned sidebar
         */}
        <Sidebar
          open={showSidebar}
          setOpen={setShowSidebar}
          className='space-y-6'
        >
          <Sidebar.Header setOpen={setShowSidebar}>Филтер</Sidebar.Header>
          <Sidebar.Body>
            <Controller
              name='status'
              control={control}
              render={({ field: { onChange, value } }) => (
                <FilterStatusType value={value} onChange={onChange} />
              )}
            />
            <Controller
              name='homeType'
              control={control}
              render={({ field: { onChange, value } }) => (
                <FilterHomeType value={value} onChange={onChange} />
              )}
            />
            <Controller
              name='beds'
              control={control}
              render={({ field: { onChange, value } }) => (
                <FilterBeds value={value} onChange={onChange} />
              )}
            />
            <Controller
              name='bath'
              control={control}
              render={({ field: { onChange, value } }) => (
                <FilterBath value={value} onChange={onChange} />
              )}
            />
            <Controller
              name='price'
              control={control}
              render={({ field: { onChange, value } }) => (
                <FilterPrice
                  value={value}
                  onChange={onChange}
                  className='px-6 mt-10'
                />
              )}
            />
            <Controller
              name='yearBuilt'
              control={control}
              render={({ field: { onChange, value } }) => (
                <FilterYear
                  value={value}
                  onChange={onChange}
                  className='px-6 mt-10'
                />
              )}
            />
            <Controller
              name='sqft'
              control={control}
              render={({ field: { onChange, value } }) => (
                <FilterSqft
                  value={value}
                  onChange={onChange}
                  className='px-6 mt-10'
                />
              )}
            />
          </Sidebar.Body>
          {Object.keys(dirtyFields).length > 0 ? (
            <Sidebar.Footer>
              <ResetButton reset={reset} />
            </Sidebar.Footer>
          ) : null}
        </Sidebar>

        {/**
         * Main filters
         */}
        <div className='m-1'>
          <LocationSearch />
        </div>
        <Controller
          name='status'
          control={control}
          render={({ field: { onChange, value } }) => (
            <FilterStatusType value={value} onChange={onChange} hidden />
          )}
        />
        <Controller
          name='price'
          control={control}
          render={({ field: { onChange, value } }) => (
            <PopoverMenu className='hidden md:block'>
              <FilterButtonWithBadge
                showBadge={Boolean(dirtyFields.price)}
                title='Цена'
              />
              <PopoverPanel>
                <div className='w-56'>
                  <FilterPrice value={value} onChange={onChange} />
                </div>
              </PopoverPanel>
            </PopoverMenu>
          )}
        />
        <Controller
          name='yearBuilt'
          control={control}
          render={({ field: { onChange, value } }) => (
            <PopoverMenu className='hidden lg:block'>
              <FilterButtonWithBadge
                showBadge={Boolean(dirtyFields.yearBuilt)}
                title='Година'
              />
              <PopoverPanel>
                <div className='w-56'>
                  <FilterYear value={value} onChange={onChange} />
                </div>
              </PopoverPanel>
            </PopoverMenu>
          )}
        />
        <Controller
          name='sqft'
          control={control}
          render={({ field: { onChange, value } }) => (
            <PopoverMenu className='hidden lg:block'>
              <FilterButtonWithBadge
                showBadge={Boolean(dirtyFields.sqft)}
                title='Квадратура'
              />
              <PopoverPanel>
                <div className='w-56'>
                  <FilterSqft value={value} onChange={onChange} />
                </div>
              </PopoverPanel>
            </PopoverMenu>
          )}
        />

        <PopoverMenu className='hidden md:block'>
          <FilterButtonWithBadge
            showBadge={Boolean(dirtyFields.bath || dirtyFields.beds)}
            title='Соби'
          />
          <PopoverPanel>
            <div className='space-y-4'>
              <Controller
                name='beds'
                control={control}
                render={({ field: { onChange, value } }) => (
                  <FilterBeds value={value} onChange={onChange} />
                )}
              />
              <Controller
                name='bath'
                control={control}
                render={({ field: { onChange, value } }) => (
                  <FilterBath value={value} onChange={onChange} />
                )}
              />
            </div>
          </PopoverPanel>
        </PopoverMenu>
        <PopoverMenu className='hidden md:block'>
          <FilterButtonWithBadge
            showBadge={Boolean(dirtyFields.homeType)}
            title='Тип на дом'
          />
          <PopoverPanel>
            <Controller
              name='homeType'
              control={control}
              render={({ field: { onChange, value } }) => (
                <FilterHomeType value={value} onChange={onChange} />
              )}
            />
          </PopoverPanel>
        </PopoverMenu>
        <div className='flex items-center ml-auto space-x-2'>
          {isDirty && <ResetButton reset={reset} />}
          <div className='relative'>
            <DirtyMarker isDirty={isDirty} />
            <FilterButton setShowSidebar={setShowSidebar} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default memo(SearchHomesFilter)
