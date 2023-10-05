/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Container, Draggable } from 'react-smooth-dnd'; 
import { applyDrag } from './helpers';

const SimpleScroller = ({
    setValue,
    imgs,
}: {
    setValue: Function
    imgs?: any
}) => {


    if (imgs && imgs.length > 0)
        return (
            <div className='w-full '>
                <b>Влечејки ги сликите</b> нареди ги сликите во ред по кој сакаш да биднат прикажани
                <div className="simple-page-scroller">
                    <Container onDrop={e => {
                        setValue('imgs', applyDrag(imgs.map((item: any, i: any) => ({ url: item.url, sorting: i })), e))
                    }}   >
                        {imgs.map((p: any, i: React.Key | null | undefined) => (
                            <Draggable key={i}>
                                <div className="draggable-item relative mt-1">
                                    {i === 0 && <p className='bg-gray-600 text-white p-1'>Почетна слика</p>}
                                    {i !== 0 && <p className='p-1 absolute top-0 left-0 text-white bg-gray-600'> {Number(i) + 1}</p>}
                                    <img
                                        src={(p.url)}
                                        alt=''
                                        className={`w-full h-40  pointer-events-none object-cover ${i === 0 && "border-4 border-gray-600"}`}
                                    />
                                </div>
                            </Draggable>
                        ))}
                    </Container>
                </div>
            </div >
        );
    return <div> NO DATA </div>
}

export {
    SimpleScroller
};