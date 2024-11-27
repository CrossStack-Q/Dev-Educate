import React from 'react'

function LargeButton({text1,width}) {
  return (
    <div className={`flex flex-col text-lg col-span-${width} drop-shadow-xl bg-white rounded-lg p-4 items-center`}>
        <span className='text-center  font-medium'>
            {text1}
        </span>
    </div>
  )
}

export default LargeButton