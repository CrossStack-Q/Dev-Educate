import React from 'react'
import { Link } from 'react-router-dom'
import NavButton from './NavButton';

function Navbar() {

    const userID = JSON.parse(localStorage.getItem('user'));
    console.log(userID?.email)
    return (
        <div className='sticky top-5 z-50 max-w-7xl mx-auto'>
            <div className='md:flex rounded-xl hidden flex-row justify-between bg-orange-200 p-4 items-center h-[8vh]'>
                <NavButton text="Dev-Eduacte" route="/" />
                <div className='flex space-x-6'>

                    <NavButton text="Track" route="/track" />
                    <NavButton text="Blog" route="/blogs" />


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
                            <Link to="/pdfupload">
                                <p className=' bg-red-400 border-black border-2 px-2 py-1'>
                                    PDF_UPLOAD
                                </p>
                            </Link>

                        </div>
                    }



                    <NavButton text="Books" route="/resources" />
                    <NavButton text="JOB" route="/jobs" />
                    <NavButton text="Discord" route="/discord" />
                </div>
                <div className='flex space-x-4'>

                    {
                        !userID ? (


                            <NavButton text="Login" route="/login" />

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
            <div className='md:hidden grid grid-cols-5 gap-2 p-2 h-[8vh] content-center bg-zinc-600'>
                <Link className='col-span-1' to="/resources">
                    <p className=' bg-red-400 border-black border-2 px-2 py-1'>
                        PDF
                    </p>
                </Link>
                <Link className='col-span-1' to="/jobs">
                    <p className=' bg-red-400 border-black border-2 px-2 py-1'>
                        Jobs
                    </p>
                </Link>
                <Link className='col-span-1' to="/discord">
                    <p className=' bg-red-400 border-black border-2 px-2 py-1'>
                        Discord
                    </p>
                </Link>
                <Link className='col-span-1' to="/track">
                    <p className=' bg-red-400 border-black border-2 px-2 py-1'>
                        Track
                    </p>
                </Link>
                <Link className='col-span-1' to="/blogs">
                    <p className=' bg-red-400 border-black border-2 px-2 py-1'>

                        Blogs
                    </p>
                </Link>

            </div>
        </div>
    )
}

export default Navbar
