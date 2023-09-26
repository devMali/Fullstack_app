const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors")
const UserModel = require("./models/users")
const bcrypt = require("bcryptjs")
require("dotenv").config();
const jwt = require("jsonwebtoken");
const auth = require("./middleware/auth")
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require('body-parser');

// const corsOptions = {
//   origin: 'http://localhost:3000',
//   withCredentials: 'true', // Don't forget to specify this if you need cookies
// };

// app.use(cors(corsOptions))
// app.use(cookieParser());
// app.use(express.json({ limit: "50mb" }));


app.use(cors({
    credentials:true,
    origin: ['http://localhost:3031', 'http://localhost:3000','http://localhost:3001','http://localhost:4200']
}))


app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));
app.use(express.json({limit: '10mb'}))
app.use(express.urlencoded({limit: '10mb'}))
app.use(cookieParser())
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
  });



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
    const { email, pass } = req.body;

    if (!(email && pass)) {
      res.status(401).send("All input is required");
    }
    const user = await UserModel.findOne({ email });

    if(!user){
      res.status(402).send("User not exist");
    }
    if (user && (await bcrypt.compare(pass, user.pass)))
    {
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );

       res.cookie("token", token, {
          httpOnly: true,
          expires : new Date(Date.now() + 60000 * 5)
        })
        .status(200)
        .json({ message: "Logged in successfully 😊 👌",data:user })
    }

    res.status(400).send("Invalid Credentials");
  } catch (err) {
    console.log(err);
  }
})

app.get("/welcome", auth, (req, res) => {
  res.status(200).send("Welcome 🙌 ");
});

app.get("/logout", auth, (req, res) => {
  return res
    .clearCookie("token")
    .status(200)
    .json({ message: "Successfully logged out 😏 🍀" });
});

module.exports = app;
