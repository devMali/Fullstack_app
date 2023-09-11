const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors")
const UserModel = require("./models/users")

const app = express();
app.use(cors())
app.use(express.json());

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

app.post("/create",(req,res) => {
    UserModel.create(req.body)
    .then(users => res.json(users))
    .catch(err => res.json(err))
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

app.listen(3031, () => { 
    console.log("Backend running on port 3031");
})