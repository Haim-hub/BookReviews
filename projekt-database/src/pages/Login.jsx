// Login.js or similar component
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../api/apiService'; // Importing our login function

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Function to handle the form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Resetting error on new submission
    try {
      const data = await loginUser(username, password);
      // Save the token in localStorage or handle the login success
      localStorage.setItem('token', data.token);
      // Redirect or change the component state as needed
      navigate('/add');
      
    } catch (err) {
      // Handle error, such as displaying a message to the user
      setError(err.message);
    }
  };

  return (
    <div class="container-fluid bg-light py-5">
            <div class="row mx-auto justify-content-center pb-5" style={{maxWidth: 1000 + 'px'}}>
                <form onSubmit={handleSubmit}>
                    {/* Input fields for username and password */}
                    <input
                        class="mb-2 form-control"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Username"
                    />
                    <input
                        class="mb-2 form-control"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                    />
                    <button class="btn btn-primary mb-2" type="submit">Login</button>
                    {error && <p>{error}</p>} {/* Display error message if any */}
                </form>
            </div>
        </div>
  );
  
};

export default Login;
