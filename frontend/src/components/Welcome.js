import React, { useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Users from './Users'
import toast from 'react-hot-toast'
import { useUser } from '../Context/UserContext';
import authHoc from './HOC/authHoc'

const Welcome = () => {

  const {user} = useUser();

  const navigate = useNavigate();
  const handleLogout = () =>{
    axios.get('http://localhost:3031/logout', { withCredentials: true })
    .then((res) =>{
      navigate('/')
      toast.success("Logout successfully")
    })
    .catch((err) => console.log(err))
  }

  return (
    <div>
      <div style={{display:'flex',justifyContent:'space-between'}}>
        {user && 
          <span><h2>Welcome {user.data.name}</h2></span>
        }
       <span><button onClick={handleLogout} >Logout</button></span> 
      </div>
    <br />
      <Users />
      
    </div>
  )
}

export default authHoc(Welcome)
