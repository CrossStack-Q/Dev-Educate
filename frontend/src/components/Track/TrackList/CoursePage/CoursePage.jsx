import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Accordion from './Accordian';
import VideoPlayer from './TutorialsPage/Player/VideoPlayer';

function CoursePageOutro() {
    const { courseSlug } = useParams();

    const id = localStorage.getItem('CourseId')

    const courseID = localStorage.getItem('CourseId')
    const trackID = localStorage.getItem('TrackId')




    const [courseDetails, setCourseDetails] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCourseDetails = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/courseDetails?track_id=${trackID}&course_id=${courseID}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch tracks');
                }
                const data = await response.json();
                setCourseDetails(data);

            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);

            }
        };

        fetchCourseDetails();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }



    if (!courseDetails) {
        return <div>Track not found</div>;
    }


    return (
        <div className='py-12 max-w-[90rem] mx-auto px-8 bg-[#F4F7FF] '>

            <div className='grid md:grid-cols-3 md:space-x-10 grid-cols-1 gap-4'>
                <div className='md:col-span-2 col-span-1 grid-cols-10 grid bg-[#306CFE] h-[60vh] text-white rounded-2xl p-10 '>

                    <div className='md:col-span-8 col-span-10 flex flex-col justify-between'>

                        <div className='md:flex hidden space-x-4'>
                            <button className='text-xl px-4 py-2 rounded-full bg-white text-[#0D132C] font-medium' >
                                Duration : {courseDetails.duration}
                            </button>
                            <button className='text-xl px-4 py-2 rounded-full border-2 border-white font-medium'>
                                Video course: start at any time
                            </button>

                        </div>

                        <div className='flex flex-col'>
                            <span className='md:text-7xl text-3xl font-semibold p-4'>
                                {courseDetails.title}
                            </span>
                            <span className='text-2xl p-2'>
                                {courseDetails.heading1}
                            </span>
                            <span className='text-2xl p-2'>
                                {courseDetails.heading2}
                            </span>
                        </div>

                        <div className='flex md:flex-row flex-col md:space-y-0 space-y-4 space-x-4'>

                            {courseDetails.test &&
                                <button className='font-semibold bg-white hover:bg-zinc-900 hover:text-white text-[#306CFE] px-6 py-2 text-2xl rounded-lg'>
                                    <Link to='quiz'>
                                        Take a test
                                    </Link>
                                </button>
                            }



                            {courseDetails.video && <button className='font-semibold bg-white hover:bg-zinc-900 hover:text-white text-[#306CFE] px-6 py-2 text-2xl rounded-lg'> <Link to='content'>
                                Take a seat
                            </Link>
                            </button>
                            }


                            {courseDetails.books &&
                                <button className='font-semibold bg-white hover:bg-zinc-900 hover:text-white text-[#306CFE] px-6 py-2 text-2xl rounded-lg'>
                                    <Link to='/resources'>
                                        Read Books
                                    </Link>
                                </button>
                            }

                        </div>

                    </div>

                    <div className='md:inline hidden col-span-2'>
                        <span className='text-4xl '>⭐⭐⭐⭐</span>
                    </div>
                </div>
                <div className='col-span-1 bg-[#306CFE] md:h-[60vh] rounded-2xl'>
                    <img className='p-12' src="https://static.tildacdn.com/tild6261-3863-4965-a435-636633666138/Frame_48097850.svg" alt="" />
                </div>

            </div>

            <div className='md:flex hidden bg-white p-4 mt-6 rounded-xl justify-around'>
                <div className='flex flex-col w-80  '>
                    <span className='text-black font-semibold py-1 text-lg'>
                        {courseDetails.level[0].level}
                    </span>
                    <span className='text-zinc-500'>
                        {courseDetails.level[0].time}
                    </span>
                    <span className='text-zinc-500'>
                        {courseDetails.level[0].theory}
                    </span>
                </div>

                <div className='flex flex-col w-80 '>
                    <span className='text-black font-semibold py-1 text-lg'>
                        {courseDetails.level[1].project} project
                    </span>
                    <span className='text-zinc-500'>
                        {courseDetails.level[1].project_desc}
                    </span>
                </div>

                <div className='flex flex-col w-80 '>
                    <span className='text-black font-semibold py-1 text-lg'>
                        Direct communication with the speaker
                    </span>
                    <span className='text-zinc-500'>
                        6 online meeting in «question-answer » and separate chat
                    </span>
                </div>

                <div className='flex flex-col w-80 '>
                    <span className='text-black font-semibold py-1 text-lg'>
                        Best Wishes
                    </span>
                    <span className='text-zinc-500'>
                        From Speaker
                    </span>
                </div>

            </div>

            <div className='bg-[#D6DFEB] md:p-12 p-4 rounded-2xl mt-12 md:pt-12 pb-8'>
                <span className='md:text-6xl text-2xl tracking-tighter font-semibold pb-8' >
                    For whom is the course
                </span>


                <div className='grid md:grid-cols-2 md:gap-8 grid-cols-1 gap-4 md:p-4'>
                    {courseDetails.for_whom.map((data) => (
                        <div key={courseDetails.course_id} className='p-4 bg-white rounded-2xl '>
                            <span className='md:text-3xl text-lg py-4'>
                                {data.title}
                            </span>
                            <ul className='list-disc ml-6 md:text-xl text-base'>
                                <li className='py-2'>
                                    {data.point1}
                                </li>
                                <li className='py-2'>
                                    {data.point2}
                                </li>
                                <li className='py-2'>
                                    {data.point3}
                                </li>
                                <li className='py-2 '>
                                    {data.point4}
                                </li>
                            </ul>
                        </div>
                    ))}

                </div>


            </div>

            <div className='py-12'>
                <span className='md:text-5xl text-2xl font-semibold'>
                    The course will help you figure it out
                </span>

                <div className='md:h-[450px] bg-[#0D132C] mt-4 p-8 grid md:grid-cols-6 md:grid-rows-2 md:gap-8 grid-cols-1 rounded-2xl'>
                    <span className='md:col-span-3 col-span-1 md:m-0 my-2 md:py-0 py-2 bg-white rounded-2xl flex flex-col justify-center md:text-2xl text-base text-center px-4'>
                        {courseDetails.help_out[0]}
                    </span>
                    <span className='md:col-span-3 col-span-1 md:m-0 my-2 md:py-0 py-2 bg-white rounded-2xl flex flex-col justify-center md:text-2xl text-base text-center px-4'>
                        {courseDetails.help_out[1]}
                    </span>
                    <span className='md:col-span-2 col-span-1 md:m-0 my-2 md:py-0 py-2 bg-white rounded-2xl flex flex-col justify-center md:text-2xl text-base text-center px-4'>
                        {courseDetails.help_out[2]}
                    </span>
                    <span className='md:col-span-2 col-span-1 md:m-0 my-2 md:py-0 py-2 bg-white rounded-2xl flex flex-col justify-center md:text-2xl text-base text-center px-4'>
                        {courseDetails.help_out[3]}
                    </span>
                    <span className='md:col-span-2 col-span-1 md:m-0 my-2 md:py-0 py-2 bg-white rounded-2xl flex flex-col justify-center md:text-2xl text-base text-center px-4'>
                        {courseDetails.help_out[4]}
                    </span>
                </div>
            </div>


            <div className='grid md:grid-cols-5 gap-8'>
                <div className='md:col-span-2 col-span-1 w-full bg-[#D6DFEB] p-6 rounded-2xl'>
                    <span className='md:text-3xl text-2xl font-medium'>
                        Knowledge will be required:
                    </span>


                    <ul className='list-disc ml-6 text-xl'>
                        <li className='py-2'>
                            {courseDetails.knowledge_required[0]}
                        </li>
                        <li className='py-2'>
                            {courseDetails.knowledge_required[1]}
                        </li>
                        <li className='py-2'>
                            {courseDetails.knowledge_required[1]}
                        </li>
                    </ul>
                </div>
                <div className='md:col-span-3 col-span-1 w-full bg-white p-6 rounded-2xl'>
                    <span className='md:text-3xl text-2xl font-medium'>
                        It will be a big plus:
                    </span>

                    <ul className='list-disc ml-6 text-xl'>
                        <li className='py-2'>
                            {courseDetails.will_be_plus[0]}
                        </li>
                        <li className='py-2'>
                            {courseDetails.will_be_plus[1]}
                        </li>
                        <li className='py-2'>
                            {courseDetails.will_be_plus[2]}
                        </li>
                    </ul>
                </div>
            </div>


            <div className='md:h-screen flex flex-col space-y-8 my-4'>
                <span className='md:text-6xl text-2xl font-semibold tracking-tight p-4'>
                    After the course you can
                </span>
                <div className='grid md:grid-cols-3 grid-cols-1 gap-8 md:h-[70vh]'>
                    <div className='col-span-1 grid grid-rows-3 gap-8 md:h-full'>
                        <div className='row-span-1 bg-white rounded-2xl p-8 text-xl'>
                            {courseDetails.after_course[0]}
                        </div>
                        <div className='row-span-1 bg-white rounded-2xl p-8 text-xl'>
                            {courseDetails.after_course[1]}
                        </div>
                        <div className='row-span-1 bg-white rounded-2xl p-8 text-xl'>
                            {courseDetails.after_course[2]}
                        </div>
                    </div>
                    <div className='col-span-1 grid md:grid-rows-3 gap-8 h-full'>
                        <div className='row-span-1 h-full rounded-2xl bg-white p-8 text-xl'>
                            {courseDetails.after_course[3]}
                        </div>
                        <div className='md:row-span-2 md:flex hidden justify-center'>
                            <img className='w-80' src="https://optim.tildacdn.com/tild6536-6135-4137-a431-666662363665/-/resize/506x/-/format/webp/_2.png" alt="" />
                        </div>
                    </div>
                    <div className='col-span-1 grid grid-rows-3 gap-8 h-full'>
                        <div className='row-span-1 bg-white rounded-2xl p-8 text-xl'>
                            {courseDetails.after_course[4]}
                        </div>
                        <div className='row-span-1 bg-white rounded-2xl p-8 text-xl'>
                            {courseDetails.after_course[5]}
                        </div>
                        <div className='row-span-1 bg-white rounded-2xl p-8 text-xl'>
                            {courseDetails.after_course[6]}
                        </div>
                    </div>
                </div>

            </div>

            <div className='bg-white p-8 rounded-lg'>
                <span className='md:text-6xl text-2xl tracking-tighter font-semibold py-8'>
                    You will create one project to choose from
                </span>
                <div className='grid md:grid-cols-2 grid-cols-1 gap-8 py-4'>
                    <div className='p-8 bg-[#D6DFEB] rounded-2xl col-span-1'>
                        <p className='text-2xl font-semibold py-2'>
                            {courseDetails.projects[0].title}
                        </p>
                        <span className='text-xl'>
                            {courseDetails.projects[0].description}
                        </span>
                    </div>
                    <div className='p-8 bg-[#D6DFEB] rounded-2xl col-span-1'>
                        <p className='text-2xl font-semibold py-2'>
                            {courseDetails.projects[1].title}
                        </p>
                        <span className='text-xl'>
                            {courseDetails.projects[1].description}
                        </span>
                    </div>
                    <div className='p-8 bg-[#D6DFEB] rounded-2xl col-span-1'>
                        <p className='text-2xl font-semibold py-2'>
                            {courseDetails.projects[2].title}
                        </p>
                        <span className='text-xl'>
                            {courseDetails.projects[2].description}
                        </span>
                    </div>
                    <div className='p-8 bg-[#D6DFEB] rounded-2xl col-span-1'>
                        <p className='text-2xl font-semibold py-2'>
                            {courseDetails.projects[3].title}
                        </p>
                        <span className='text-xl'>
                            {courseDetails.projects[3].description}
                        </span>
                    </div>

                </div>
            </div>


            <div className='py-12 md:h-screen grid md:grid-cols-8 grid-cols-1 gap-8'>
                <div className='h-full md:col-span-3 col-span-1 bg-white rounded-2xl p-8'>
                    <p className='md:text-5xl text-2xl font-semibold'>
                        Course speaker
                    </p>
                    <div className='w-full h-auto'>
                        <img className='rounded-xl' src={courseDetails.speaker_info_img_url} alt="" />
                    </div>
                    <div>
                        <p className='px-4 pt-6 pb-2 text-2xl font-semibold'>
                            {courseDetails.speaker_info_details[0]}
                        </p>
                        <ul className='list-disc ml-6 md:pr-4 text-xl'>
                            <li className='py-1'>
                                {courseDetails.speaker_info_details[1]}
                            </li>
                            <li className='py-1'>
                                {courseDetails.speaker_info_details[2]}
                            </li>
                            <li className='py-1'>
                                {courseDetails.speaker_info_details[3]}
                            </li>
                            <li className='py-1'>
                                {courseDetails.speaker_info_details[4]}
                            </li>
                            <li className='py-1'>
                                {courseDetails.speaker_info_details[5]}
                            </li>
                            <li className='py-1'>
                                {courseDetails.speaker_info_details[6]}
                            </li>
                        </ul>
                    </div>
                </div>

                <div className='h-full md:col-span-5 col-span-1 grid md:grid-rows-2 gap-8'>
                    <div className='row-span-1 bg-white rounded-2xl p-8'>
                        <p className='md:text-5xl text-2xl font-semibold'>
                            Introductory lecture
                        </p>
                        <div className='grid md:grid-cols-2 grid-cols-1 gap-8'>
                            <div className='col-span-1'>
                                <VideoPlayer videoId={1} />
                            </div>
                            <div className='col-span-1 '>
                                <p>
                                    We answer the questions:
                                </p>
                                <ul className='list-disc'>
                                    <li>
                                        What will be on the course?
                                    </li>
                                    <li>
                                        What can you encounter at an interview?
                                    </li>
                                    <li>
                                        What features and nuances of use does Golang have?
                                    </li>
                                    <li>
                                        Who will the course suit?
                                    </li>
                                    <li>
                                        What will you face in real projects?
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className='row-span-1 bg-white rounded-2xl p-8'>
                        <p className='md:text-5xl text-2xl font-semibold'>
                            Reviews
                        </p>
                        <div className='grid md:grid-cols-2 grid-cols-1 gap-y-14 gap-4 py-4'>
                            <span>
                                <span className='text-lg'>
                                    Pryanka clearly knows her Go and her courses are a great way to level up your own knowledge and understanding. I like the cool mix of interactivity and conceptual walkthroughs in the course.
                                </span>
                                <span className='flex items-center py-4 space-x-2'>
                                    <span className='h-10 w-10 bg-gray-600 rounded-full'></span>
                                    <span>
                                        <p className='font-semibold'>Anurag Sharma</p>
                                        <span>Software Engineer at Tata1mg</span>
                                    </span>
                                </span>
                            </span>
                            <span>
                                <span className='text-lg'>
                                    Priyanka is a great instructor. I've learned a lot from her courses and her mentorship. I highly recommend her course to anyone who wants build professional apps that scale. I got a sneak peek of the course and it's amazing.
                                </span>
                                <span className='flex items-center py-4 space-x-2'>
                                    <span className='h-10 w-10 bg-gray-600 rounded-full'></span>
                                    <span>
                                        <p className='font-semibold'>Tushar Bhadana</p>
                                        <span>Software Engineer at Tata1mg</span>
                                    </span>
                                </span>

                            </span>
                        </div>
                    </div>
                </div>
            </div>



            {/* fetch Index-Section from section */}
            <div className='py-12 md:mt-12 mt-4'>
                <p className='md:text-6xl text-2xl font-medium py-4'>
                    Program
                </p>
                <Accordion subtopic_id={id} />
            </div>

            <div className='grid md:grid-cols-7 grid-cols-1 gap-8'>
                <div className='md:col-span-5 col-span-1 bg-[#D6DFEB] p-8 flex flex-col space-y-4 rounded-2xl'>
                    <p className='md:text-6xl text-2xl font-semibold'>
                        Certificate
                    </p>
                    <span className='md:pr-28 text-xl '>
                        To each student who passes the 80% course, we will present a certificate of completion. And one who successfully fulfills more than 80% of practical tasks and protects the final project — will receive a number certificate
                    </span>

                </div>


                <div className='md:col-span-2 col-span-1 bg-white rounded-2xl'>
                    Anurag Sharma 
                </div>
            </div>

        </div>
    )
}

export default CoursePageOutro