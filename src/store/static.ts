import { Maybe } from 'src/generated/graphql'
import { MenuType, PlaceTypesType } from 'src/types'

export const DEBOUNCE_DELAY = 300

export const placeTypeZoom: { [key in PlaceTypesType]: number } = {
  region: 6,
  postcode: 6,
  district: 7,
  place: 8,
  locality: 9,
  neighborhood: 10,
  address: 11,
  poi: 11,
}

export const MENU_ITEMS: MenuType = {
  'Мој акаунт': [
    {
      title: 'Профил',
      menu: [
        { subtitle: 'Мој акаунт', url: '/profil' },
        { subtitle: 'Посакувани', url: '/posakuvani' },
      ],
    },
    {
      title: 'Агент',
      menu: [
        { subtitle: 'Додај нов дом', url: '/dom/nov' },
        { subtitle: 'Мој домови', url: '/dom/moidomovi' },
        { subtitle: 'Пораки', url: '/messages' },
      ],
    },
  ],
  Купи: [
    {
      title: 'Имоти на продажба',
      menu: [
        { subtitle: 'Куќи на продажба', url: '/homes' },
        // { subtitle: 'Foreclosures', url: '/' },
        { subtitle: 'На продажба од лице', url: '/homes' },
        // { subtitle: 'Open houses', url: '/' },
        // { subtitle: 'New construction', url: '/' },
        // { subtitle: 'Coming soon', url: '/' },
        // { subtitle: 'Recent home sales', url: '/' },
        { subtitle: 'Сите имоти', url: '/homes' },
      ],
    },
    // {
    //   title: 'Resources',
    //   menu: [
    //     { subtitle: 'Buyers Guide', url: '/' },
    //     { subtitle: 'Foreclosure center', url: '/' },
    //     { subtitle: 'Real estate app', url: '/' },
    //   ],
    // },
  ],
  // Rent: [
  //   {
  //     title: 'Search for Rentals',
  //     menu: [
  //       { subtitle: 'Rental Buildings', url: '/' },
  //       { subtitle: 'Apartments for rent', url: '/' },
  //       { subtitle: 'Houses for rent', url: '/' },
  //       { subtitle: 'All rental listings', url: '/' },
  //       { subtitle: 'All rental buildings', url: '/' },
  //     ],
  //   },
  //   {
  //     title: 'Renter tools',
  //     menu: [
  //       { subtitle: 'Applications', url: '/' },
  //       { subtitle: 'Payments', url: '/' },
  //       { subtitle: 'Leases', url: '/' },
  //       { subtitle: 'Affordability calculator', url: '/' },
  //       { subtitle: 'Renters guide', url: '/' },
  //     ],
  //   },
  // ],
  // Sell: [
  //   {
  //     title: 'Resources',
  //     menu: [
  //       { subtitle: 'Explore your options', url: '/' },
  //       { subtitle: `See your home's Zestimate`, url: '/' },
  //       { subtitle: 'Home values', url: '/' },
  //       { subtitle: 'Sellers guide', url: '/' },
  //     ],
  //   },
  //   {
  //     title: 'Selling options',
  //     menu: [
  //       { subtitle: 'Sell with Zillow Offers', url: '/' },
  //       { subtitle: `Find a seller's agent`, url: '/' },
  //       { subtitle: 'Post For Sale by Owner', url: '/' },
  //     ],
  //   },
  // ],
  // 'Home loans': [
  //   {
  //     title: 'Shop mortgages',
  //     menu: [
  //       { subtitle: 'Mortgage lenders', url: '/' },
  //       { subtitle: 'HELOC lenders', url: '/' },
  //       { subtitle: 'Mortgage rates', url: '/' },
  //       { subtitle: 'Refinance rates', url: '/' },
  //       { subtitle: 'All mortgage rates', url: '/' },
  //     ],
  //   },
  //   {
  //     title: 'Calculators',
  //     menu: [
  //       { subtitle: 'Mortgage calculator', url: '/' },
  //       { subtitle: 'Refinance calculator', url: '/' },
  //       { subtitle: 'Affordability calculator', url: '/' },
  //       { subtitle: 'Amortization calculator', url: '/' },
  //       { subtitle: 'Debt-to-Income calculator', url: '/' },
  //     ],
  //   },
  //   {
  //     title: 'Resources',
  //     menu: [
  //       { subtitle: 'Lender reviews', url: '/' },
  //       { subtitle: 'Mortgage learning center', url: '/' },
  //       { subtitle: 'Mortgages app', url: '/' },
  //       { subtitle: 'Lender resource center', url: '/' },
  //     ],
  //   },
  // ],
  // 'Agent finder': [
  //   {
  //     title: 'Looking for pros',
  //     menu: [
  //       { subtitle: 'Real estate agents', url: '/' },
  //       { subtitle: 'Property managers', url: '/' },
  //       { subtitle: 'Home inspectors', url: '/' },
  //       { subtitle: 'Other pros', url: '/' },
  //       { subtitle: 'Home improvement pros', url: '/' },
  //       { subtitle: 'Home builders', url: '/' },
  //       { subtitle: 'Real estate photographers', url: '/' },
  //     ],
  //   },
  //   {
  //     title: "I'm a pro",
  //     menu: [
  //       { subtitle: 'Agent advertising', url: '/' },
  //       { subtitle: 'Agent resource center', url: '/' },
  //       { subtitle: 'Create a free agent account', url: '/' },
  //       { subtitle: 'Real estate business plan', url: '/' },
  //       { subtitle: 'Real estate agent scripts', url: '/' },
  //       { subtitle: 'Listing flyer templates', url: '/' },
  //     ],
  //   },
  // ],
  // 'Manage rentals': [
  //   {
  //     title: 'Rental Management Tools',
  //     menu: [
  //       { subtitle: 'My Listings', url: '/' },
  //       { subtitle: 'Messages', url: '/' },
  //       { subtitle: 'Applications', url: '/' },
  //       { subtitle: 'Leases', url: '/' },
  //       { subtitle: 'Payments', url: '/' },
  //     ],
  //   },
  //   {
  //     title: 'Learn more',
  //     menu: [
  //       { subtitle: 'Zillow Rental Manager', url: '/' },
  //       { subtitle: 'Price My Rental', url: '/' },
  //       { subtitle: 'Resource Center', url: '/' },
  //       { subtitle: 'Help Center', url: '/' },
  //     ],
  //   },
  // ],
}

