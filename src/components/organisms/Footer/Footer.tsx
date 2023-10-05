
import { FaLinkedin } from '@react-icons/all-files/fa/FaLinkedin'
import { FaFacebook } from '@react-icons/all-files/fa/FaFacebook'
import { FaInstagramSquare } from '@react-icons/all-files/fa/FaInstagramSquare'

import { IconType } from '@react-icons/all-files'
import Link from 'next/link'

const FooterLink = ({ item }: any) => (
  <Link href={item.url}>
    {/* <a className='block text-gray-600 hover:text-gray-900'> */}
      {item.text}
    {/* </a> */}
  </Link>
)

const Icon = ({ IconInput, url }: { IconInput: IconType, url: string }) => (
  <Link href={url}>
    {/* <a
      target='_blank'
      className='w-8 p-1.5 rounded-full text-black bg-gray-100  hover:bg-white'
    > */}
      <IconInput className='w-full h-full ' />
    {/* </a> */}
  </Link>
)

const Footer = ({ className }: { className?: string }) => (
  <footer
    className={`z-50 h-10 pt-0 mt-0 bg-gray-100 hidden md:fixed w-full bottom-0 md:flex items-center ${className}`}
  >
    <div className='container mx-auto'>
      <div className='justify-between text-xs md:flex'>
        <ul className='flex gap-2'>
          <li>
            Недвижност.мк,{' '}
            <a className='text-[#e63746]'>Сите права се задржани</a>
          </li>
        </ul>

        <ul className='mt-2 md:space-x-2 md:flex md:mt-0'>
          {[
            // {
            //   text: 'Упатство',
            //   url: 'upatstvo',
            // },
            // {
            //   text: 'Правила на користење',
            //   url: 'pravila',
            // },
            {
              text: 'Детали за компанијата',
              url: 'detali',
            },
            // {
            //   text: 'Приватност',
            //   url: ' ',
            // },
          ].map((item) => (
            <FooterLink key={item.text} item={item} />
          ))}
        </ul>
        <div className='flex gap-3 mt-4 md:justify-end md:mt-0'>

          {[
            {
              type: FaFacebook,
              url: 'https://www.facebook.com/nedviznost',
            },
            {
              type: FaInstagramSquare,
              url: 'https://www.instagram.com/nedviznost',
            },
            {
              type: FaLinkedin,
              url: 'https://www.linkedin.com/company/nedviznost',
            },
          ].map(
            (item) => (
              <Icon key={item.type.toString()} IconInput={item.type} url={item.url} />
            )
          )}
        </div>
      </div>

    </div>
  </footer>
)

export default Footer
