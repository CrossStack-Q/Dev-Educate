import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {

    const userID = JSON.parse(localStorage.getItem('user'));
    console.log(userID?.email)
    return (

        <div className='flex justify-between p-4 sticky top-0 z-50 items-center bg-zinc-600 h-[8vh]'>
            <Link to="/" >
                <div className='bg bg-red-400 border-black border-2 px-2 py-1' >DevEducate</div>
            </Link>
            <div className='flex space-x-6'>

                <Link to="/track">
                    <p className=' bg-red-400 border-black border-2 px-2 py-1'>
                        Track
                    </p>
                </Link>
                <Link to="/blogs">
                    <p className=' bg-red-400 border-black border-2 px-2 py-1'>

                        Blogs
                    </p>
                </Link>

                {userID?.email === "mail@mail.com" &&
                    <div className='flex space-x-4'>
                        <Link to="/createBlog">
                            <p className=' bg-red-400 border-black border-2 px-2 py-1'>
                                CreateBlog
                            </p>
                        </Link>
                        <Link to="/adminquiz">
                            <p className=' bg-red-400 border-black border-2 px-2 py-1'>
                                Admin Quiz
                            </p>
                        </Link>

                    </div>
                }


                <Link to="/resources">
                    <p className=' bg-red-400 border-black border-2 px-2 py-1'>
                        PDF
                    </p>
                </Link>
                <Link to="/jobs">
                    <p className=' bg-red-400 border-black border-2 px-2 py-1'>
                        Jobs
                    </p>
                </Link>
                <Link to="/discord">
                    <p className=' bg-red-400 border-black border-2 px-2 py-1'>
                        Discord
                    </p>
                </Link>
            </div>
            <div className='flex space-x-4'>

                {
                    !userID ? (


                        <Link to="/login">
                            <p className=' bg-red-400 border-black border-2 px-2 py-1'>Login</p>
                        </Link>

                    ) : (
                        <button
                            className=' bg-red-400 border-black border-2 px-2 py-1'
                            onClick={() => {
                                localStorage.removeItem('user');
                                window.location.reload();
                            }}>


                            Log Out


                        </button>
                    )
                }


            </div>
        </div>
    )
}

export default Navbar