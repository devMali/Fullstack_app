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
        pass : pass,
        age : age,
    }
    const handleSubmit = (e) => {
        e.preventDefault()
       const response = axios.post("http://localhost:3031/create",data)
        .then(result => {
            console.log(result);
            navigate('/')
        })
        .catch((err) => {
            if(err.response){
                const code = err.response.status;
                
                if(code == 409){
                    alert("User already exists")
                }if(code == 400){
                    alert("All inputs are required")
                }
            }
        })
    }
  return (
    <div className="Auth-form-container">
      <form onSubmit={handleSubmit} className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign Up</h3>
          <div className="form-group mt-3">
            <label>Name</label>
            <input
              type="text"
              className="form-control mt-1"
              placeholder="Enter name"
              onChange={(e) => setName(e.target.value)} required
            />
          </div>
          <div className="form-group mt-3">
            <label>Email</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Email Address"
              onChange={(e) => setEmail(e.target.value)} required 
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Password"
              onChange={(e) => setPass(e.target.value)} required 
            />
          </div>
          <div className="form-group mt-3">
            <label>Age</label>
            <input
              type="number"
              className="form-control mt-1"
              placeholder="Age"
              onChange={(e) => setAge(e.target.value)} required 
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Create
