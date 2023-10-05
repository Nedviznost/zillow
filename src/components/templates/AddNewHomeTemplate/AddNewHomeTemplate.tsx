// eslint-disable-next-line jsx-a11y/label-has-for
import React, { useEffect, useState, ReactElement } from 'react'
import {
  useInsertHomeMutation,
  useUpdateHomeMutation,
} from 'src/generated/graphql'
import Router, { useRouter } from 'next/router'
import { Controller, FieldError, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import HtmlSelect from 'src/components/atoms/HtmlSelect'
import Input from 'src/components/atoms/HtmlInput'
import Label from 'src/components/atoms/HtmlLabel'
import TextArea from 'src/components/atoms/HtmlTextArea'
import BadgeCheckIcon from '@heroicons/react/outline/BadgeCheckIcon'
import { loadStripe } from '@stripe/stripe-js'
import axios from 'axios'
import { Children } from 'src/types'
import Link from 'src/components/atoms/Link'
import Dialog from 'src/components/molecules/Dialog'
import { RadioGroup, Switch } from '@headlessui/react'
import { getHomeTypes } from 'src/store/static'
import { useAppDispatch, useAppSelector } from 'src/store'
import Button from 'src/components/atoms/Button'
import { resetMap } from 'src/store/map/mapSlice'
import { CircularProgressWithLabel } from 'src/components/molecules/Progress/CircularStatic'
import { SimpleScroller } from 'src/components/molecules/Draggable/Dragable'
import { useMyHomeEdit, useRedirectUnAuthenticatedUsers } from 'src/hooks'
import { MapLocationPicker, newHomeSchema, NewHomeSchema } from './utils' 

export interface IAddNewHomeTemplateProps { }

export const FormSection = ({
  title,
  children,
}: {
  title: string | ReactElement
  children: Children
}) => (
  <div className='grid gap-8 pb-6 sm:grid-cols-2 md:grid-cols-3'>
    <div className='col-span-1'>{title}</div>
    <div className='grid col-span-2 gap-4 sm:grid-cols-2'>{children}</div>
  </div>
)

export const FormSectionTitle = ({
  title,
  description,
}: {
  title: string
  description: string
}) => (
  <div className='space-y-4'>
    <div className='text-xl font-semibold'>{title}</div>
    <div className='text-sm text-gray-600'>{description}</div>
  </div>
)

export const defaultValuesData = {
  title: undefined,
  address: '',
  bath: 0,
  beds: 0,
  city: '',
  description: '',
  features: '',
  published: true,
  price: undefined,
  sqft: undefined,
  plan: 0,
  state: '',
  style: 'Lot_Land',
  yearBuilt: 2002,
  zipcode: '',
  lat: undefined,
  lng: undefined,
  imgs: undefined,
  status: "se_prodava"
}

const AddNewHomeTemplate = (editHome?: any) => {
  useRedirectUnAuthenticatedUsers()


  const editData = editHome.editHome
  const router = useRouter()
  const isEditPage = router.pathname.includes('izmeni')
  const homeId = Number(router.query.id)
  const [isUploading, setIsUploading] = useState(false)
  const [publishedHome, addNewHome] = useInsertHomeMutation()
  const [updatedHome, updateHome] = useUpdateHomeMutation()

  useMyHomeEdit(homeId, isEditPage)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<NewHomeSchema>({
    resolver: yupResolver(newHomeSchema),
    defaultValues: defaultValuesData,
  })

  const formData = watch()

  function setEditData() {

    if (editData && isEditPage) {
      const {
        title,
        address,
        bath,
        beds,
        city,
        description,
        features,
        published,
        price,
        sqft,
        plan,
        state,
        style,
        yearBuilt,
        zipcode,
        lat,
        lng,
        imgs,
        status
      } = editData

      setValue('title', title)
      setValue('address', address)
      setValue('bath', bath)
      setValue('beds', beds)
      setValue('city', city)
      setValue('state', state)
      setValue('description', description)
      setValue('features', features)
      setValue('published', published)
      setValue('price', price)
      setValue('sqft', sqft)
      setValue('plan', plan)
      setValue('style', style)
      setValue('yearBuilt', yearBuilt)
      setValue('zipcode', zipcode)
      setValue('lat', lat)
      setValue('lng', lng)
      setValue('imgs', imgs)
      setValue('status', status)
    }
  }


  useEffect(() => {
    if (editData && isEditPage) {
      setEditData()
    }
  }, [editData])


  const uid = useAppSelector((state) => state.user.data.user?.uid)
  const [publishing, setPublishing] = useState(false)
  const [showDialog, setshowDialog] = useState(false)
  const [showErrorDialog, setShowErrorDialog] = useState(false)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const onSubmit = handleSubmit(async (data: any) => {
    const { plan } = formData

    setPublishing(true)

    const updatedFormData = {
      id: homeId,
      ...formData
    }

    console.log(updatedFormData)
    console.log("updatedFormData")

    if (isEditPage) {
      await updateHome(updatedFormData).then(() => {
        setShowEditDialog(true)
      })
    }
    else if (!isEditPage) {
      const { ...uploadData } = data
      console.log(uploadData)
      const home = await addNewHome({ object: { ...uploadData, uid } })
      if (home.data?.insert_homes_one?.id && plan && plan > 0 && !isEditPage) {
        const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
        const stripePromise = loadStripe(publishableKey || '')
        const stripe = await stripePromise
        const checkoutSession = await axios.post('/api/create-stripe-session', {
          id: home.data?.insert_homes_one?.id,
          plan,
          imgs: uploadData.imgs,
          address: uploadData.address,
        })
        const result = await stripe?.redirectToCheckout({
          sessionId: checkoutSession.data.id,
        })
      } else {
        if (home.error && !isEditPage) setShowErrorDialog(true)
        if (home.data?.insert_homes_one?.created_at && !isEditPage) setshowDialog(true)
      }
    }
    setPublishing(false)
  })

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(resetMap())
  }, [dispatch])

  const [circuleProgress, setCirculeProgress] = useState(0)
  const isLand = formData.style.includes('Lot_Land')


  const handleImageUpload = async (e) => {
    const images = e.target.files;

    if (images && images.length > 20) {
      setError('imgs', {
        message: 'Неможе да се внесат повеќе од 20 слики. Ве молиме реорганизирајте ги.',
      });
      return;
    }

    if (images && images.length > 0) {
      clearErrors('imgs');
      setIsUploading(true);
      const list = [];

      try {
        for (const file of images) {
          const formData = new FormData();
          formData.append('files[]', file);

          const response = await axios.put(
            'https://next.nedviznost.mk/remote.php/dav/files/nextcloud/' + file.name,
            formData,
            {
              headers: {
                'Authorization': 'Basic ' + btoa('nextcloud:damjan123'),
                'Content-Type': 'application/octet-stream',
              },
            }
          );

          if (response.status === 201) {
            console.log(response.data); // Log the response data
            console.log(response); // Log the response data
            const obj = {} as any;
            obj.sorting = 0;
            obj.url = response.headers['oc-fileid']; // Use the OC-FileId header
            list.push(obj);
            console.log(obj);
          } else {
            throw new Error('Failed to upload image');
          }
        }

        const sortingList = list.map((item, i) => ({ url: item.url, sorting: i }));
        setValue('imgs', sortingList);
        setIsUploading(false);
      } catch (error) {
        setIsUploading(false);
        setError('imgs', {
          message: error.message,
        });
      }
    }
  };


  const [imageSrc, setImageSrc] = useState<string | null>(null);

  useEffect(() => {
    const fetchImage = async () => {
      const config = {
        auth: {
          username: 'nextcloud',
          password: 'damjan123',
        },
        responseType: 'blob', // Get image as a binary blob
      } as any;

      try {
        const response = await axios.get('https://next.nedviznost.mk/remote.php/dav/files/nextcloud/138728.jpg', config); // Replace with your backend image endpoint
        setImageSrc(URL.createObjectURL(response.data));
      } catch (error) {
        console.error(error);
      }
    };

    fetchImage();
  }, []);


  return (
    <form onSubmit={onSubmit} className='mb-24 space-y-20'>
      {/* <img src="" /> */}
      {imageSrc ? (
        <img src={imageSrc} alt="Fetched from Nextcloud" />
      ) : (
        <p>Loading image...</p>
      )}
      <div className='mt-12 text-3xl font-medium'>Додај нов дом</div>
      <Dialog
        open={showEditDialog}
        setOpen={setShowEditDialog}
        className='max-w-md'
      >
        <div className='text-xl font-semibold'>Успешно изменет оглас</div>
        <p className='mt-4 text-sm text-gray-600'>
          Вашиот оглас е изменет со број на идентификација {homeId}
        </p>
        <Link
          className='inline-block px-4 py-2 mt-8 text-center text-white bg-primary-600'
          href={`/dom/${homeId}`}
        >
          Погледни го имотот
        </Link>
      </Dialog>

      <Dialog
        open={showErrorDialog}
        setOpen={setShowErrorDialog}
        className='max-w-md'
      >
        <div className='text-xl font-semibold'>Упс. Дојде до грешка</div>
        <p className='mt-4 text-sm text-gray-600'>Дојде до грешка</p>
      </Dialog>
      <Dialog open={showDialog} setOpen={setshowDialog} className='max-w-md'>
        <div className='text-xl font-semibold'>
          🎊 Вашиот нов дом е објавен! 🎊
        </div>
        <p className='mt-4 text-sm text-gray-600'>
          Честитки Вашиот нов дом е објавен.
        </p>
        <p>
          Број за идентификација: {publishedHome.data?.insert_homes_one?.id}
        </p>
        <div className='flex justify-end space-x-4'>
          <button
            type='button'
            onClick={() => Router.reload()}
            className='inline-block px-4 py-2 mt-8 text-center border text-primary-600 border-primary-600'
          >
            + Додај нов дом
          </button>
          <Link
            className='inline-block px-4 py-2 mt-8 text-center text-white bg-primary-600'
            href={`/dom/${publishedHome.data?.insert_homes_one?.id}`}
          >
            Погледни го имотот
          </Link>
        </div>
      </Dialog>

      <FormSection
        title={<FormSectionTitle title='Основни информации' description='' />}
      >
        <Label title='Статус' error={errors.status}>
          <HtmlSelect {...register('status')}>
            <option value='se_prodava'>Се продава</option>
            <option value='se_izdava'>Се издава</option>
            <option value='prodadeno'>ПРОДАДЕНО</option>
          </HtmlSelect>
        </Label>
        <Label title='Цена €(EUR)' error={errors.price}>
          <Input
            type='number'
            placeholder='Внеси ја цената во €(EUR). '
            {...register('price')}
          />
        </Label>

        <Label title='Стил' error={errors.style}>
          <HtmlSelect {...register('style')}>
            <option value='Select type of house' disabled>
              Избери тип на имот
            </option>
            <option value='Lot_Land'>Имот</option>
            <option value='Condo'>Стан</option>
            <option value='Single_Family_Home'>Куќа</option>
            <option value='Townhouse'>Викендица</option>
            <option value='Unknown'>Непознато </option>
            {/* <option value='Mobile_Manufactured'>Мобилна градба</option> */}

          </HtmlSelect>
        </Label>

        <Label
          title={!isLand ? 'Година на градба' : ''}
          error={errors.yearBuilt}
        >
          {!isLand && (
            <Input
              type='number'
              placeholder='Внеси година на градба.'
              {...register('yearBuilt')}
            />
          )}
        </Label>
      </FormSection>
      <FormSection
        title={<FormSectionTitle title='Површина на имот' description='' />}
      >
        <Label title={!isLand ? 'Бaњи' : ''} error={errors.bath}>
          {!isLand && (
            <Input
              type='number'
              placeholder='Внеси број на Бaњи.'
              {...register('bath')}
            />
          )}
        </Label>

        <Label title={!isLand ? 'Соби' : ''} error={errors.beds}>
          {!isLand && (
            <Input
              type='number'
              placeholder='Внеси број на Соби.'
              {...register('beds')}
            />
          )}
        </Label>
        <Label title='Површина во метри квадратни' error={errors.sqft}>
          <Input type='number' placeholder='Површина.' {...register('sqft')} />
        </Label>
        <Label title='Цена од метар квадратен (Автоматски)' error={errors.sqft}>
          <Input
            readOnly
            placeholder='Цена од метар квадратен.'
            value={
              !!formData.price &&
                formData.sqft &&
                formData.price > 0 &&
                formData.sqft > 0
                ? `${((formData.price || 0) / (formData.sqft || 0)).toFixed(
                  1
                )} €/㎡`
                : ''
            }
          />
        </Label>
      </FormSection>
      <FormSection
        title={
          <FormSectionTitle
            title='Локација'
            description='Кликни на иконата за локација и постави ја над вашиот имот'
          />
        }
      >
        <MapLocationPicker setValue={setValue} editHome={editHome} className='sm:col-span-2' />

        <Label title='Адреса' error={errors.address}>
          <TextArea
            placeholder='Внеси адреса.'
            {...register('address')}
            rows={4}
          />
        </Label>
        <Label title='Град' error={errors.city}>
          <Input
            type='string'
            placeholder='Внеси град.'
            {...register('city')}
          />
        </Label>
        <Label title='Општина' error={errors.state}>
          <Input placeholder='Внеси општина.' {...register('state')} />
        </Label>
        <Label title='Зип код' error={errors.zipcode}>
          <Input placeholder='Внеси зип код' {...register('zipcode')} />
        </Label>
      </FormSection>

      <FormSection title={<FormSectionTitle title='Медиа' description='' />}>
        <Label
          title='Слики'
          className='col-span-2'
          error={errors.imgs && (errors.imgs as unknown as FieldError)}
        >
          <Input
            type='file'
            placeholder='Внеси слики'
            accept='image/*'
            multiple
            disabled={formData && formData.imgs && formData.imgs.length > 7}
            onChange={handleImageUpload}
          />
          {isUploading && <CircularProgressWithLabel value={circuleProgress} />}
          {isUploading && <div className='mt-2'>Се внесува...</div>}
          {formData && formData.imgs && formData.imgs.length > 0 && (
            <div className='flex items-center gap-1 py-2 mt-2'>
              <BadgeCheckIcon className='w-4 h-4 text-green' />
              {formData.imgs?.length}{' '}
              {formData.imgs?.length === 1 ? 'слика внесена' : 'слики внесени'}
            </div>
          )}
        </Label>

        {(formData && formData.imgs) ? (
          <SimpleScroller imgs={formData.imgs} setValue={setValue} />
        ) : (
          <> </>
        )}
      </FormSection>


      <FormSection
        title={<FormSectionTitle title='Додатни информации' description='' />}
      >
        <Label title='Наслов' error={errors.description}>
          <TextArea
            placeholder='Наслов на огласот.'
            rows={4}
            {...register('title')}
          />
        </Label>
        <Label title='Опис' error={errors.description}>
          <TextArea
            placeholder='Опиши го домот.'
            rows={4}
            {...register('description')}
          />
        </Label>
        <Label title='Додатоци' error={errors.features}>
          <TextArea
            placeholder='Клима | Паркинг | 3 спрата'
            rows={4}
            {...register('features')}
          />
        </Label>
      </FormSection>
      <FormSection
        title={
          <FormSectionTitle
            title='План'
            description='Внеси го огласот во најгорни резултати за побрза продажба! Цените се во денари месечно. Никакви кредитни податоци нема да ви биднат побарани'
          />
        }
      >
        <Controller
          name='plan'
          control={control}
          render={({ field: { onChange, value } }) => (
            <RadioGroup
              value={value?.toString()}
              onChange={(v: any) => onChange(+(v || 0))}
              className='col-span-2 space-y-2'
            >
              <div className='grid w-full grid-cols-2 gap-3 my-2 lg:grid-cols-4'>
                {[0, 1].map((item) => (
                  <RadioGroup.Option
                    key={item}
                    value={`${item}`}
                    className='cursor-pointer'
                    disabled={getHomeTypes(item).price === 2400}
                  >
                    {({ checked }) => (
                      <div
                        className={` ${getHomeTypes(item).price === 2400 && "bg-gray-100 text-gray-500"} p-6 transition-all relative  rounded-lg shadow-lg  ${checked
                          ? ' border-white border bg-luxury   shadow-primary/50 text-white'
                          : 'border border-primary-100 shadow-black/20 '
                          }`}
                      >
                        {getHomeTypes(item).tag && (
                          <div className='absolute bottom-1 pt-2 text-xs font-light tracking-wider'>
                            {getHomeTypes(item).tag}
                          </div>
                        )}
                        <div className='font-semibold '>
                          {getHomeTypes(item).displayName}
                        </div>
                        <div className={(getHomeTypes(item).discountPrice === 0 && getHomeTypes(item).price !== 0) ? "text-xl line-through" : 'text-xl'}>
                          {getHomeTypes(item).price
                            ? `${getHomeTypes(item).price} МКД`
                            : 'Бесплатно'}
                        </div>
                        <div className='text-2xl'>
                          {(getHomeTypes(item).discountPrice === 0) ?
                            `${getHomeTypes(item).discountPrice} МКД` : ""}
                        </div>
                      </div>
                    )}
                  </RadioGroup.Option>
                ))}
              </div>
            </RadioGroup>
          )}
        />
      </FormSection>
      <FormSection
        title={
          <FormSectionTitle
            title='Јавно'
            description='Вашиот оглас ќе може веднаш да бидне виден.'
          />
        }
      >
        <Controller
          name='published'
          control={control}
          render={({ field: { onChange, value } }) => (
            <Switch
              checked={value || false}
              onChange={onChange}
              className={`${value ? 'bg-luxury' : 'bg-gray-200'
                } relative inline-flex items-center h-8 shadow-inner rounded-full w-16`}
            >
              <span
                className={`${value ? 'translate-x-9' : 'translate-x-1'
                  } inline-block w-6 h-6 transform bg-white rounded-full transition-transform`}
              />
            </Switch>
          )}
        />
      </FormSection>

      <div className='flex justify-end'>
        <Button
          isLoading={publishing}
          className='w-full px-20 py-2 text-white border rounded sm:w-1/2 md:w-1/3 lg:w-1/4 border-primary bg-primary-500'
          type='submit'
        >
          {isEditPage ? 'Измени' : 'Објави'}
        </Button>
      </div>
    </form >
  )
}

export default AddNewHomeTemplate
