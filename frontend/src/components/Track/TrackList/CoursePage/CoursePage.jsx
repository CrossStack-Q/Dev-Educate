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
                const response = await fetch(`http://13.202.240.58:8080/courseDetails?track_id=${trackID}&course_id=${courseID}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch tracks');
                }
                const data = await response.json();
                // Set the tracks data to the state
                setCourseDetails(data);

            } catch (error) {
                // Handle any errors
                setError(error.message);
            } finally {
                // Set loading to false once the data is fetched
                setLoading(false);

            }
        };

        fetchCourseDetails();
    }, []);

    // Display loading state
    if (loading) {
        return <div>Loading...</div>;
    }

    // Display error message if any
    if (error) {
        return <div>Error: {error}</div>;
    }



    if (!courseDetails) {
        return <div>Track not found</div>;
    }


    return (
        <div className='py-12 max-w-[90rem] mx-auto px-8 bg-[#EDF0F6]'>
            {/* <p className='text-center text-4xl'>{courseSlug}</p> */}

            <div className='grid grid-cols-3 space-x-10'>
                <div className='col-span-2 grid-cols-10 grid bg-[#0D132C] h-[60vh] text-white rounded-2xl p-10 '>

                    <div className='col-span-8 flex flex-col justify-between'>

                        <div className='flex space-x-4'>
                            <button className='text-xl px-4 py-2 rounded-full bg-white text-[#0D132C] font-medium' >
                                Duration : {courseDetails.duration}
                            </button>
                            <button className='text-xl px-4 py-2 rounded-full border-2 border-white font-medium'>
                                Video course: start at any time
                            </button>

                        </div>

                        <div className='flex flex-col'>
                            <span className='text-7xl font-semibold p-4'>
                                {courseDetails.title}
                            </span>
                            <span className='text-2xl p-2'>
                                {courseDetails.heading1}
                            </span>
                            <span className='text-2xl p-2'>
                                {courseDetails.heading2}
                            </span>
                        </div>

                        <div className='flex space-x-4'>

                            {courseDetails.test &&
                                <button className='bg-blue-500 font-semibold px-6 py-2 text-2xl rounded-lg'>
                                    <Link to='quiz'>
                                        Take a test
                                    </Link>
                                </button>
                            }



                            {courseDetails.video && <button className='border-2 font-semibold border-blue-500 px-6 py-2 text-2xl rounded-lg'> <Link to='content'>
                                Take a seat
                            </Link>
                            </button>
                            }


                            {courseDetails.books &&
                                <button className='bg-blue-500 font-semibold px-6 py-2 text-2xl rounded-lg'>
                                    <Link to='/resources'>
                                        Read Books
                                    </Link>
                                </button>
                            }

                        </div>

                    </div>

                    <div className='col-span-2'>
                        5 Star
                    </div>
                </div>
                <div className='col-span-1 bg-[#0D132C] h-[60vh] rounded-2xl'>
                    <img className='p-12' src="https://static.tildacdn.com/tild6261-3863-4965-a435-636633666138/Frame_48097850.svg" alt="" />
                </div>

            </div>

            <div className='flex bg-white p-4 mt-6 rounded-xl justify-around'>
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

            <div className='bg-[#D6DFEB] p-12 rounded-2xl mt-12 pt-12 pb-8'>
                <span className='text-6xl tracking-tighter font-semibold pb-8' >
                    For whom is the course
                </span>


                <div className='grid grid-cols-2 gap-8 p-4'>
                    {courseDetails.for_whom.map((data) => (
                        <div key={courseDetails.course_id} className='p-4 bg-white rounded-2xl '>
                            <span className='text-3xl py-4'>
                                {data.title}
                            </span>
                            <ul className='list-disc ml-6 text-xl'>
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
                <span className='text-5xl font-semibold'>
                    The course will help you figure it out
                </span>

                <div className='h-[450px] bg-[#0D132C] mt-4 p-8 grid grid-cols-6 grid-rows-2 gap-8 rounded-2xl'>
                    <span className='col-span-3 bg-white rounded-2xl flex flex-col justify-center text-2xl text-center px-4'>
                        {courseDetails.help_out[0]}
                    </span>
                    <span className='col-span-3 bg-white rounded-2xl flex flex-col justify-center text-2xl text-center px-4'>
                        {courseDetails.help_out[1]}
                    </span>
                    <span className='col-span-2 bg-white rounded-2xl flex flex-col justify-center text-2xl text-center px-4'>
                        {courseDetails.help_out[2]}
                    </span>
                    <span className='col-span-2 bg-white rounded-2xl flex flex-col justify-center text-2xl text-center px-4'>
                        {courseDetails.help_out[3]}
                    </span>
                    <span className='col-span-2 bg-white rounded-2xl flex flex-col justify-center text-2xl text-center px-4'>
                        {courseDetails.help_out[4]}
                    </span>
                </div>
            </div>


            <div className='grid grid-cols-5 gap-8'>
                <div className='col-span-2 w-full bg-[#D6DFEB] p-6 rounded-2xl'>
                    <span className='text-3xl font-medium'>
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
                <div className='col-span-3 w-full bg-white p-6 rounded-2xl'>
                    <span className='text-3xl font-medium'>
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


            <div className='h-screen py-12 flex flex-col space-y-8'>
                <span className='text-6xl font-semibold tracking-tight p-4'>
                    After the course you can
                </span>
                <div className='grid grid-cols-3 gap-8 h-[70vh]'>
                    <div className='col-span-1 grid grid-rows-3 gap-8 h-full'>
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
                    <div className='col-span-1 grid grid-rows-3 gap-8 h-full'>
                        <div className='row-span-1 h-full rounded-2xl bg-white p-8 text-xl'>
                            {courseDetails.after_course[3]}
                        </div>
                        <div className='row-span-2 flex justify-center'>
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

            <div className='py-12'>
                <span className='text-6xl tracking-tighter font-semibold py-8'>
                    You will create one project to choose from
                </span>
                <div className='grid grid-cols-2 gap-8 py-4'>
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


            <div className='py-12 h-screen grid grid-cols-8 gap-8'>
                <div className='h-full col-span-3 bg-white rounded-2xl p-8'>
                    <p className='text-5xl font-semibold'>
                        Course speaker
                    </p>
                    <div className='w-80 h-80'>
                        <img src={courseDetails.speaker_info_img_url} alt="" />
                    </div>
                    <div>
                        <p className='px-4 pt-6 pb-2 text-2xl font-semibold'>
                            {courseDetails.speaker_info_details[0]}
                        </p>
                        <ul className='list-disc ml-6 pr-4 text-xl'>
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

                <div className='h-full col-span-5 grid grid-rows-2 gap-8'>
                    <div className='row-span-1 bg-white rounded-2xl p-8'>
                        <p className='text-5xl font-semibold'>
                            Introductory lecture
                        </p>
                        <div className='grid grid-cols-2 gap-8'>
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
                        <p className='text-5xl font-semibold'>
                            Reviews
                        </p>
                        <div className='grid grid-cols-2 gap-4 py-4'>
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
            <div className='py-12'>
                <p className='text-6xl font-medium py-4'>
                    Program
                </p>
                <Accordion subtopic_id={id} />
            </div>

            <div className='grid grid-cols-7 gap-8'>
                <div className='col-span-5 bg-[#D6DFEB] p-8 flex flex-col space-y-4 rounded-2xl'>
                    <p className='text-6xl font-semibold'>
                        Certificate
                    </p>
                    <span className='pr-28 text-xl '>
                        To each student who passes the 80% course, we will present a certificate of completion. And one who successfully fulfills more than 80% of practical tasks and protects the final project — will receive a number certificate
                    </span>

                </div>


                <div className='col-span-2 bg-white rounded-2xl'>
                    okio
                </div>
            </div>

        </div>
    )
}

export default CoursePageOutro