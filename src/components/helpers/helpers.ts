/* eslint-disable no-nested-ternary */

export function condoSwitch(property?: string) {
  switch (property) {
    case 'Single_Family_Home':
      return 'куќа'
    case 'Condo':
      return 'стан'
    case 'Townhouse':
      return 'викендица'
    case 'Mobile_Manufactured':
      return 'мобилна градба'
    case 'Lot_Land':
      return 'имот'
    case 'Unknown':
      return 'непознато'
    default:
      return 'неодредено'
  }
}

export function styleSwitch(status?: string, style?: string) {
  switch (status) {
    case 'se_prodava':
      return '🔴 Се продава'
    case 'prodadeno':
      if (style === 'Condo' || style === 'Lot_Land' || style === 'Lot_Land') {
        return '🟡 Продаден'
      }
      return 'Продадена'
    case 'se_izdava':
      return '🟣 Се издава'
    default:
      return ''
  }
}

export function styleClasses(style?: string) {
  switch (style) {
    case 'se_prodava':
      return 'bg-red'
    case 'prodadeno':
      return 'bg-yellow-600'
    case 'se_izdava':
      return 'bg-purple-600'
    default:
      return 'bg-purple-700'
  }
}

// export function imageConverter(src: string, size?: string) {
//   console.log(src)
//   const doNothing = src.includes('mapbox')
//   if (doNothing) {
//     return src
//   }
//   const extension = src.includes('.png')
//     ? '.png'
//     : src.includes('.jpg')
//       ? '.jpg'
//       : src.includes('.jpeg')
//         ? '.jpeg'
//         : ''
//   const getName = `${src?.split('/o/').pop()?.split(extension)[0] || ''}`
//   const changeName = `${src?.split('/o/').pop()?.split(extension)[0] || ''
//     }${extension}`
//   const newName = `${getName}${size && '_'}${size}${extension}`
//   const newUrl = src.replace(changeName, newName)

//   return newUrl
// }

export function mapUrl(data: any) {
  if (data) {
    // const geoJ = `geojson(%7B%22type%22%3A%22FeatureCollection%22%2C%22features%22%3A%5B%7B%22type%22%3A%22Feature%22%2C%22properties%22%3A%7B%22marker-color%22%3A%22%23462eff%22%2C%22marker-size%22%3A%22medium%22%2C%22marker-symbol%22%3A%22bus%22%7D%2C%22geometry%22%3A%7B%22type%22%3A%22Point%22%2C%22coordinates%22%3A%5B${data.lng},${data.lat}%5D%7D%7D%2C%7B%22type%22%3A%22Feature%22%2C%22properties%22%3A%7B%22marker-color%22%3A%22%23e99401%22%2C%22marker-size%22%3A%22medium%22%2C%22marker-symbol%22%3A%22park%22%7D%2C%22geometry%22%3A%7B%22type%22%3A%22Point%22%2C%22coordinates%22%3A%5B-122.25916385650635,37.80629162635318%5D%7D%7D%2C%7B%22type%22%3A%22Feature%22%2C%22properties%22%3A%7B%22marker-color%22%3A%22%23d505ff%22%2C%22marker-size%22%3A%22medium%22%2C%22marker-symbol%22%3A%22music%22%7D%2C%22geometry%22%3A%7B%22type%22%3A%22Point%22%2C%22coordinates%22%3A%5B-122.25650310516359,37.8063933469406%5D%7D%7D%5D%7D)`
    const geoJ = `pin-s-l+000(${data.lng},${data.lat})`

    const mapboxApiAccessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN
    const url =
      data &&
      data.lng &&
      `https://api.mapbox.com/styles/v1/mapbox/streets-v12/static/${geoJ}/${data.lng},${data.lat},18,0,60/700x700?access_token=${mapboxApiAccessToken}`
    return url
  }
  return ''
}
