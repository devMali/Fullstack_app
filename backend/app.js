const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors")
const UserModel = require("./models/users")
const bcrypt = require("bcryptjs")
require("dotenv").config();
const jwt = require("jsonwebtoken");

const app = express();
app.use(cors())
app.use(express.json({ limit: "50mb" }));

const connect = async () =>{
    try{
        mongoose.connect("mongodb://localhost:27017/CRUD", {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Connected to database");
    }
    catch(err){
        console.log(err);
    }
}

connect();

app.get('/users',(req,res) => {
    UserModel.find({})
    .then(users => res.json(users))
    .catch(err => res.json(err))
})

app.get('/user/:id',(req,res) => {
    const id = req.params.id
    UserModel.findById({_id : id})
    .then(user => res.json(user))
    .catch(err => res.json(err))
})

app.post("/create",async (req,res) => {
    try {
        const { name, email, pass,age } = req.body;

        if (!(email && pass && name && age)) {
          res.status(400).send("All input is required");
        }
    
        const oldUser = await UserModel.findOne({ email });
    
        if (oldUser) {
          return res.status(409).send("User Already Exist. Please Login");
        }

        const encryptedPass = await bcrypt.hash(pass, 10);

          const user = await UserModel.create({
            name,
            email: email.toLowerCase(),
            pass: encryptedPass,
            age,
          });

        //   const token = jwt.sign(
        //     {user_id:user._id, email },
        //     process.env.TOKEN_KEY,
        //     {
        //       expiresIn: "2h",
        //     }
        //   );

        //   res.cookie('jwt', token,{
        //     httpOnly : true,
        //     maxAge : 24 * 60 * 60 * 1000 // 24 hours
        // })
        
        res.status(201).json(user);
        console.log(user);
      } catch (err) {
        console.log(err);
      }
})

app.put("/updateUser/:id",(req,res) => {
    const id = req.params.id
    UserModel.findByIdAndUpdate({_id:id} , {
        name : req.body.name,
        email : req.body.email,
        age : req.body.age 
    })
    .then(users => res.json(users))
    .catch(err => res.json(err))
})

app.delete('/delUser/:id',(req,res) =>{
    const id = req.params.id;
    UserModel.findByIdAndDelete({_id:id})
    .then(res => res.json(res))
    .catch(err => res.json(err))
})

app.post('/login',async (req,res)=> {
  try {
    // Get user input
    const { email, pass } = req.body;

    // Validate user input
    if (!(email && pass)) {
      res.status(401).send("All input is required");
    }
    // Validate if user exist in our database
    const user = await UserModel.findOne({ email });

    if(!user){
      res.status(402).send("User not exist");
    }
    if (user && (await bcrypt.compare(pass, user.pass))) {
      // Create token
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );

        res.cookie('jwt', token,{
            httpOnly : true,
            maxAge : 24 * 60 * 60 * 1000 // 24 hours
        })
        res.status(200).json(user);
        console.log(user);
      }
    res.status(400).send("Invalid Credentials");
  } catch (err) {
    console.log(err);
  }
})
module.exports = app;
