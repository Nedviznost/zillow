/* eslint-disable @next/next/no-img-element */
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid"
import React, { useState, Dispatch, SetStateAction } from "react"
import CloseIcon from '@mui/icons-material/Close'
import { CircularProgress } from "@mui/material"

export const ScreenSlider = ({ images, selectedImage, setDialog }: { images: any, selectedImage: number, setDialog: Dispatch<SetStateAction<boolean>> }) => {


    const [activeStep, setActiveStep] = useState(selectedImage)
    const [loading, setLoading] = useState(true)
    const maxSteps = images.length

    const handleNext = () => {
        setLoading(true)
        setActiveStep((prevActiveStep) => prevActiveStep + 1)
    }

    const handleBack = () => {
        setLoading(true)
        setActiveStep((prevActiveStep) => prevActiveStep - 1)
    }

    const showNextStep = activeStep === 0
    const showPreviousStep = activeStep === maxSteps - 1


    return (
        <div className='fixed top-0 left-0 h-screen w-screen bg-black/60 z-50 flex items-center justify-center select-none'>
            {loading && <CircularProgress />}
            <img className='w-auto h-[90vh] select-none'
                onLoad={() => setLoading(false)}
                style={!loading ? {} : { display: "none" }}
                src={images[activeStep].src}
                alt={images[activeStep].src}
            />
            <button
                type='button'
                className="absolute left-0 z-10 h-full"
                onClick={handleBack}
                disabled={activeStep === 0}
            >
                {!showNextStep ? (
                    <div
                        className={` bg-white/80 hover:bg-white/90 rounded-full p-[0.5px] ml-1 w-12`}
                    >
                        <ChevronLeftIcon />
                    </div>
                ) : (
                    <div className='bg-red/0 h-full p-4' />
                )}
            </button>
            <button
                type='button'
                className={`absolute right-0 z-10 h-full `}
                onClick={handleNext}
                disabled={activeStep === maxSteps - 1}
            >
                {!showPreviousStep ? (
                    <div className='bg-white/80 hover:bg-white/90 rounded-full p-[0.5px] mr-1 w-12'>
                        <ChevronRightIcon />
                    </div>
                ) : (
                    <div className='bg-red/0 h-full p-4' />
                )}
            </button>
            <button
                type='button'
                className={`absolute bg-white rounded-full p-2 mr-12 right-0 top-10 z-30 `}
                onClick={() => setDialog(false)}
            >
                <CloseIcon />
            </button>
        </div>
    )
}