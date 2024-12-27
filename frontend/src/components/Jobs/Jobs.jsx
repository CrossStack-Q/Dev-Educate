import React, { useEffect, useState } from 'react'

import job1 from "../../assets/job1.png"
import job2 from "../../assets/job2.png"
import job3 from "../../assets/job3.png"
import JobCard from './JobCard';

function Jobs() {


    const [jobs, setJobs] = useState([]);



    useEffect(() => {
        const fetchJobs = async () => {
            const response = await fetch(`http://localhost:8080/jobs`);
            if (!response.ok) {
                throw new Error("Failed to fetch sections");
            }
            const data = await response.json();
            setJobs(data);
        };

        fetchJobs();
    }, []);


    return (
        <div className='max-w-7xl mx-auto py-8 md:px-0 px-4 hidescroll overflow-y-scroll h-[92vh]'>
            <div className='rounded-xl bg-white drop-shadow-lg md:flex hidden justify-around text-4xl py-4 px-8'>
                <span>Jobs</span><span>Salaries</span><span>Companies</span><span> Developers</span>
            </div>
            <div className='grid md:grid-cols-2 grid-cols-1 gap-8 p-4 pb-12'>
                <span className='xl:text-8xl lg:text-6xl md:text-6xl md:py-0 py-4 text-2xl rounded-xl drop-shadow-lg bg-white text-zinc-800 flex flex-col justify-center items-center col-span-1 font-bold'>
                    <span>
                        GET UR
                    </span>
                    <span>
                        JOB
                    </span>
                </span>
                <img className='col-span-1 rounded-xl shadow-lg ' src={job1} alt="" />
                <img className='col-span-1 rounded-xl shadow-lg ' src={job2} alt="" />
                <img className='col-span-1 rounded-xl shadow-lg ' src={job3} alt="" />
            </div>
            <hr />

            <div className='px-8 py-8'>
                <div className='flex justify-around items-center'>
                    <span className='md:text-3xl text-xl'>
                        Get Your Job Here
                    </span>
                    <span className='bg-blue-400 text-white md:text-3xl text-lg py-2 md:px-6 px-2 rounded-md font-semibold '>
                        Post a Job
                    </span>
                </div>
                <div className='pt-12'>
                    <span className='text-xl font-bold'>
                        Hand-Picked Golang jobs • Apply directly to companies • Clear salary ranges
                    </span>
                    <p className='pt-8 text-xl md:pr-28'>
                        Browse 850+ Golang Jobs (1 new this month) in November 2024 at companies like Bitpanda, ONRAMP and Rialtic with salaries from $80,000 to $250,000 working as a Senior Software Engineer, Golang, Staff Golang Engineer and Staff Golang Engineer. Last post 1 week ago

                    </p>
                </div>
            </div>

            <main className='grid md:grid-cols-2 grid-cols-1 grid-rows-subgrid gap-8'>
                {jobs.map((job, index) => (<JobCard key={job.job_id} index={index} jobID={job.job_id} jobTitle={job.title} jobCompany={job.company_name} jobLocation={job.location} jobSalaryMin={job.salary_min} jobSalaryMax={job.salary_max} jobDatePost={job.job_date_post} jobApplicants={job.applicants_this_week} />))}
            </main>
        </div>
    )
}

export default Jobs