import React, { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'

const authHoc = (Component) => {

return function WithAuthComponent(props) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate()
    useEffect(()=>{
        axios.get('http://localhost:3031/welcome', { withCredentials: true })
        .then((res) =>{
          console.log(res.data);
          setIsAuthenticated(true);
        })
        .catch((err) => {
          console.log(err)
          setIsAuthenticated(false)
          toast.error('Unauthenticated')
          navigate('/')
        })
      },[])
    
   
    if (isAuthenticated) {
      return <Component {...props} />;
    } else {
        navigate('/')
    }
  };
};

export default authHoc
