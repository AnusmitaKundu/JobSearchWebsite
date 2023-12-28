const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const SavedJob = require('./models/SavedJob'); // Import the SavedJob model
const User = require('./models/User'); // Import the SavedJob model
const fetchuser = require('./middleware/fetchuser');

const JWT_SECRET = "ThisIsASecret$tring";
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
//password : subhadeepkhan1234
mongoose.connect('mongodb+srv://subhadeepkhan19112002:subhadeepkhan1234@cluster0.ocyhim1.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

// const userSchema = new mongoose.Schema({
//   username:{
//     type : String,
//     unique : true 
//   },
    
//   password: String,
// });
// new SavedJob({ jobData, user: user.username });
// const User = mongoose.model('User', userSchema);




app.post('/api/save-job', async (req,res) => {
  try {
    const  jobData  = req.body.jobData;
    console.log(jobData)
     const  user  = req.body.user; // Assuming you have middleware that adds the user to the request
     console.log(user)
    // Validate if jobData and user are provided
    if (!jobData ) {
      return res.status(400).json({ error: 'jobData are required' });
    }

    if ( !user) {
      return res.status(400).json({ error: 'user are required' });
    }

    // Save the jobData and associate it with the user
    const savedJob = new SavedJob({ jobData, user: user.username });
    await savedJob.save();

    res.status(201).json({ message: 'Job saved successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});












// Route to fetch saved jobs for a specific user
app.get('/api/saved-jobs', async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET);
    const userId = decoded.username;

    const savedJobs = await SavedJob.find({ user: userId });

    res.status(200).json({ savedJobs });
  } catch (error) {
    console.error('Error fetching saved jobs:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


//delete saved-job
app.delete('/api/saved-jobs/:id', async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET);
    const userId = decoded.username;

    const jobId = req.params.id;

    // Check if the saved job exists and belongs to the logged-in user
    const savedJob = await SavedJob.findOne({ _id: jobId, user: userId });

    if (!savedJob) {
      return res.status(404).json({ error: 'Saved job not found' });
    }

    // Delete the saved job
    await SavedJob.findByIdAndDelete(jobId);

    res.status(200).json({ message: 'Saved job deleted successfully' });
  } catch (error) {
    console.error('Error deleting saved job:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.post('/api/signup', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if the username already exists
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    // If the username doesn't exist, proceed with user creation
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.post('/api/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const token = jwt.sign({ username: user.username }, JWT_SECRET);
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
