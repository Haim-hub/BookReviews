import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import {useParams} from 'react-router-dom';

const Review = () => {

    const {id} = useParams();

    const [book, setBook] = useState([])

    //const imageUrl = require("../covers/atomic_habits.png");


    useEffect(() => {
        const fetchAllBooks = async () => {
            try{
                const res = await axios.get(`http://localhost:3000/books/${id}`)
                setBook(res.data)
            }catch(err){
                console.log(err)
            }
        }
        fetchAllBooks()
    })            


    return (
        <div> 
            {book.map((book) => (
                <div className="" key={book.id}>
                    <div class="container-fluid bg-light py-5">
                        <div class="row mx-auto justify-content-center " style={{maxWidth: 1000 + 'px'}}>
                            <div class="col-sm-4 mx-auto text-center">
                                <img class="img-fluid" src={`data:image/jpeg;base64,${book.cover}`} alt="Card cap" style={{maxHeight: 'min(400px, 75vw)'}}/>
                            </div>
                            <div class="col-sm-8 col-12 order-first order-sm-1 px-0 my-auto">
                                <div class="row mx-auto justify-content-center">
                                    <div class="col-sm ps-0">
                                        <h4 class=" display-4"> {book.title} </h4>
                                        <h6 class=""> {book.author_name} </h6>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-sm pb-3 "> {book.description} </div>
                                </div>                                           
                            </div>
                        </div>    
                    </div>
                    <div class="container-fluid bg-gradient-light py-5 px-3" style={{maxWidth: 800 + 'px'}}>
                        <div>
                            <div dangerouslySetInnerHTML={{ __html: book.review }} />
                        
                        </div>
                    </div>
                    
                </div>
            ))}

        </div>
    );  
};

export default Review