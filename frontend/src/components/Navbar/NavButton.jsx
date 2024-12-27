import React from 'react'
import { Link } from 'react-router-dom'

function NavButton({text,route}) {
  return (
    <Link to={route} className='text-black text-lg bg-white font-medium border-2 rounded-md hover:bg-zinc-900 hover:text-white border-zinc-900 px-4 py-1'>{text}</Link>
  )
}

export default NavButton