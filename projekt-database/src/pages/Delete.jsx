import React, { useState, useEffect } from 'react';
import axios from "axios";

const Delete = () => {
    const [books, setBooks] = useState([])

    // const imageUrl = require("../covers/atomic_habits.png");
    useEffect(() => {
        const fetchAllBooks = async () => {
            try{
                const res = await axios.get("http://localhost:3000/latestBooks")
                setBooks(res.data)
            }catch(err){
                console.log(err)
            }
        }
        fetchAllBooks()
    },[]) 
    
    const handleClick = async e => {
        e.preventDefault()
        const bookId = e.target.id;
        try {
            const token = localStorage.getItem('token'); // Retrieve the token from storage
            await axios.delete(`http://localhost:3000/delete`,
            {
                data: { bookId },
                headers: {
                    Authorization: `Bearer ${token}` // Authorization header
                }
            })
            window.location.reload(false);
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div> 
            
            <div className="books">
                    <div class="container-fluid bg-gradient-light"> 
                    <div class="container">
                        <div class="row mx-auto justify-content-md-center pb-5">
                            <div class="col-xl-9 col-12 px-md-3 px-0">
                            <div class="row justify-content-md-center pb-5">
                            {books.map((book) => (
                                <div className="col-sm-6 col-12 py-3 px-sm-3" key={book.id}>
                                        <div class="row">
                                            <div class="col-md-4 col-6 ps-0">
                                                <img class="img-fluid" src={`data:image/jpeg;base64,${book.cover}`} alt="Card cap"/>
                                            </div>
                                            <div class="col-md-8 col-6 px-0">
                                                <div class="row">
                                                    <div class="col-sm">
                                                        <h4 class="text-center"> <a class="text-reset" href={`/review/${book.id}`} > {book.title} </a> </h4>
                                                        <h6 class="text-center"> {book.author_name} </h6>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-sm">
                                                        <p class="text-center"> {book.description} </p>
                                                    </div>
                                                </div>                                           
                                            </div>
                                        </div>
                                        <div class="row mt-1">
                                            <button type="button" id={book.id} class="btn btn-danger" onClick={handleClick} >Delete</button>
                                        </div>
                                </div>  
                            ))}
                            </div>
                            </div>
                        </div>  
                    </div>
                    </div>    
                </div>    
        </div>
    );   
};

export default Delete