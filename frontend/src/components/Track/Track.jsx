import React, { useState, useEffect } from 'react';
import Card from './Card';
import { Link } from 'react-router-dom';
import TracksHome from "../../assets/TracksHome.png"

import catalogImg from "../../assets/catalog-head.png"

function Track() {
    const [tracks, setTracks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTracks = async () => {
            try {
                const response = await fetch('http://13.202.240.58:8080/tracks');
                if (!response.ok) {
                    throw new Error('Failed to fetch tracks');
                }
                const data = await response.json();
                // Set the tracks data to the state
                setTracks(data);

            } catch (error) {
                // Handle any errors
                setError(error.message);
            } finally {
                // Set loading to false once the data is fetched
                setLoading(false);

            }
        };

        fetchTracks();
        console.log(tracks)
    }, []);

    // Display loading state
    if (loading) {
        return <div>Loading...</div>;
    }

    // Display error message if any
    if (error) {
        return <div>Error: {error}</div>;
    }

    const handleLinkClick = (trackId) => {
        localStorage.setItem('TrackId', trackId);  // Save trackId to localStorage
    };

    return (
        <div className="max-w-7xl mx-auto pt-8 hidescroll overflow-y-scroll h-[92vh]">
            <div className=' w-full '>
                <img className='w-full h-auto rounded-2xl shadow-zinc-600 shadow-md' src={TracksHome} alt="" />
            </div>

            <p className='pt-12 text-5xl text-center font-bold'>
                TRACKS
            </p>

            
            <div className="grid grid-cols-2 gap-8 p-4">
                {tracks.map((track) => (
                    <Link key={track.param} to={track.param} onClick={() => handleLinkClick(track.id)} >
                        <Card imgSrc={track.img_url} trackName={track.name.toUpperCase()} />
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default Track;

