import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Card from '../Card';

import catalogImg from "../../../assets/catalog-head.png"



function TrackList() {
    const { trackSlug } = useParams();

    const id = localStorage.getItem('TrackId')

    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await fetch(`http://localhost:8080/course?id=${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch tracks');
                }
                const data = await response.json();
                // Set the tracks data to the state
                setCourses(data);

            } catch (error) {
                // Handle any errors
                setError(error.message);
            } finally {
                // Set loading to false once the data is fetched
                setLoading(false);

            }
        };

        fetchCourses();
    }, []);

    // Display loading state
    if (loading) {
        return <div>Loading...</div>;
    }

    // Display error message if any
    if (error) {
        return <div>Error: {error}</div>;
    }



    if (!courses) {
        return <div>Track not found</div>;
    }


    const handleLinkClick = (courseId) => {
        localStorage.setItem('CourseId', courseId);  // Save trackId to localStorage
    };


    return (
        <div className='max-w-7xl mx-auto hidescroll overflow-y-scroll h-[92vh]'>
            <div>
                <img className='max-w-7xl' src={catalogImg} alt="" />
            </div>
            <div className='text-3xl pt-8 text-center font-semibold'>
                {trackSlug.toUpperCase()} COURSES
            </div>
            <div className='grid grid-cols-2 gap-12 pt-4'>
                {courses.map((course) => (
                    <Link className='col-span-1 drop-shadow-2xl rounded-xl border border-transparent' key={course.name} to={course.name} onClick={() => handleLinkClick(course.id)} >
                        <Card key={course.id} trackName={course.name} imgSrc={course.img_url} level={course.level} desc={course.description}  users={`Enrolled: ${course.users_enrolled}`} />
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default TrackList;
