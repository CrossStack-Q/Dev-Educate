// // import React, { useState, useEffect } from 'react';
// // import VideoPlayer from './Player/VideoPlayer';

// // const TutorialsPage = () => {
// //   const subtopic_id = localStorage.getItem('CourseId');
// //   const [selectedVideoId, setSelectedVideoId] = useState(null);
// //   const [items, setItems] = useState([]);

// //   const handleVideoSelect = (videoId) => {
// //     setSelectedVideoId(videoId);
// //   };

// //   useEffect(() => {
// //     const fetchData = async () => {
// //       const response = await fetch(`http://13.202.240.58:8080/courseindex?subtopic_id=${subtopic_id}`);
// //       if (!response.ok) {
// //         throw new Error("Failed to fetch sections");
// //       }
// //       const data = await response.json();
// //       setItems(data);
// //     };

// //     fetchData();
// //   }, []);

// //   return (
// //     <div className="flex">
// //       <aside className="w-1/4 p-4 bg-gray-200">
// //         <h2 className="text-xl font-bold">Sections</h2>
// //         <ul className="mt-4">
// //           {items.map((item) => (
// //             <li key={item.id} className="mb-2">
// //               <h3 className="text-lg font-semibold">{item.name}</h3>
// //               <ul>
// //                 {item.content?.map((content) => (
// //                   <li
// //                     key={content.id}
// //                     className="cursor-pointer text-blue-600 hover:underline"
// //                     onClick={() => handleVideoSelect(content.id)}
// //                   >
// //                     {content.title}
// //                   </li>
// //                 ))}
// //               </ul>
// //             </li>
// //           ))}
// //         </ul>
// //       </aside>
// //       <main className="w-3/4 p-4">
// //         {selectedVideoId ? (
// //           <VideoPlayer key={selectedVideoId} videoId={selectedVideoId} />
// //         ) : (
// //           <div className="text-center text-xl">Select a video to play</div>
// //         )}
// //       </main>
// //     </div>
// //   );
// // };

// // export default TutorialsPage;










// import React, { useState, useEffect } from 'react';
// import VideoPlayer from './Player/VideoPlayer';

// const TutorialsPage = () => {
//   const subtopic_id = localStorage.getItem('CourseId');
//   const [selectedVideoId, setSelectedVideoId] = useState(null);
//   const [videoUrl, setVideoUrl] = useState(null); // Store video URL for YouTube videos
//   const [isYouTube, setIsYouTube] = useState(null); // Boolean to check if it's a YouTube video
//   const [items, setItems] = useState([]);

//   const handleVideoSelect = async (videoId) => {
//     setSelectedVideoId(videoId);
//     setVideoUrl(null); // Reset video URL state
//     setIsYouTube(null); // Reset isYouTube state

//     // Fetch video details from the new YouTube API
//     const response = await fetch(`http://13.202.240.58:8080/youtubevideo?id=${videoId}`);
//     if (!response.ok) {
//       console.error("Failed to fetch video data");
//       return;
//     }

//     const data = await response.json();

//     // Check the response and update states
//     if (data.video_url) {
//       setVideoUrl(data.video_url); // Set the YouTube video URL
//       setIsYouTube(true); // It's a YouTube video
//     } else {
//       setIsYouTube(false); // It's not a YouTube video
//     }
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       const response = await fetch(`http://13.202.240.58:8080/courseindex?subtopic_id=${subtopic_id}`);
//       if (!response.ok) {
//         throw new Error("Failed to fetch sections");
//       }
//       const data = await response.json();
//       setItems(data);
//     };

//     fetchData();
//   }, [subtopic_id]);

