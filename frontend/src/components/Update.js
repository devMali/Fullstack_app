import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {useNavigate,useParams} from 'react-router-dom'

const Update = () => {
    const {id} = useParams()
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [age,setAge] = useState('')
    const navigate = useNavigate()

    const data = {
        name : name,
        email : email,
        age : age,
    }
   useEffect(() => {
        axios.get("http://localhost:3031/user/"+id)
        .then(result => {
            console.log(result.data);
            setName(result.data.name);
            setEmail(result.data.email);
            setAge(result.data.age);
        })
        .catch(err => console.log(err))
    },[])

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.put("http://localhost:3031/updateUser/"+id,data)
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
                value={name} onChange={(e) => setName(e.target.value)} />
            </div>

            <div class="form-group">
                <label for="exampleInputEmail1">Email address</label>
                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Email" 
                value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>

            <div class="form-group">
                <label for="exampleInputPassword1">Age</label>
                <input type="number" class="form-control" id="exampleInputPassword1" placeholder="Enter Age" 
                value={age} onChange={(e) => setAge(e.target.value)} />
            </div>

            <button type="submit" class="btn btn-primary">Submit</button>
        </form>

    </div>
  )
}

export default Update
