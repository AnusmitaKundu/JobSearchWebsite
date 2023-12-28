import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {

    const [credential, setCredential] = useState({ name: "", email: "", password: "", cpassword: "" })
    let history = useNavigate()

    const handeSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/createuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // 'auth-token' : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU3ZjA5NGZkZmUxYWJkNGM1NTRjNWFmIn0sImlhdCI6MTcwMjgyNDY2NX0.paNaZmfOKewlerbHGx8ByYrl01mB4lEN6ouGEiue8WY'
            },
            body: JSON.stringify({ name: credential.name, email: credential.email, password: credential.password })
        });
        const json = await response.json()
        console.log(json)
        if (json.success) {
            // save the auth-token and redirect
            localStorage.setItem('token', json.authtoken);
            history("/frontpage");
        }
        else {
            alert("Invalid credential")
        }

    }
    const onChange = (e) => {
        setCredential({ ...credential, [e.target.name]: e.target.value })
    }

    return (

        <div className='container'>
            <form onSubmit={handeSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" value={credential.name} onChange={onChange} id="email" name="name" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" value={credential.email} onChange={onChange} id="email" name="email" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" value={credential.password} onChange={onChange}  required id="password" name="password" />
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" value={credential.cpassword} onChange={onChange}  required id="cpassword" name="cpassword" />
                </div>

                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>
        </div>

    )
}

export default SignUp