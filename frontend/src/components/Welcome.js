import React, { useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Users from './Users'
import toast from 'react-hot-toast'
import { useUser } from '../Context/UserContext';

const Welcome = () => {

  const {user} = useUser();
  //console.log(user.data);
  const navigate = useNavigate();
  useEffect(()=>{
    axios.get('http://localhost:3031/welcome', { withCredentials: true })
    .then((res) =>{
      console.log(res.data)
    })
    .catch((err) => {
      console.log(err)
      toast.error('Unauthenticated')
      navigate('/')
    })
  },[])

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
        <span><h2>Welcome {user.data.name}</h2></span>
       <span><button onClick={handleLogout} >Logout</button></span> 
      </div>
    <br />
      <Users />
      
    </div>
  )
}

export default Welcome
