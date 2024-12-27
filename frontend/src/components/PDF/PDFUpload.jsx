import React, { useState } from 'react';

const PdfUpload = () => {
    const [image, setImage] = useState(null);
    const [pdf, setPdf] = useState(null);
    const [bookName, setBookName] = useState('');
    const [authorName, setAuthorName] = useState('');

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        if (name === 'image') {
            setImage(files[0]);
        } else if (name === 'pdf') {
            setPdf(files[0]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        
        const formData = new FormData();
        formData.append('image', image);
        formData.append('pdf', pdf);
        formData.append('book_name', bookName);
        formData.append('author_name', authorName);
        formData.append('track_id', 1);  // track_id is 1 for now temp

        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/uploadpdf`, {
                method: 'POST',
                body: formData,
            });
    
            if (!response.ok) {
                throw new Error('File upload failed');
            }
    
            const data = await response.json();
            alert('Upload Successful!');
            console.log('Uploaded data:', data);
        } catch (error) {
            console.error('Error uploading files:', error);
            alert('Upload Failed');
        }
    };


    return (
        <div className='max-w-7xl mx-auto px-4 pb-8 flex flex-col items-center space-y-4 md:pt-8 pt-2 h-[92vh] hidescroll overflow-y-scroll'>
            <span className='text-2xl mt-4 w-full md:w-[60rem] text-center rounded-xl py-4 drop-shadow-lg bg-white text-zinc-800 font-bold'>
                UPLOAD BOOKS
            </span>
            <div className=''>
                <img src="https://raw.githubusercontent.com/sairol/extra/refs/heads/main/assets/go/PDF-BG.png" className='md:w-[60rem] md:h-[30rem] w-full h-auto rounded-lg drop-shadow-xl' alt="" />
            </div>
            <div className='grid grid-rows-subgrid md:grid-cols-3 grid-cols-1 gap-4'>
                <div className='col-span-1 flex flex-col space-y-4'>
                    <div>
                        <img className='w-full h-auto rounded-lg drop-shadow-md' src="https://raw.githubusercontent.com/sairol/extra/refs/heads/main/assets/go/book1.png" alt="" />
                    </div>
                    <div>
                        <img className='w-full h-auto rounded-lg drop-shadow-md' src="https://raw.githubusercontent.com/sairol/extra/refs/heads/main/assets/go/book2.png" alt="" />
                    </div>
                </div>

                <form onSubmit={handleSubmit} className='flex flex-col col-span-1 p-4 bg-white drop-shadow-md rounded-lg md:pt-28'>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-xl font-bold mb-2">
                            Book Name
                        </label>
                        <input
                            type="text"
                            name="book_name"
                            placeholder="Book Name"
                            value={bookName}
                            onChange={(e) => setBookName(e.target.value)}
                            required
                            className="border rounded-md shadow-sm md:w-96 w-full  text-zinc-800 py-2 px-6 text-xl leading-tight focus:outline-none focus:ring focus:ring-blue-300"

                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-xl font-bold mb-2">
                            Book Author Name
                        </label>

                        <input
                            type="text"
                            name="author_name"
                            placeholder="Author Name"
                            value={authorName}
                            onChange={(e) => setAuthorName(e.target.value)}
                            required
                            className="border rounded-md shadow-sm md:w-96 w-full  text-zinc-800 py-2 px-6 text-xl leading-tight focus:outline-none focus:ring focus:ring-blue-300"
                        />
                    </div>

                    <div className="mb-4 md:w-96 w-full flex flex-col">
                        <label className="block text-gray-700 text-xl font-bold mb-2">
                            Book Cover Image
                        </label>


                        <label className="cursor-pointer border-2 border-blue-400 w-full hover:border-blue-600 hover:font-semibold hover:text-white py-2 text-xl px-6 rounded-lg shadow-md hover:bg-blue-600">
                            Select a Image
                            <input
                                type="file"
                                name="image"
                                accept="image/*"
                                onChange={handleFileChange}
                                required
                                className="hidden"
                            />
                        </label>

                    </div>
                    <div className="mb-4 flex flex-col md:w-96 w-full">
                        <label className="block text-gray-700 text-xl font-bold mb-2">
                            Book PDF
                        </label>

                        <label className="cursor-pointer border-2 border-blue-400 hover:border-blue-600 hover:font-semibold w-full hover:text-white py-2 text-xl px-6 rounded-lg shadow-md hover:bg-blue-600">
                            Select a PDF File

                            <input
                                type="file"
                                name="pdf"
                                accept="application/pdf"
                                onChange={handleFileChange}
                                required
                                className='hidden'
                            />
                        </label>
                    </div>
                    <button className='bg-blue-500 font-bold w-fit md:px-10 px-4 py-2 rounded-lg text-xl text-white' type="submit">Upload</button>
                </form>
                <div className='col-span-1 flex flex-col space-y-4'>
                    <div className=''>
                        <img className='w-full h-auto rounded-lg drop-shadow-md' src="https://raw.githubusercontent.com/sairol/extra/refs/heads/main/assets/go/book5.png" alt="" />
                    </div>
                    <div className=''>
                        <img className='w-full h-auto rounded-lg drop-shadow-md' src="https://raw.githubusercontent.com/sairol/extra/refs/heads/main/assets/go/book4.png" alt="" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PdfUpload;

