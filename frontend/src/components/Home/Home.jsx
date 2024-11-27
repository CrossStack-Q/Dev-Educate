import React from 'react'
import SmallButton from './SmallButton'
import LargeButton from './LargeButton'

function Home() {
  return (
    <div className='max-w-7xl mx-auto py-8 flex-col space-y-6 flex hidescroll overflow-y-hidden h-[92vh]'>
      <div className='flex flex-col rounded-lg drop-shadow-xl space-y-16 bg-blue-600 p-8'>
        <span className='text-white text-xl'>ONLINE LEARNING PLATFORM</span>
        <span className='text-white font-bold text-5xl'>
          Enhance Your Skills with <br /> Professional Online Courses
        </span>
        <span className='rounded-full bg-zinc-900 text-white px-4 py-2 w-fit flex items-center space-x-2'>
          <span className='text-xl'>
            JOIN NOW
          </span>
          <div className='bg-white w-8 h-8 text-2xl text-black rounded-full flex items-center justify-center'>
            {">"}
          </div>
        </span>
      </div>
      <div className='grid grid-cols-4 gap-8 px-2'>
        <SmallButton text1="37 Enrolled" text2="GO BASICS" color="red" trackID={1} courseID={1} link="track/golang/Go Basic" />
        <SmallButton text1="24 Enrolled" text2="GO ADVANCED" color="red" trackID={1} courseID={2} link="track/golang/Go Advanced" />
        <SmallButton text1="11 Enrolled" text2="GO COHORT" color="red" trackID={1} courseID={3} link="track/golang/Go Cohort" />
        <SmallButton text1="52 Enrolled" text2="BACKEND" color="red" trackID={1} courseID={4} link="track/golang/Backend Engineering with Go" />
      </div>
      <div className='grid grid-cols-5 gap-8 px-2 pt-4'>
        <LargeButton width={1} text1="Over 4,000 students have trusted YMCA Faridabad for their education and career growth." />
        <LargeButton width={1} text1="95% of our learners successfully became skilled engineers in their respective fields." />
        <LargeButton width={2} text1="YMCA Faridabad is known for transforming students into professionals through excellent education. Our students at YMCA Faridabad consistently excel in their careers and professional growth." />
        <LargeButton width={1} text1="Join the community of successful professionals who started their journey at YMCA Faridabad." />

      </div>
    </div>
  )
}

export default Home