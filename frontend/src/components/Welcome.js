import React, { useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Users from './Users'
import toast from 'react-hot-toast'
const Welcome = () => {

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
      Welcome User
    <br />
      List of the Users:
      <Users />
      <button onClick={handleLogout} >Logout</button>
    </div>
  )
}

export default Welcome
