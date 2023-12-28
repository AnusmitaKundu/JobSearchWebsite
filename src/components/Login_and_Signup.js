import React from 'react';
// install "npm installreact-router-dom@6"
import { Link} from 'react-router-dom'    

function Login() {
  return (
    <div className='container my-5 center'>
      <Link class="btn btn-primary btn-lg  mx-3" to="/login" role="button">Login </Link>
      <Link class="btn btn-primary btn-lg mx-3" to="/signup" role="button">Sign up </Link>

    </div>
  )
}

export default Login