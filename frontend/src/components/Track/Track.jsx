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
                const response = await fetch('http://localhost:8080/tracks');
                if (!response.ok) {
                    throw new Error('Failed to fetch tracks');
                }
                const data = await response.json();
                setTracks(data);

            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);

            }
        };

        fetchTracks();
        console.log(tracks)
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    const handleLinkClick = (trackId) => {
        localStorage.setItem('TrackId', trackId);  
    };

    return (
        <div className="max-w-7xl mx-auto pt-8 md:px-0 px-2 hidescroll overflow-y-scroll h-[92vh]">
            

            <p className=' md:text-5xl text-2xl text-center font-bold'>
                TRACKS
            </p>

            
            <div className="grid md:grid-cols-2 grid-cols-1 gap-8 p-4">
                {tracks.map((track) => (
                    <Link key={track.param} to={track.param} onClick={() => handleLinkClick(track.id)} >
                        <Card imgSrc={track.img_url} trackName={track.name.toUpperCase()} />
                    </Link>
                ))}
            </div>

            {/* <div className=' w-full '>
                <img className='w-full h-auto rounded-2xl shadow-zinc-600 shadow-md' src={TracksHome} alt="" />
            </div> */}
        </div>
    );
}

export default Track;

