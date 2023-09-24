import React,{useState} from 'react'
import '../App.css'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

const Login = () => {

  const [email,setEmail] = useState('')
  const [pass,setPass] = useState('')
  const navigate = useNavigate()

  const data = {
    email : email,
    pass : pass
  }

  const handleSubmit = (e) => {
    e.preventDefault()
   axios.post("http://localhost:3031/login",data, { withCredentials: true })
    .then(result => {
        console.log(result);
        navigate('/welcome')
    })
    .catch((err) => {
        if(err.response){
            const code = err.response.status;
            
            if(code == 402){
                alert("User not exists")
            }if(code == 400){
                alert("Invalid Credentials")
            }
        }
    })
}

  return (
    
    <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={handleSubmit}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign In</h3>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Enter password"
              onChange={(e) => setPass(e.target.value)} required />
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

export default Login
