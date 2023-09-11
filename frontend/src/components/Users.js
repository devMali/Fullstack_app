import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'

const Users = () => {
    
    const [users,setUsers] = useState([])   
    
    const cent = {
        justifyContent: 'center',
        alignItems: 'center',
    }
    const btn ={
        width:'50px'
    }
    useEffect(() =>{
        axios.get('http://localhost:3031/users')
        .then(result =>{
            setUsers(result.data)
            console.log(result.data)
        })
        .catch(err => console.error(err))
    },[])

    const handleDelete = (id) => {
            axios.delete('http://localhost:3031/delUser/'+id)
            .then(res => {
                console.log(res);
                window.location.reload(false);
            })
            .catch(err => console.log(err))
    }

  return (
    <>      
    <br /><br /><br />
    <h2>User Data</h2>
    <br />
    <br />
    <div style={cent}>
    <Link to='/create' className='btn btn-primary' style={cent}>Add</Link>

      <table className='table tbl-stripped' style={{width:'max-content',border : '2px solid red'}} cellPadding={'10px'} cellSpacing={'10px'}>
      <thead>
        <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Age</th>
            <th>Action</th>
        </tr>
        </thead>
        <tbody>
            {
               users.map((user) => {
                  return  <tr key={user._id}>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.age}</td>
                        <td>
                           <Link to={`update/${user._id}`}> <button className='btn btn-info'>Edit</button> </Link>
                            <button className='btn btn-danger' onClick={(e) => handleDelete(user._id)}>Delete</button>
                        </td>
                    </tr>
                })
            }
        </tbody>
      </table>
    </div>
    </>
  )
}

export default Users
