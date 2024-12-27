import React from 'react'
import { Link } from 'react-router-dom'

function SmallButton({ text1, text2, color,link,courseID,trackID }) {
    const handleLinkClick = (courseID,trackID) => {
        localStorage.setItem('TrackId', trackID);
        localStorage.setItem('CourseId', courseID);  
    };
    return (
        <Link to={link} onClick={() => handleLinkClick(courseID,trackID)} className='flex drop-shadow-lg hover:bg-blue-500 hover:text-white md:col-span-1 col-span-4 items-center space-x-4 bg-white p-2 rounded-xl px-4'>
            <div>
                <div className={`bg-${color}-400 h-12 w-12 flex items-center justify-center rounded-lg`}>
                    <span className='text-3xl'>
                        ⭐
                    </span>
                </div>
            </div>
            <div className='flex flex-col justify-center'>
                <span className=''>
                    {text1}
                </span>

                <span className='text-2xl font-semibold whitespace-nowrap'>
                    {text2}
                </span>
            </div>
            <span>:</span>
        </Link>
    )
}

export default SmallButton