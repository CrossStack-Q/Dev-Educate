import React, { useState, useEffect } from 'react';
import CreateBlog from './CreateBlog';
import Card from './Card';

const Blog = () => {
  const [blogs, setBlogs] = useState([]);

  
  useEffect(() => {
    fetch('http://localhost:8080/blogs')  
      .then((res) => res.json())
      .then((data) => setBlogs(data))
      .catch((err) => console.error('Error fetching blogs:', err));
  }, []);

  
  const getImageUrl = (base64Data) => {
    const byteCharacters = atob(base64Data);  
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += 1024) {
      const slice = byteCharacters.slice(offset, offset + 1024);
      const byteNumbers = new Array(slice.length);

      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      byteArrays.push(new Uint8Array(byteNumbers));
    }

    const blob = new Blob(byteArrays, { type: 'image/png' });
    return URL.createObjectURL(blob); 
  };

  return (
    <div className='p-8 max-w-7xl mx-auto hidescroll overflow-y-scroll h-[92vh]'>


      <div className='grid grid-cols-4 gap-6'>

        {blogs.map((blog) => (<Card  key={blog.id} id={blog.id} title={blog.title} subheading={blog.sub_heading} imageURL={getImageUrl(blog.image)} />))}
      </div>
    </div>
  );
};

export default Blog;
