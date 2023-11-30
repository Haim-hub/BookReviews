import axios from "axios";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {handlePictureChange } from '../utils';

const Add = () => {
    const [book, setBook] = useState([
        {
            title: '',
            author: '',
            cover: null,
            description: '',
        }
    ]);

    const navigate = useNavigate()

    const [fields, setFields] = useState([]);

    const handleAddField = (inputType, event) => {
        event.preventDefault();
        const newField = {
            id: `reviewPart-${fields.length}`,
            value: '',
            class: `${inputType}`,
            type: inputType
        };
        setFields([...fields, newField]);
    };

    const handleInputChange = (index, event) => {
        const newFields = fields.map((field, idx) => 
            idx === index ? { ...field, value: event.target.value } : field
        );
        setFields(newFields);
    };

    const handleChange = (e) => {
        setBook(prev=>({
            ...prev,
            [e.target.name]: e.target.value
        }))
        console.log(book)
    } 
    
    const onPicChange = handlePictureChange(setBook);
    
    const handleClick = async e => {
        e.preventDefault()
        book.review = getReview()
        try {
            const token = localStorage.getItem('token'); // Retrieve the token from storage
            await axios.post('http://localhost:3000/books', book,
            {
                headers: {
                    Authorization: `Bearer ${token}` // Authorization header
                }
            })
            navigate('/delete')
        } catch (error) {
            console.log(error)
        }
    }  

    const handleRemoveField = (index) => {
        setFields(fields.filter((_, idx) => idx !== index));
    };

    function getReview() {
        let review = ""
        fields.forEach(element => {
            if (element.type === 'HeaderInput') {
                review += `<h1>${element.value}</h1>`
            } else if (element.type === 'SubHeaderInput') {
                review += `<h2>${element.value}</h2>`
            } else {
                review += `<p>${element.value}</p>`
            }
        });
        return review
    }

    return (
        <div class="container-fluid bg-light py-5">
            <div class="row mx-auto justify-content-center pb-5">
                <div class="col text-center">
                    <h1> Add New Book</h1>
                </div>
            </div>
            <div class="row mx-auto justify-content-center pb-5" style={{maxWidth: 1000 + 'px'}}>
                <form>
                    <div class="form-group pb-3">
                        <label for="exampleFormControlInput1"> Title </label>
                        <input type="text" class="form-control" placeholder="title" onChange={handleChange} name="title"/>
                    </div>
                    <div class="form-group pb-3">
                        <label for="exampleFormControlInput1">Author</label>
                        <input type="text" class="form-control" placeholder="author" onChange={handleChange} name="author"/>
                    </div>
                    <div class="form-group pb-3">
                        <label for="exampleFormControlInput1">Cover</label><br/>
                        <input type="file" class="form-control"  onChange={onPicChange} name="cover"/>
                    </div>
                    <div class="form-group pb-3">
                        <label>Description</label> 
                        <textarea class="form-control" placeholder="description" onChange={handleChange} name="description" rows="3"></textarea>
                    </div>

                    <label>Review</label><br/>
                    {fields.map((field, index) => (
                        <div key={field.id} class="form-group row pb-2">
                            {field.type !== 'textarea' ? (
                                <div class="col-8">
                                    <input
                                    class={`form-control ${field.class}`}
                                    type="text"
                                    value={field.value}
                                    onChange={(e) => handleInputChange(index, e)}
                                    id={field.id}
                                />
                                </div>
                                
                            ) : (
                                <div class="col-12">
                                    <textarea
                                    class={`form-control ${field.class}`}
                                    value={field.value}
                                    onChange={(e) => handleInputChange(index, e)}
                                    id={field.id}
                                    rows={3}
                                />
                                </div>
                                
                            )}
                            <div class="col-3">
                                <button 
                                    class="btn btn-danger"
                                    onClick={() => handleRemoveField(index)}
                                >
                                Remove
                            </button>
                                </div>
                            
                        </div>
                    ))}

                    <div class="row px-3 pt-2">
                        <button class="btn col-2 btn-primary mb-2 me-3" onClick={(e) => handleAddField('HeaderInput', e)}> Add Header </button>
                        <button class="btn col-2 btn-primary mb-2 me-3" onClick={(e) => handleAddField('SubHeaderInput', e)}> Add Sub-header </button>
                        <button class="btn col-2 btn-primary mb-2 me-3" onClick={(e) => handleAddField('textarea', e)}> Add Text </button>
                    </div>
                    <button class="btn btn-primary mb-2" onClick={handleClick}> Add </button>
                </form>
            </div>
        </div>
        
    );  
};

export default Add