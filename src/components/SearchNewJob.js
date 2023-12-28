import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.min.css";
import { jwtDecode } from "jwt-decode";

// import fetchuser from "../../Backend/middleware/fetchuser";
// import { Jwt } from "jsonwebtoken";

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const history = useNavigate();

  const fetchJobs = async () => {
    const url = "https://jobsearch4.p.rapidapi.com/api/v2/Jobs/Latest";

    try {
      const token = localStorage.getItem('token');
      console.log('Token:', token);

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': '680074bfcdmshaff0eb843bee741p176ed1jsned2c0d89315f',
          'X-RapidAPI-Host': 'jobsearch4.p.rapidapi.com',
          'Authorization': `Bearer ${token}`,
        },
      });

      const result = await response.json();

      if (result && result.data) {
        setJobs(result.data);
      } else {
        console.error("API response does not contain data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const whenOnClick = async (job)  => {
    const token = localStorage.getItem('token');

    try {
      const decoded = jwtDecode(token);
      
      console.log(decoded.username);

      const response = await fetch('http://localhost:5000/api/save-job', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ jobData: job, user: decoded }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log(data.message);
      } else {
        console.error(data.error);
      }
    } catch (error) {
      console.error('Error saving job:', error);
    }
  };

  const whenOnClicklogout = () => {
    localStorage.removeItem('token');
    history("/");
  };

  return (
    <div className="container">
      <h2 className="my-3">Job Listings</h2>
      <button type="button" className="btn btn-primary my-3 float-right" id='logout' onClick={whenOnClicklogout}>Log Out</button>
      <div className="row">
        {jobs.map((job) => (
          <div key={job.url} className="col-md-4 mb-3">
            <Card>
              <Card.Body style={{ backgroundColor: "#FFFFF0" }}>
                <h5 style={{ color: "blue" }}>Job Title: </h5>
                <Card.Title>{job.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  <h5 style={{ color: "blue" }}>Company Name: </h5>
                  <h4>{job.company}</h4>
                </Card.Subtitle>
                <Card.Text>{job.Source}</Card.Text>
                <Card.Text>
                  <a href={job.url} onClick={whenOnClick} target="_blank" rel="noreferrer" className="btn btn-dark">Read More</a>
                  <a rel="noreferrer" className="btn btn-dark mx-3" onClick={() => whenOnClick(job)}>Save</a>
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobList;
