import { useState, useEffect } from "react";

function JobCard({ jobID, index, jobTitle, jobCompany, jobLocation, jobSalaryMin, jobSalaryMax, jobDatePost, jobApplicants }) {
    const [openIndex, setOpenIndex] = useState(null);
    const [jobDetails, setJobDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    
    useEffect(() => {
        const fetchJobDetails = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/job?id=${jobID}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch job details');
                }
                const data = await response.json();
                setJobDetails(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchJobDetails();
    }, [jobID]);

    const toggleAccordion = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };




    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    if (!jobDetails) return <div>No job details found.</div>;

    const { description, perks, what_you_will, requirements } = jobDetails;


    const formatJobPostDate = (dateString) => {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'long' }; 
        return date.toLocaleDateString('en-US', options); 
    };



    return (
        <div key={jobID} className={`rounded-lg col-span-1 px-6 pb-6 bg-white drop-shadow-lg ${openIndex === index ? "row-span-2" : "row-span-1"} `} >
            <div
                className="flex flex-col py-4 cursor-pointer"
                onClick={() => toggleAccordion(index)}
            >
                <span className="text-2xl font-semibold text-blue-500">
                    {jobTitle}
                </span>
                <span className="text-sm font-semibold text-blue-500">
                    {jobCompany}
                </span>Senior Software Engineer, Golang

                <span className="font-semibold text-lg">
                    {jobLocation}
                </span>
                <span>
                    ₹{jobSalaryMin} to ₹{jobSalaryMax} a month
                </span>
                <span>
                    November 2024
                </span>
                <span>
                    {jobApplicants}&nbsp;Applicants This Week
                </span>
            </div>
            <div
                className={`transition-all duration-100 flex flex-col space-y-2 ease-in-out overflow-hidden ${openIndex === index ? "" : "max-h-0 absolute"
                    }`}
                style={{ top: '100%', left: 0, width: '100%' }}
            >
                <span className="text-3xl">Description</span>
                <span>{description}</span>
                <span className="text-3xl pt-4 pb-1">Perks</span>
                <ul className="list-disc pl-6">
                    {perks.map((perk, index) => (
                        <li key={index}>{perk}</li>
                    ))}
                </ul>

                <span className="text-3xl pt-4 pb-1">What you will</span>
                <ul className="list-disc pl-6">
                    {what_you_will.map((your_job, index) => (
                        <li key={index}>{your_job}</li>
                    ))}
                </ul>

                <span className="text-3xl pt-4 pb-1">Requirements</span>
                <ul className="list-disc pl-6">
                    {requirements.map((requirement, index) => (
                        <li key={index}>{requirement}</li>
                    ))}
                </ul>
                <div className="flex justify-center ">
                    <span 
                    onClick={() => window.open('https://job-boards.eu.greenhouse.io/bitpanda/jobs/4324332101', '_blank')}
                    className="bg-blue-400 cursor-pointer w-fit text-center rounded-xl text-2xl px-12 py-2 text-white font-semibold ">
                        Apply
                    </span>
                </div>
            </div>
        </div>
    );
}

export default JobCard;