export const showHomes = (zoom: number) => zoom >= 8.5
export const showCities = (zoom: number) => zoom <= 8.4999 && zoom >= 5.5
export const showStates = (zoom: number) => zoom < 5.499

export const initialViewport = {
  latitude: 41.8,
  longitude: 21.7,
  zoom: 9,
}

export const ZOOM_HOMES = 11
export const ZOOM_CITIES = 8
export const ZOOM_STATES = 5

export const getHomeTypes = (
  type: Maybe<number> | undefined
): {
  displayName: string
  bg: string
  price: number
  tag?: string
  discountPrice?: number
} => {
  switch (type) {
    case 0:
      return {
        displayName: 'Основен',
        bg: 'bg-gray-500 text-white backdrop-blur-md',
        price: 0,
        discountPrice: 0,
      }
    case 1:
      return {
        tag: '6 месеци БЕСПЛАТНО',
        displayName: 'Стандардна',
        price: 300,
        discountPrice: 0,
        bg: 'bg-gray-800 text-white',
      }
    case 2:
      return {
        tag: '6 месеци',
        displayName: 'Ултра',
        price: 750,
        discountPrice: 0,
        bg: 'bg-yellow text-black',
      }
    case 3:
      return {
        tag: 'Наскоро',
        displayName: 'Премиум',
        price: 2400,
        discountPrice: 0,
        bg: 'bg-primary text-white',
      }

    default:
      break
  }
  return { displayName: '', bg: '', price: 0 }
}
