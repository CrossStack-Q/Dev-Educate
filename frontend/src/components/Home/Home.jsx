import React from 'react'
import SmallButton from './SmallButton'
import LargeButton from './LargeButton'
import mainBG from "../../assets/mainBG.png"

function Home() {
  return (
    <div className='max-w-7xl mx-auto py-8 px-2 flex-col space-y-6 flex hidescroll overflow-y-scroll h-[92vh]'>
      <div className='flex rounded-lg drop-shadow-xl bg-blue-600 p-8'>
        <div className='flex flex-col space-y-16 md:flex-[0.6]'>
          <span className='text-white md:text-xl text-sm'>ONLINE LEARNING PLATFORM</span>
          <span className='text-white font-bold md:text-5xl text-2xl'>
            Enhance Your Skills with <br /> Professional Online Courses
          </span>
          <span className='rounded-full bg-zinc-900 text-white px-4 py-2 w-fit flex items-center space-x-2'>
            <span className='md:text-xl text-base'>
              JOIN NOW
            </span>
            <div className='bg-white w-8 h-8 md:text-2xl text-lg text-black rounded-full flex items-center justify-center'>
              {">"}
            </div>
          </span>
        </div>
        <div className='md:flex-[0.4] md:inline hidden'>
          <img src={mainBG} className='w-full h-auto' alt="" />
        </div>
      </div>
      <div className='grid grid-cols-4 gap-8 px-2'>
        <SmallButton text1="37 Enrolled" text2="GO BASICS" color="red" trackID={1} courseID={1} link="track/golang/Go Basic" />
        <SmallButton text1="24 Enrolled" text2="GO ADVANCED" color="red" trackID={1} courseID={2} link="track/golang/Go Advanced" />
        <SmallButton text1="11 Enrolled" text2="GO COHORT" color="red" trackID={1} courseID={3} link="track/golang/Go Cohort" />
        <SmallButton text1="52 Enrolled" text2="BACKEND" color="red" trackID={1} courseID={4} link="track/golang/Backend Engineering with Go" />
      </div>
      <div className='grid grid-cols-5 md:gap-8 gap-4 px-2 pt-4'>
        <LargeButton width={1} text1="Over 4,000 students have trusted YMCA Faridabad for their education and career growth." />
        <LargeButton width={1} text1="95% of our learners successfully became skilled engineers in their respective fields." />
        <LargeButton width={2} text1="YMCA Faridabad is known for transforming students into professionals through excellent education. Our students at YMCA Faridabad consistently excel in their careers and professional growth." />
        <LargeButton width={1} text1="Join the community of successful professionals who started their journey at YMCA Faridabad." />

      </div>
    </div>
  )
}

export default Home