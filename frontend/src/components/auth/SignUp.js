import React,{useState} from 'react'
import axios from 'axios'
import {useNavigate } from 'react-router-dom'

function SignUp() {
    const [username,setUsername] = useState('')
    const[email,setEmail] = useState('')
    const[password,setPassword] = useState('')

    const navigate =useNavigate()

function register(e){
    e.preventDefault()
    try {
        const data={
            username,
            email,
            password
        }
        const response = axios.post('/user/register',data)
        console.log(response.data)
        navigate('/')
    } catch (error) {
        console.log(error.request.response)
    }
}

  return (
    <div className='login-section auth-card'>
    <div className='card login-card '>
        <div className='card-body'>
            <div className='login-header'>Register</div>
            <form onSubmit={(e)=>register(e)}>
                <div className='form-group d-flex'>
                    <input type="text" class="username" onChange={(e)=>setUsername(e.target.value)} placeholder="Username" required/>
                    <i class="fa-solid fa-user loginicon"></i>
                </div>
                <div className='form-group d-flex'>
                    <input type="email" class="username" onChange={(e)=>setEmail(e.target.value)} placeholder="Email" required/>
                    <i class="fa-solid fa-envelope loginicon"></i>
                </div>
                <div className='form-group d-flex'>
                    <input type="password" class="username" onChange={(e)=>setPassword(e.target.value)} placeholder="Password" required/>
                    <i class="fa-solid fa-eye-slash loginicon"></i>
                </div>

                <button className='btn-signin' type="submit">Register</button>
            </form>
        </div>
    </div>
</div>
  )
}

export default SignUp