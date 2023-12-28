// models/SavedJob.js

const mongoose = require('mongoose');

const savedJobSchema = new mongoose.Schema({
  jobData: {
    type: Object,
    url: {
      type: String,
      required: true,
      unique: true,
    },
    required: true,
    unique: true,
  },
  user: {
    type: String, // Assuming the user identifier is a string (username)
    required: true,
  },
});
// Pre-save hook to check for existing url before saving
savedJobSchema.pre('save', async function (next) {
  const existingJob = await this.constructor.findOne({
    'jobData.url': this.jobData.url,
  });

  const existingJobUser = await this.constructor.findOne({
    'user': this.User,
  })

  if ((existingJob) || (existingJobUser)) {
    // If a job with the same url exists, don't save the current document
    const error = new Error('Job with the same URL already exists');
    return next(error);
  }

  next();
});

const SavedJob = mongoose.model('SavedJob', savedJobSchema);

module.exports = SavedJob;


// const SavedJob = mongoose.model('SavedJob', savedJobSchema);

// module.exports = SavedJob;

