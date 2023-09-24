import React, { useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Welcome = () => {

  const navigate = useNavigate();
  useEffect(()=>{
    axios.get('http://localhost:3031/welcome', { withCredentials: true })
    .then((res) => console.log(res.data))
    .catch((err) => {
      console.log(err)
      alert('Login again')
      navigate('/')
    })
  },[])

  const handleLogout = () =>{
    axios.get('http://localhost:3031/logout', { withCredentials: true })
    .then((res) =>{
      navigate('/')
    })
    .catch((err) => console.log(err))
  }

  return (
    <div>
      Welcome User

      <button onClick={handleLogout} >Logout</button>
    </div>
  )
}

export default Welcome