//   return (
//     <div className="flex">
//       <aside className="w-1/4 p-4 bg-gray-200">
//         <h2 className="text-xl font-bold">Sections</h2>
//         <ul className="mt-4 overflow-scroll">
//           {items.map((item) => (
//             <li key={item.id} className="mb-2">
//               <h3 className="text-xl font-semibold">{item.name}</h3>
//               <ul>
//                 {item.content?.map((content) => (
//                   <li
//                     key={content.id}
//                     className="cursor-pointer text-lg text-blue-600 bg-white rounded-md drop-shadow-md my-1 px-2 py-1 hover:text-white hover:bg-blue-500 hover:font-semibold"
//                     onClick={() => handleVideoSelect(content.id)}
//                   >
//                     {content.title}
//                   </li>
//                 ))}
//               </ul>
//             </li>
//           ))}
//         </ul>
//       </aside>
//       <main className="w-3/4 p-4">
//         {selectedVideoId ? (
//           isYouTube === true ? (
//             // If the video is a YouTube video, show the iframe
//             <iframe
//               width="560"
//               height="315"
//               src={videoUrl}
//               title="YouTube video player"
//               frameBorder="0"
//               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
//               referrerPolicy="strict-origin-when-cross-origin"
//               allowFullScreen
//             ></iframe>
//           ) : isYouTube === false ? (
//             // If the video is not a YouTube video, show the custom VideoPlayer component
//             <VideoPlayer key={selectedVideoId} videoId={selectedVideoId} />
//           ) : (
//             // Loading state when we are still fetching
//             <div className="text-center text-xl">Loading video...</div>
//           )
//         ) : (
//           // When no video is selected
//           <div className="text-center text-xl">Select a video to play</div>
//         )}
//       </main>
//     </div>
//   );
// };

// export default TutorialsPage;



import React, { useState, useEffect } from 'react';
import VideoPlayer from './Player/VideoPlayer';

const TutorialsPage = () => {
  const subtopic_id = localStorage.getItem('CourseId');
  const [selectedVideoId, setSelectedVideoId] = useState(null);
  const [videoUrl, setVideoUrl] = useState(null); // Store video URL for YouTube videos
  const [isYouTube, setIsYouTube] = useState(null); // Boolean to check if it's a YouTube video
  const [items, setItems] = useState([]);

  const handleVideoSelect = async (videoId) => {
    setSelectedVideoId(videoId);
    setVideoUrl(null); // Reset video URL state
    setIsYouTube(null); // Reset isYouTube state

    // Fetch video details from the new YouTube API
    const response = await fetch(`http://13.202.240.58:8080/youtubevideo?id=${videoId}`);
    if (!response.ok) {
      console.error("Failed to fetch video data");
      return;
    }

    const data = await response.json();

    // Check the response and update states
    if (data.video_url) {
      setVideoUrl(data.video_url); // Set the YouTube video URL
      setIsYouTube(true); // It's a YouTube video
    } else {
      setIsYouTube(false); // It's not a YouTube video
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://13.202.240.58:8080/courseindex?subtopic_id=${subtopic_id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch sections");
      }
      const data = await response.json();
      setItems(data);
    };

    fetchData();
  }, [subtopic_id]);

  return (
    <div className="flex h-[92vh]">
      {/* Sidebar */}
      <aside className="w-1/4 p-4 bg-gray-200 overflow-y-auto hidescroll">
        <h2 className="text-xl font-bold">Sections</h2>
        <ul className="mt-4">
          {items.map((item) => (
            <li key={item.id} className="mb-2">
              <h3 className="text-xl font-semibold">{item.name}</h3>
              <ul>
                {item.content?.map((content) => (
                  <li
                    key={content.id}
                    className="cursor-pointer text-lg text-blue-600 bg-white rounded-md drop-shadow-md my-1 px-2 py-1 hover:text-white hover:bg-blue-500 hover:font-semibold"
                    onClick={() => handleVideoSelect(content.id)}
                  >
                    {content.title}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </aside>

      {/* Main Content */}
      <main className="w-3/4 p-4 overflow-y-auto hidescroll">
        {selectedVideoId ? (
          isYouTube === true ? (
            // If the video is a YouTube video, show the iframe
            <iframe
              width="560"
              height="315"
              src={videoUrl}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          ) : isYouTube === false ? (
            // If the video is not a YouTube video, show the custom VideoPlayer component
            <VideoPlayer key={selectedVideoId} videoId={selectedVideoId} />
          ) : (
            // Loading state when we are still fetching
            <div className="text-center text-xl">Loading video...</div>
          )
        ) : (
          // When no video is selected
          <div className="text-center text-xl">Select a video to play</div>
        )}
      </main>
    </div>
  );
};

export default TutorialsPage;
