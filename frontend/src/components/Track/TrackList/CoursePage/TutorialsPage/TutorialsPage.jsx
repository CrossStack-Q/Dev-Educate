import React, { useState, useEffect } from 'react';
import VideoPlayer from './Player/VideoPlayer';

const TutorialsPage = () => {
  const subtopic_id = localStorage.getItem('CourseId');
  const [selectedVideoId, setSelectedVideoId] = useState(null);
  const [videoUrl, setVideoUrl] = useState(null); 
  const [isYouTube, setIsYouTube] = useState(null); 
  const [items, setItems] = useState([]);
  const [expandedSection, setExpandedSection] = useState(null);

  const handleVideoSelect = async (videoId) => {
    setSelectedVideoId(videoId);
    setVideoUrl(null); 
    setIsYouTube(null); 

    
    const response = await fetch(`process.env.Backend_URL/youtubevideo?id=${videoId}`);
    if (!response.ok) {
      console.error("Failed to fetch video data");
      return;
    }

    const data = await response.json();

    
    if (data.video_url) {
      setVideoUrl(data.video_url); 
      setIsYouTube(true); 
    } else {
      setIsYouTube(false); 
    }
  };

  const toggleSection = (id) => {
    
    setExpandedSection((prevState) => (prevState === id ? null : id));
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`process.env.Backend_URL/courseindex?subtopic_id=${subtopic_id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch sections");
      }
      const data = await response.json();
      setItems(data);
    };

    fetchData();
  }, [subtopic_id]);

  return (
    <div className="flex h-[92vh] p-4 pt-12">
      <aside className="w-1/4 p-4 overflow-y-auto rounded-xl bg-white border-zinc-400 border hidescroll">
        <h2 className="text-xl font-bold">Sections</h2>
        <ul className="mt-4">
          {items.map((item) => (
            <li key={item.id} className="mb-2">
              <h3
                className={`text-xl font-semibold flex py-2 rounded-lg items-center cursor-pointer `}
                onClick={() => toggleSection(item.id)}
              >
                {item.name}<span className='text-black text-base pl-1'>▼</span>
              </h3>
              {expandedSection === item.id && (
                <ul>
                  {item.content?.map((content) => (
                    <li
                      key={content.id}
                      className={`cursor-pointer flex items-center space-x-1 text-lg my-1 px-2 py-1 rounded-lg hover:bg-gray-200 hover:font-semibold ${selectedVideoId === content.id ? 'bg-gray-200 font-semibold' : ''}`}
                      onClick={() => handleVideoSelect(content.id)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M3 3.25C2.30964 3.25 1.75 3.80964 1.75 4.5V11.5C1.75 12.1904 2.30964 12.75 3 12.75H13C13.6904 12.75 14.25 12.1904 14.25 11.5V4.5C14.25 3.80964 13.6904 3.25 13 3.25H3ZM0.25 4.5C0.25 2.98122 1.48122 1.75 3 1.75H13C14.5188 1.75 15.75 2.98122 15.75 4.5V11.5C15.75 13.0188 14.5188 14.25 13 14.25H3C1.48122 14.25 0.25 13.0188 0.25 11.5V4.5Z"
                        ></path>
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M6.90364 5.58477C7.15169 5.45562 7.45099 5.4752 7.6801 5.63558L10.1801 7.38558C10.3806 7.52592 10.5 7.75526 10.5 8C10.5 8.24474 10.3806 8.47408 10.1801 8.61442L7.6801 10.3644C7.45099 10.5248 7.15169 10.5444 6.90364 10.4152C6.65559 10.2861 6.5 10.0297 6.5 9.75V6.25C6.5 5.97034 6.65559 5.71391 6.90364 5.58477ZM8 7.69049V8.30951L8.44215 8L8 7.69049Z"
                        ></path>
                      </svg>
                      <span>{content.title}</span>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </aside>

      <main className="w-3/4 p-4 overflow-y-auto hidescroll">
        {selectedVideoId ? (
          isYouTube === true ? (
            <div style={{ position: 'relative', paddingBottom: '56.25%', height: '0', overflow: 'hidden', maxWidth: '100%', background: '#000' }}>
              <iframe
                src={videoUrl}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                style={{ position: 'absolute', top: '0', left: '0', width: '100%', height: '100%' }}
                allowFullScreen
              ></iframe>
            </div>
          ) : isYouTube === false ? (
            <VideoPlayer key={selectedVideoId} videoId={selectedVideoId} />
          ) : (
            <div className="text-center text-xl">Loading video...</div>
          )
        ) : (
          <div className="text-center text-xl">Select a video to play</div>
        )}
      </main>
    </div>
  );
};

export default TutorialsPage;
