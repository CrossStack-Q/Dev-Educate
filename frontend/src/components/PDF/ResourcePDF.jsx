import React from 'react'
import PDFUpload from './PDFUpload'
import PDFView from './PDFView'

import read1 from "../../assets/read1.png"
import read2 from "../../assets/read2.png"
import read3 from "../../assets/read3.png"

function ResourcePDF() {
  return (
    <div className='max-w-7xl mx-auto hidescroll overflow-y-scroll h-[92vh] pt-8'>
      <span className='lg:text-6xl md:text-xl text-3xl mx-2 py-4 rounded-xl shadow-lg bg-white text-zinc-800 flex justify-center items-center md:col-span-1 col-span-2 font-bold'>
        <span>
          READ
        </span>
        <span>
          BOOKS
        </span>
      </span>
      <div className='grid grid-cols-3 gap-8 p-4'>
        <img className='md:col-span-1 col-span-3 rounded-xl shadow-lg ' src={read3} alt="" />
        <img className='md:col-span-1 col-span-3 rounded-xl shadow-lg ' src={read2} alt="" />
        <img className='md:col-span-1 col-span-3 rounded-xl shadow-lg ' src={read1} alt="" />
      </div>
      <div>
        <PDFView />
      </div>
    </div>
  )
}

export default ResourcePDF
