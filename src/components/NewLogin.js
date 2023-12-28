  import React , {useState} from 'react';
  import { useNavigate } from 'react-router-dom';
  import Alert from './Alert';

  import './NewLogin1.css';

  // import './FrontPage.css';

  function NewLogin() {
      const [username, setUsername] = useState('');
      const [password, setPassword] = useState('');
      const [alert, setAlert] = useState(null)
      const showAlert = (msg, type) => {
        setAlert({
          msg: msg,
          type: type
        })
        setTimeout(() => {
          setAlert(null);
        }, 1500);
      }
    

      const navigate = useNavigate();

    // const handleLogin = async () => {
    //   try {
    //     const response = await fetch('http://localhost:5000/api/login', {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //       body: JSON.stringify({ username, password }),
    //     });

    //     const data = await response.json();

    //     if (response.ok) {
    //       localStorage.setItem('token', data.token);
    //       navigate('/front-page');
    //     } else {
    //       console.error(data.error);
    //     }
    //   } catch (error) {
    //     console.error('Error during login:', error);
    //   }
    // };

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
          // Display an alert or handle the error in some way
          showAlert(data.error, 'error');
        }
      } catch (error) {
        console.error('Error during login:', error);
        // Display an alert or handle the error in some way
        showAlert('Error during login', 'error');
      }
    };
    


    const handleSignup = async () => {
      showAlert("User created successfully" , "success");
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
          
          // <Alert alert={alert} />
          // alert("User created successfully")
          console.log(data.message);
        } else {
          console.error(data.error);
        }
      } catch (error) {
        console.error('Error during signup:', error);
      }
    };

    return (
      <div>
          {/* <div className='login-form'>
            <input type='text' placeholder='Username' onChange={(e) => setUsername(e.target.value)} />
            <input type='password' placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleLogin}>Login</button>
            <button onClick={handleSignup}>Signup</button>
          </div> */}

      {/* new */}

      <div className="wrapper">
  
        <h1>Login & Sign Up</h1>
        <div className="input-box">
          <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)}  required />
          <i className='bx bxs-user'></i>
        </div>
        <div className="input-box">
          <input type="password" placeholder="Password"  onChange={(e) => setPassword(e.target.value)} required/>
          <i className='bx bxs-lock-alt' ></i>
        </div>
        
        <button  onClick={handleLogin}  className="btn">Login</button>
        <button  onClick={handleSignup }  className="btn my-3">Sign Up</button>
    
    </div>
      </div>
    )
  }

  export default NewLogin