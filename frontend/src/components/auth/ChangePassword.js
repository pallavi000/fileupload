import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import * as toastr from 'toastr';
import '../../../node_modules/toastr/build/toastr.css'

function ChangePassword() {
    const[newPassword,setNewPassword] = useState('')
    const[confirmPassword,setConfirmPassword] = useState('')


    
    const navigate = useNavigate()

    const config={
        headers:{
            'access-token':localStorage.getItem('token')
        }
    }



    async function updatePassword(e){
        e.preventDefault()
        try {
            const data={
               'newpassword':newPassword,
               'confirmpassword':confirmPassword
                
            }
            const response = await axios.post('/user/change-password',data,config)
            console.log(response.data)
            toastr.success('Success !!')
            navigate(-1)
            
        } catch (error) {
            console.log(error.request.response)
            toastr.error(error.request.response,'Error')
        }
    }
 

  return (
    <div className='login-section auth-card'>
    <div className='card login-card '>
        <div className='card-body'>
            <div className='login-header'>Change Password</div>
            <form onSubmit={(e)=>updatePassword(e)}>
                <div className='form-group d-flex'>
                    <input type="password" class="username" onChange={(e)=>setNewPassword(e.target.value)} placeholder="New Password" required/>
                    <i class="fa-solid fa-eye-slash loginicon"></i>

                </div>
                <div className='form-group d-flex'>
                    <input type="password" class="username" onChange={(e)=>setConfirmPassword(e.target.value)} placeholder="Confirm Password" required/>
                    <i class="fa-solid fa-eye-slash loginicon"></i>
                </div>

                <button className='btn-signin' type="submit">Update</button>
            </form>
        </div>
    </div>
</div>
  )
}

export default ChangePassword