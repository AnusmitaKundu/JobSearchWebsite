const express = require('express');
const User = require('../models/User');
const router = express.Router() ;
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = "ThisIsASecret$tring";

//Route 1 : Create a User using POST "/api/auth/createuser". No login require
// router.post('/auth' ,[
router.post('/auth/createuser' ,[
    body('name' ,   'Enter a valid name!!').isLength({min : 3}),
    body('email' ,  'Enter a valid Email').isEmail(),
    body('password' , 'Enter a valid and strong password').isStrongPassword({min : 5}),
//     The isStrongPassword() function in JavaScript validates a password based on its length, mixed case, and whether it includes numbers. The function should return true if the password meets all of the following conditions:
// The password is at least 8 characters long.
// The password does not contain the string "password".
], async(req, res)=>{

    let success = false;
    //If there are error, return Bad Req and the error
    const errors = validationResult(req) ;
    if(!errors.isEmpty()) 
    {
        return res.status(400).json(success , {errors: errors.array()}); 
    }
    //Check whether the user with this email exist already  
    let user = await User.findOne({email : req.body.email});
    if (user){
        return res.status(400).json({ success , error : "Sorry a user with this email already exist!" })
    } 
    const salt = await bcrypt.genSalt(10) ; 
    const securePass = await bcrypt.hash(req.body.password,salt) ; 

    //create a user
    user = await User.create({
        name :req.body.name,
        password : securePass,
        email :req.body.email,  
    });

    const data = {
        user : {
            id : user.id    
        }
    }
    const authtoken = jwt.sign(data , JWT_SECRET);
    // .then(user => res.json(user));
    // res.send(req.body) ; 
    // res.json(obj)

    // res.json(user)
    success = true ;
    res.json({success,authtoken})
    // res.json(authtoken)
})




//Route 2 :  Create a User using POST "/api/auth/login". No login require
router.post('/auth/login' ,[
    body('email' ,  'Enter a valid Email').isEmail(),
    body('password' , 'password can not be blank').exists(),
//     The isStrongPassword() function in JavaScript validates a password based on its length, mixed case, and whether it includes numbers. The function should return true if the password meets all of the following conditions:
// The password is at least 8 characters long.
// The password does not contain the string "password".
], async(req, res)=>{
    let success = false;
     //If there are error, return Bad Req and the error
     const errors = validationResult(req) ;
     if(!errors.isEmpty()) 
     {
         return res.status(400).json({errors: errors.array()}); 
     }

     const {email, password} = req.body ; 
     try {
        let user = await User.findOne({email});
        if(!user){
            
            success = false ; 
            return res.status(400).json({ success , error : "Please insert correct email or password"});
        }
        const passwordCompare = await bcrypt.compare(password, user.password)
        if (!passwordCompare){
            success = false ; 
            return res.status(400).json({success ,error : "Please insert correct email or password"});

        }
        const data ={
            user:{
                id : user.id 
            }
        }
        // either write this one 
        // const jwtData = jwt.sign(data , JWT_SECRET);
        // res.json(jwtData) 

        // or this one
        const authtoten = jwt.sign(data , JWT_SECRET);
        success = true ; 
        res.json({success , authtoten}) 
     } catch (error) {
        console.error(error.message);
        res.status(500).send("some error occured");
     }
});



//Route 3 : Get logging user detail using POST "/api/auth/getuser" 
router.post('/auth/getuser', fetchuser,async(req, res)=>{
try {
    userID = req.user.id;
    const user =await User.findById(userID).select("-password");    
    res.send(user);
} catch (error) {
    console.error(error.message);
    res.status(500).send("some error occured");
 }
});

module.exports = router;