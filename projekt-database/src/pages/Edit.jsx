import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from "axios";
import {handlePictureChange } from '../utils';

function Edit() {
    const [book, setBook] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();


    useEffect(() => {
        axios.get(`http://localhost:3000/books/${id}`)
            .then(response => {
                // Axios automatically parses the JSON response
                response.data[0].review = parseHtmlString(response.data[0].review)
                const data = response.data[0];
                
                // Ensure the data structure matches your state
                setBook(data);
                
            })
            .catch(error => console.error('Error fetching book data:', error));
    }, [id]);

    const handleChange = (event) => {
        const value = event.target.value;
        setBook({ ...book, [event.target.name]: value });
    };

    const onPicChange = handlePictureChange(setBook);

    const handleSubmit = (event) => {
        event.preventDefault();
        const updatedHtmlString = book.review.map(element => `<${element.tag}>${element.content}</${element.tag}>`).join('');
        const submitBook =
        {
            title: book.title,
            author: book.author_name,
            cover: book.cover,
            description: book.description,
            review: updatedHtmlString
        }
        

        axios.put(`http://localhost:3000/books/${id}`, submitBook)
            .then(response => {
                if (response.status === 200) {
                    // Assuming a status code of 200 indicates success
                    // Redirect to book details page or show success message
                    navigate(`/review/${id}`);
                }
            })
            .catch(error => console.error('Error updating book:', error));
    };

    function parseHtmlString(htmlString) {
        const regex = /<([^>]+)>(.*?)<\/\1>/g;
        const elements = [];
        let match;
    
        while ((match = regex.exec(htmlString)) !== null) {
            elements.push({ tag: match[1], content: match[2] });
        }
        return elements;
    }

    const handleInputChange = (index, value) => {
        const updatedReview = [...book.review];
        updatedReview[index].content = value;
        setBook({ ...book, review: updatedReview });
    };


    if (!book) return <div>Loading...</div>;

    return (
        <div>
            <div class="container-fluid bg-light py-5">
            <div class="row mx-auto justify-content-center pb-5">
                <div class="col text-center">
                    <h1> Edit Book</h1>
                </div>
            </div>
            <div class="row mx-auto justify-content-center pb-5" style={{maxWidth: 1000 + 'px'}}>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Title:</label>
                        <input
                            type="text"
                            class="form-control  mb-3"
                            name="title"
                            value={book.title}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label>Author:</label>
                        <input
                            type="text"
                            class="form-control  mb-3"
                            name="author_name"
                            value={book.author_name}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label>Cover:</label>
                        <input
                            type="file"
                            class="form-control mb-3"
                            name="cover"
                            value=""
                            onChange={onPicChange}
                        />
                    </div>    
                    <div>
                        <label>Description:</label>
                        <textarea
                            name="description"
                            class="form-control mb-3"
                            value={book.description}
                            onChange={handleChange}
                        ></textarea>
                    </div>
                    <div>
                        <label>Reveiw:</label>
                        {book.review.map((element, index) => (
                        <div key={index}>
                            {element.tag.includes('h') && <input type="text" class="form-control mb-3" value={element.content} onChange={(e) => handleInputChange(index, e.target.value)} />}
                            {element.tag === 'p' && <textarea value={element.content} class="form-control mb-3" onChange={(e) => handleInputChange(index, e.target.value)} />}
                        </div>
                    ))}
                    </div>
                    {/* Add other fields like author, description, etc. */}
                    <button type="submit" class="btn btn-primary mb-2" >Save Changes</button>
                </form>   
            </div>    
            </div>
        </div>
        
    );
}

export default Edit;
