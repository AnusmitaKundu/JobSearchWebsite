// import React from 'react';
// import './App.css';
// import FrontPage from './components/FrontPage';

// import Login_and_Signup from './components/Login_and_Signup';
// import Login from './components/Login';
// import SignUp from './components/SignUp';

// import {
//   BrowserRouter,
//   Routes,
//   Route
//   // Link,
//   // Outlet,
//   // Router
// } from "react-router-dom";
// // import SavedJobs from './components/SavedJobs';

// // import SearchNewJobs from './components/SearchNewJobs';

// // "f#f55dc"
// // "#ffe5b4"
// function App() {

//   document.body.style.backgroundColor = "#ffe5b4";


//   return (
//     // <div className="app" >
//     //   {/* <Login/> */}
//     //   <FrontPage  />
//     //   {/* <SavedJobs/> */}
//     //   {/* <SearchNewJobs/> */}

//     // </div>


// <BrowserRouter>
// <Routes>
//     {/* NOTES: */}
//     {/* function of Exact : /user --> Component 1 
//                         /user/home ---> Component 2 
//                         without exact if we want to search user/ home then it will fetch /user page bcz react js always search partially   */}
//   <Route exact path="/" element={<Login_and_Signup/>} />
//   <Route exact path="/login" element={<Login/>} />
//   <Route exact path="/signup" element={<SignUp/>} />
//   <Route exact path="/frontpage" element={<FrontPage/>} />
// </Routes>
// </BrowserRouter>


//   );
// }

// export default App;

// App.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import FrontPage from './components/FrontPage.js';
import SearchNewJobs from './components/SearchNewJob.js';
import SavedJobs from './components/SavedJobs.js';
import PrivateRoute from './components/PrivateRoute.js';
import NewLogin from './components/NewLogin.js';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NewLogin/>} />
        <Route path="/front-page" element={<FrontPage />} />
        <Route path="/search" element={<PrivateRoute><SearchNewJobs /></PrivateRoute>} />
        <Route path="/saved-jobs" element={<PrivateRoute><SavedJobs /></PrivateRoute>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;


