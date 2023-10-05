/* eslint-disable react/function-component-definition */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import * as React from 'react'
import { Dialog, IconButton, useMediaQuery } from '@mui/material'
import ProductPageDialog from 'src/components/templates/ProductPage copy/ProductPageDialog'
import CloseIcon from '@mui/icons-material/Close'
import { useRouter } from 'next/router'

export interface DialogTitleProps {
  id: number
  children?: React.ReactNode
}

export default function PopDialog({ children, id }: DialogTitleProps) {
  const router = useRouter()
  const matches = useMediaQuery('(min-width:600px)')

  const changeURL = () => {
    const newUrl = `/dom/${id}`; // Replace with the desired URL

    window.history.pushState(null, '', newUrl);
  };

  const exitURL = () => {
    const newUrl = "/"; // Replace with the desired URL 
    window.history.pushState(null, '', newUrl);
  };

  const [open, setOpen] = React.useState(false)
  const handleClose = () => {
    exitURL()
    setOpen(false)
  } 
  const handleClickOpen = () => {
    setOpen(true)
    changeURL()
  }


  return (
    <>
      <div
        onClick={handleClickOpen}
        // onClick={() => router.push(`dom/${id}`)}
        className='cursor-pointer z-0'>
        {children}
      </div>
      <Dialog
        onClose={handleClose}
        aria-labelledby='customized-dialog-title'
        open={open}
        // maxWidth={!matches && 'lg'}
        fullScreen={!matches && true}
      >
        <IconButton
          edge='end'
          color='inherit'
          onClick={handleClose}
          aria-label='close'
          className='fixed right-7 top-5 bg-white z-50'
        >
          <CloseIcon />
        </IconButton>
        <ProductPageDialog id={id} />
      </Dialog>
    </>
  )
}
