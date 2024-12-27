import React from 'react'

function LargeButton({text1,width}) {
  return (
    <div className={`flex flex-col text-lg md:col-span-${width} col-span-5 drop-shadow-xl bg-white rounded-lg p-4 items-center`}>
        <span className='md:text-center font-medium'>
            {text1}
        </span>
    </div>
  )
}

export default LargeButton