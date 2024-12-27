import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function SepBlog() {
    
    const { id } = useParams();

   
    const [blog, setBlog] = useState(null); 
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null);

    
    useEffect(() => {
        fetch(`${import.meta.env.VITE_BACKEND_URL}/blog?id=${id}`)
            .then((res) => res.json())
            .then((data) => {
                setBlog(data); 
                setLoading(false); 
            })
            .catch((err) => {
                setError('Error fetching blog data'); 
                setLoading(false);
            });
    }, [id]); 

    if (loading) {
        return <div>Loading...</div>; 
    }

    if (error) {
        return <div>{error}</div>; 
    }

    return (
        <div className='w-screen hidescroll overflow-y-scroll h-[92vh]'>
            {blog.image && (
                <div>
                    <img
                        src={`data:image/png;base64,${blog.image}`}
                        alt={blog.title}
                        className="w-full h-40 object-cover object-center"
                    />
                </div>
            )}

            <div className='max-w-5xl mx-auto'>
                {blog && (
                    <div>
                        <div className='text-5xl font-semibold px-4 pt-4 pb-2' dangerouslySetInnerHTML={{ __html: blog.title }} />

                        {blog.sub_heading && <h2 className='text-2xl text-zinc-600 font-semibold px-4 pb-4'>{blog.sub_heading}</h2>}
                        
                        {blog.tags && blog.tags.length > 0 && (

                            <div className='flex space-x-4 px-4'>
                                {blog.tags.map((tag, index) => (
                                    <span className=' text-sm font-semibold' key={index}>#{tag}</span>
                                ))}
                            </div>
                        )}

                        <div className='px-8 py-2'>
                            <img
                                src={`data:image/png;base64,${blog.image}`}
                                alt={blog.title}
                                className="w-full h-auto rounded-lg"
                            />
                        </div>



                        
                        <div className='p-4 text-2xl' dangerouslySetInnerHTML={{ __html: blog.content }} />




                    </div>
                )}
            </div>
        </div>
    );
}

export default SepBlog;
