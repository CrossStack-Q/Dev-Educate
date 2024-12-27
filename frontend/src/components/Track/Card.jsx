import React from 'react'

function Card({ imgSrc, trackName, level, users, desc }) {
    return (
        <div className='p-4 bg-white drop-shadow-lg rounded-xl '>


            <div className='w-full md:h-80 h-auto overflow-hidden'>
                <img src={imgSrc} alt="" className='w-full md:h-80 h-auto rounded-lg object-cover' />
            </div>
            <p className='text-2xl text-center pt-2 font-bold'>{trackName}</p>
            {level && <div className='flex justify-between'>
                <span
                    className={`
                            ${level === 'Beginner' ? 'text-green-600 bg-green-100' : ''}
                            ${level === 'Intermediate' ? 'text-orange-600 bg-orange-100' : ''}
                            ${level === 'Advanced' ? 'text-red-600 bg-red-100' : ''}
                                font-semibold px-3 py-1 rounded-2xl
                                `}
                >
                    {level}
                </span>

                <span className='font-semibold'>
                    {users}
                </span>
            </div>}
            {desc && <div className='p-2 font-medium '>
                {desc}
            </div>}


            {
                users && <div className='flex items-center space-x-1'>
                    <span className='w-8 h-8 rounded-full bg-gray-400'></span>
                    <span className='font-semibold'>Anurag Sharma</span>
                </div>
            }

        </div>
    )
}

export default Card