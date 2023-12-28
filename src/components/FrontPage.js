// import React, { useState } from 'react';
// import './FrontPage.css'; // Import the CSS file for styling
// import SavedJobs from './SavedJobs'; // Import the SavedJobs component
// import SearchNewJobs from './SearchNewJobs'; // Import the SearchNewJobs component

// function FrontPage() {
//   const [showSavedJobs, setShowSavedJobs] = useState(false);
//   const [showSearchNewJobs, setShowSearchNewJobs] = useState(false);

//   return (
//     <div className="front-page">
//       <h1>Apply to Jobs</h1>
//       <div className="redirect-links">
//         <button onClick={() => setShowSavedJobs(true)}>Saved jobs</button>
//         <button onClick={() => setShowSearchNewJobs(true)}>Search new jobs</button>
//       </div>
//       {showSavedJobs && <SavedJobs />}
//       {showSearchNewJobs && <SearchNewJobs />}
//     </div>
//   );
// }

// export default FrontPage;



//   import React, { useState } from 'react';
//   import './FrontPage.css'; // Import the CSS file for styling
//   import SearchNewJobs from './Search_new_job'; // Import the SavedJobs component
//   import  SavedJobs from './Saved_jobs'; // Import the SearchNewJobs component
// // import Login from './Login_and_Signup';
// import { useNavigate } from 'react-router-dom';

  // function FrontPage() {

    
  //   const [showSavedJobs, setShowSavedJobs] = useState(false);
  //   const whenOnClickSave = () =>{
  //     setShowSavedJobs(true) ; 
  //     setShowSearchNewJobs(false) ; 
  //   }
  //   const [showSearchNewJobs, setShowSearchNewJobs] = useState(false);
  //   const whenOnClickSearch = () =>{
  //     setShowSearchNewJobs(true) ; 
  //     setShowSavedJobs(false) ; 
  //   }
  //   let history = useNavigate()
  //   const whenOnClicklogout = () =>{
  //     localStorage.removeItem('token');
  //     history("/");
  //   }
  //   return (
  //     <div className='container' >
   
  //       <div >
  //         <div className="front-page">
  //           <h1>Apply to Jobs</h1>
  //           <div className="redirect-links">
  //             {/* working */}
  //             <button onClick={() => whenOnClickSearch()}>Search New Jobs</button>      
  //             {/* <button onClick={() => setShowSavedJobs(true)}>Saved Jobs</button> */}
  //             <button onClick={() => whenOnClickSave()}>Saved Jobs</button>     
  //             <button id = "logout" onClick={() => whenOnClicklogout()}>Log Out</button>     
  //           </div>
  //           {showSearchNewJobs && <SearchNewJobs />}
  //           {showSavedJobs && <SavedJobs />}
  //         </div>
  //       </div>
  //     </div>
  //   )
  // }

  // export default FrontPage

  // FrontPage.js
import React from 'react';
import './FrontPage.css';
import { useNavigate } from 'react-router-dom';

function FrontPage() {

  const navigate = useNavigate();

  return (
    <div className='container'>
      <div className='front-page'>
        <h1>Apply to Jobs</h1>
        <div className='redirect-links'>
          <button onClick={() => navigate('/search')}>Search New Jobs</button>
          <button onClick={() => navigate('/saved-jobs')}>Saved Jobs</button>
          {/* <button id='logout' onClick={() => localStorage.removeItem('token')}>Log Out</button> */}
        </div>
      </div>
    </div>
  );
}

export default FrontPage;
