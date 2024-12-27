import React from 'react'
import discord from "../../assets/discord.png"

function Discord() {
  return (
    <div className='flex flex-col items-center py-12'>
      <span className='md:text-4xl text-xl font-semibold'>
        TO JOIN DISCORD CHANNEL
      </span>
      <span className='md:text-4xl text-xl pt-2 font-semibold'>
        SCAN THIS QR
      </span>
      <img src={discord} className='md:w-80 md:h-80 w-60 h-60 py-2' alt="" />
      <span className='text-2xl pt-4 pb-2'>
        OR
      </span>
      <span 
      onClick={() => window.open('https://discord.gg/JyRpB7BR', '_blank')}
      className='text-2xl font-semibold bg-blue-500 text-white px-6 py-2 rounded-lg'
      >
        CLICK HERE
      </span>
    </div>
  )
}

export default Discord