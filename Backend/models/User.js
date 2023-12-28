const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true, // Ensure the uniqueness of the username
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;













// const mongoose = require ('mongoose')  ;
// const { Schema } = mongoose;
// const userSchema = new Schema({
//     username : {
//         type : String, 
//         required : true 
//     }, 
//     // email : {
//     //     type : String , 
//     //     required : true,
//     //     unique : true
//     // },
//     password :{
//         type  : String , 
//         required : true
//     },
//     date : {
//         type :  Date , 
//         default : Date.now
//     }
    
//   });
// const User = mongoose.model( 'User' , userSchema ) ; 
// User.createIndexes(); 

//   module.exports = User ;