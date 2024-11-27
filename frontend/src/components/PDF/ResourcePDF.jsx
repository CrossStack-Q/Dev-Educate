import React from 'react'
import PDFUpload from './PDFUpload'
import PDFView from './PDFView'

import read1 from "../../assets/read1.png"
import read2 from "../../assets/read2.png"
import read3 from "../../assets/read3.png"

function ResourcePDF() {
  return (
    <div className='max-w-7xl mx-auto hidescroll overflow-y-scroll h-[92vh]'>
      <div className='grid grid-cols-2 gap-8 p-4'>
        <span className='text-8xl rounded-xl shadow-lg bg-white text-zinc-800 flex flex-col justify-center items-center col-span-1 font-bold'>
          <span>
            READ
          </span>
          <span>
            BOOKS
          </span>
        </span>
        <img className='col-span-1 rounded-xl shadow-lg ' src={read3} alt="" />
        <img className='col-span-1 rounded-xl shadow-lg ' src={read2} alt="" />
        <img className='col-span-1 rounded-xl shadow-lg ' src={read1} alt="" />
      </div>
      <div>
        {/* <PDFUpload/> */}
        <PDFView />
      </div>
    </div>
  )
}

export default ResourcePDF