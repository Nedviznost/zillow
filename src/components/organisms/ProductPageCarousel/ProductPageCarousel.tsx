/* eslint-disable @next/next/no-img-element */
import * as React from 'react'
import { useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import MobileStepper from '@mui/material/MobileStepper'
import Button from '@mui/material/Button'
import SwipeableViews from 'react-swipeable-views'
import { autoPlay } from 'react-swipeable-views-utils'
import { Dispatch, SetStateAction } from 'react'
import { useMediaQuery } from '@mui/material'

const AutoPlaySwipeableViews = autoPlay(SwipeableViews)

const ProductPageCarousel = (
  {
    images,
    setOpen
  }: {
    images: any[]
    setOpen: Dispatch<SetStateAction<boolean>>
  }
) => {


  const isMobile = useMediaQuery('(max-width:770px)')
  const theme = useTheme()
  const [activeStep, setActiveStep] = React.useState(0)
  const maxSteps = images.length

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const handleStepChange = (step: number) => {
    setActiveStep(step)
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AutoPlaySwipeableViews
        interval={7000}
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
        onClickCapture={() => isMobile && setOpen(true)}
      >
        {images.map((step, index) => (
          <div key={step.id} >
            {Math.abs(activeStep - index) <= 2 ? (
              <Box
                component='img'
                sx={{
                  display: 'block',
                  overflow: 'hidden',
                  width: '100%',
                  height: '700px',
                  [theme.breakpoints.down('md')]: {
                    height: '300px',
                  },
                  objectFit: 'cover',
                }}
                src={step.src}
                alt={step.src}
              />
            ) : null}
          </div>
        ))}
      </AutoPlaySwipeableViews>
      <MobileStepper
        steps={maxSteps}
        position='static'
        activeStep={activeStep}
        nextButton={
          <Button
            size='small'
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
          >
            <span className='hidden md:block'>Следна</span>
          </Button>
        }
        backButton={
          <Button size='small' onClick={handleBack} disabled={activeStep === 0}>
            <span className='hidden md:block'>Предходна</span>
          </Button>
        }
      />
    </Box>
  )
}

export default ProductPageCarousel
