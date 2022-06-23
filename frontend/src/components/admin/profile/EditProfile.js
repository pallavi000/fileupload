import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function EditProfile() {
    const [user,setUser] = useState({})
    const [username,setUsername] = useState('')
    const[email,setEmail] = useState('')
    const[password,setPassword] = useState('')
    const[firstName,setFirstName]= useState('')
    const[lastName,setLastName]= useState('')
    const[gender,setGender] = useState('')
    const[country,setCountry] =useState('')
    const[image,setImage] = useState('')

    const navigate =useNavigate()
    const params= useParams()

    useEffect(() => {
    getUser()
    }, [])

    const config={
        headers:{
            'access-token':localStorage.getItem('token')
        }
    }

    async function getUser(){
        try {
            const response = await axios.get('/user/'+params.id,config)
            console.log(response.data)
            setUser(response.data)
            setEmail(response.data.email)
            setUsername(response.data.username)
            setFirstName(response.data.firstname)
            setLastName(response.data.lastname)
            setCountry(response.data.country)
            setGender(response.data.gender)
          

        } catch (error) {   
            console.log(error.request.response) 
        }
    }
    

    async function editProfile(e){
        try {
            e.preventDefault()
            const data = new FormData()
            data.append('email',email)
            data.append('firstname',firstName)
            data.append('lastname',lastName)
            data.append('country',country)
            data.append('gender',gender)
            data.append('image',image)
           
            const response = await axios.post('/user/edit-profile/'+params.id,data,config)
            console.log(response.data)
            
        } catch (error) {
            console.log(error.request.response)
        }
       
    }
  return (
    <div className='content-wrapper'>
    <div className='login-section bg-transparent edit-profile-section'>
    <div className='card login-card'>
    <div className='login-header'>Edit Profile</div>
    
        <div className='card-body'>
            <form onSubmit={(e)=>editProfile(e)}>
                <div className='form-group d-flex'>
                    <input type="text" class="username" onChange={(e)=>setUsername(e.target.value)} defaultValue={user.username} readOnly placeholder="Username" required/>
                </div>
                <div className='form-group d-flex'>
                    <input type="email" class="username" onChange={(e)=>setEmail(e.target.value)} defaultValue={user.email} placeholder="Email" required/>
                </div>
                <div className='form-group d-flex'>
                    <input type="text" class="username" onChange={(e)=>setFirstName(e.target.value)} defaultValue={user.firstname} placeholder="FirstName" required/>
                </div>
                <div className='form-group d-flex'>
                    <input type="text" class="username" onChange={(e)=>setLastName(e.target.value)} defaultValue={user.lastname} placeholder="Lastname" required/>
                </div>
                <div className='form-group d-flex'>
                <select className='username' onChange={(e)=>setGender(e.target.value)}>
                    <option value="">Select Gender</option>
                    {user.gender=="male"?(
                        <option value="male" selected >Male</option>

                    ):(
                        <option value="male" >Male</option>

                    )}

                    {user.gender=="female"?(
                        <option value="female" selected >Female</option>

                    ):(
                        <option value="female" >Female</option>

                    )}
                    
                </select>
                </div>
                <div className='form-group d-flex'>
                    <input type="text" class="username" defaultValue={user.country} onChange={(e)=>setCountry(e.target.value)} placeholder="Country" required/>
                </div>
                <button className='btn-signin' type="submit">Update</button>
            </form>
        </div>
    </div>
</div>
</div>
  )
}

export default EditProfile