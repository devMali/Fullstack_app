import React, { useState } from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

const Create = () => {

    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [pass,setPass] = useState('')
    const [age,setAge] = useState('')
    const navigate = useNavigate()

    const data = {
        name : name,
        email : email,
        age : age,
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post("http://localhost:3031/create",data)
        .then(result => {
            console.log(result);
            navigate('/')
        })
        .catch(err => console.log(err))
    }
  return (
    <div style={{width:'300px',margin:'50px',border:'2px solid black'}}>
      
        <form onSubmit={handleSubmit}>

            <div class="form-group">
                <label for="exampleInputName">Name</label>
                <input type="text" class="form-control" id="exampleInputName" placeholder="Enter Name" 
                onChange={(e) => setName(e.target.value)} required />
            </div>

            <div class="form-group">
                <label for="exampleInputEmail1">Email address</label>
                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Email" 
                onChange={(e) => setEmail(e.target.value)} required />
            </div>

            <div class="form-group">
                <label for="pass">Password</label>
                <input type="password" class="form-control" id="pass"  placeholder="Enter Password" 
                onChange={(e) => setEmail(e.target.value)} required />
            </div>

            <div class="form-group">
                <label for="exampleInputPassword1">Age</label>
                <input type="number" class="form-control" id="exampleInputPassword1" placeholder="Enter Age" 
                onChange={(e) => setAge(e.target.value)} required />
            </div>

            <button type="submit" class="btn btn-primary">Submit</button>
        </form>

    </div>
  )
}

export default Create
