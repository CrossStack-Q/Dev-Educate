import React, { useState, useEffect } from 'react';
import { Document, Page } from 'react-pdf';
import Card from './Card';






const PDFView = () => {
    const [books, setBooks] = useState(null);
    
    const trackID = 1;
    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/books?track_id=${trackID}`);
                if (response.ok) {
                    const bookData = await response.json();
                    setBooks(bookData);  
                } else {
                    console.error('Failed to fetch book');
                }
            } catch (error) {
                console.error('Error fetching book:', error);
            }
        };
        fetchBooks();
    }, []); 
  

    
    if (!books) {
        return <div>Loading...</div>;
    }

 

    return (
        <div className='p-4 grid grid-cols-4 gap-4'>
            {books.map((book)=>(<Card key={book.id} bookName={book.name} authorName={book.author} imgURL={book.img_url} pdfURL={book.pdf_url} />))}  
        </div>
    );
};

export default PDFView;




