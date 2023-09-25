import React, { useEffect } from 'react'
import {Link} from 'react-router-dom'
import './home.css'
import toast from 'react-hot-toast';

const Home = () => {
  return (
    <div className='background'>
        <br /><br /><br />
      
      <h2>Welcome to the HOME page</h2>
      <h5><Link to='/welcome'>Go to welcome page</Link></h5>
        <br /><br /><br />
        
      <div style={{display:'flex',justifyContent:'center'}}>
       <div> <Link to='/create' className='btn btn-primary'>Registration</Link></div>
       &nbsp;&nbsp;&nbsp; <div><Link to='/login' className='btn btn-primary'>Login</Link></div>
    </div>

    </div>
  )
}

export default Home
