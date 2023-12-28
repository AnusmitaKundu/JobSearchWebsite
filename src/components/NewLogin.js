import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Alert from './Alert';
import './NewLogin1.css';
function NewLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [alert, setAlert] = useState(null);

  const showAlert = (msg, type) => {
    setAlert({
      msg: msg,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 2000);
  };

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        navigate('/front-page');
      } else {
        showAlert(data.error, 'danger');
      }
    } catch (error) {
      console.error('Error during login:', error);
      showAlert('Error during login', 'danger');
    }
  };

  const handleSignup = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        showAlert('User created successfully', 'success');
        console.log(data.message);
      } else {
        console.error(data.error);
        showAlert(data.error, 'warning');
      }
    } catch (error) {
      console.error('Error during signup:', error);
      showAlert(error, 'danger');

    }
  };

  return (
    <div>
      {/* Display the Alert component and pass the alert state */}
      <Alert alert={alert} />

      <div className="wrapper">
        <h1>Login & Sign Up</h1>
        <div className="input-box">
          <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} required />
          <i className="bx bxs-user"></i>
        </div>
        <div className="input-box">
          <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
          <i className="bx bxs-lock-alt"></i>
        </div>

        <button onClick={handleLogin} className="btn">
          Login
        </button>
        <button onClick={handleSignup} className="btn my-3">
          Sign Up
        </button>
      </div>
    </div>
  );
}

export default NewLogin;

  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  