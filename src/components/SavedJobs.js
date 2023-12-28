import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
// import { jwtDecode } from "jwt-decode";

const SavedJobs = () => {
  const [savedJobs, setSavedJobs] = useState([]);

  useEffect(() => {
    // Fetch saved jobs from the backend
    const fetchSavedJobs = async () => {
      const token = localStorage.getItem('token');


      try {
        const response = await fetch('http://localhost:5000/api/saved-jobs', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        const data = await response.json();
        console.log(data)
        if (response.ok) {
          setSavedJobs(data.savedJobs);
        } else {
          console.error(data.error);
        }
      } catch (error) {
        console.error('Error fetching saved jobs:', error);
      }
    };

    fetchSavedJobs();
  }, []);


  //delete saved job 
  const deleteSavedJob = async (jobId) => {
    // console.log(jobId);
    const token = localStorage.getItem('token');
    // console.log(token);

    try {
      const response = await fetch(`http://localhost:5000/api/saved-jobs/${jobId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        // If the deletion is successful, update the state to remove the deleted job
        setSavedJobs((prevSavedJobs) => prevSavedJobs.filter(job => job._id !== jobId));
      } else {
        console.error(data.error);
      }
    } catch (error) {
      console.error('Error deleting saved job:', error);
    }
  };


  return (
    <div className="container">
      <h2 className="my-3">Saved Jobs</h2>
      <div className="row">
        {savedJobs.map((savedJob) => (
          <div key={savedJob._id} className="col-md-4 mb-3">
            <Card>
              <Card.Body style={{ backgroundColor: "#FFFFF0" }}>
                <h5 style={{ color: "blue" }}>Job Title: </h5>
                <Card.Title>{savedJob.jobData.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  <h5 style={{ color: "blue" }}>Company Name: </h5>
                  <h4>{savedJob.jobData.company}</h4>
                </Card.Subtitle>
                <Card.Text>{savedJob.jobData.Source}</Card.Text>
                <a href={savedJob.jobData.url} target="_blank" rel="noreferrer" className="btn btn-dark">Read More</a>
                <i class="fa-solid fa-trash mx-5" onClick={() => deleteSavedJob(savedJob._id)}></i>
                {/* Add more details as needed */}
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};
export default SavedJobs;
