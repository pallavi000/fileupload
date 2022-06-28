import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import profile from '../../../images/profile.png'
import { Oval } from  'react-loader-spinner'


function Profile() {
    const[user,setUser]= useState({})
    const [is_loader,setIs_loader] = useState(true)

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
        const response = await axios.get('/user/current/user',config)
        console.log(response.data)
        setIs_loader(false)
        setUser(response.data)
        
    } catch (error) {
        console.log(error.request.response)
        setIs_loader(false)
        
    }
}



  return (
    is_loader?(
        <Oval
        height="100"
        width="100"
        color='#94142C'
        ariaLabel='loading'
        secondaryColor="#ddd"
      />
      ):(
    <div className='content-wrapper'>
    <div className=' container-fluid'>
        <div className='profile-header d-flex align-items-center justify-content-between'>
            <div className='profile-title'>Profile</div>
            <Link className='edit-profile' to={`/edit-profile/${user._id}`}>Edit Profile</Link>
        </div>
        <div className='profile-card'>
            <div className='profile-card-title'>General Info</div>
                <div className='profile-card-container  '>
                    <div className='col-md-4 row justify-content-between aligin-items-center'>
                        <div className='profile-card-items'>
                            <div className='profile-card-item'>First Name :</div>
                            <div className='profile-card-item'>Last Name :</div>
                            <div className='profile-card-item'>Gender :</div>
                            <div className='profile-card-item'>Country :</div>
                        </div>
                        <div className='profile-card-items'>
                            <div className='profile-card-item-value text-capitalize'>{user.firstname}</div>
                            <div className='profile-card-item-value text-capitalize'>{user.lastname}</div>
                            <div className='profile-card-item-value text-capitalize'>{user.gender}</div>
                            <div className='profile-card-item-value text-capitalize'>{user.country}</div>
                        </div>
                    </div>
                    <div className='col-md-8 profile-image'>
                    {user.image?(
                        <img src={user.image} className="img-fluid"/>

                    ):(
                        <img src={profile} className="img-fluid"/>

                    )}
                    </div>
                </div>
            
        </div>
        <div className='profile-card'>
            <div className='profile-card-title'>Account Info</div>
                <div className='profile-card-container  '>
                    <div className='col-md-4 row justify-content-between aligin-items-center'>
                        <div className='profile-card-items'>
                            <div className='profile-card-item'>Username :</div>
                            <div className='profile-card-item'>Email:</div>
                            <div className='profile-card-item'>Account Type :</div>
                            <div className='profile-card-item'>Password :</div>
                        </div>
                        <div className='profile-card-items'>
                            <div className='profile-card-item-value'>{user.username}</div>
                            <div className='profile-card-item-value'>{user.email}</div>
                            <div className='profile-card-item-value'>{user.account_type}</div>
                            <Link className='profile-card-item-value' to="/change-password">Change</Link>
                        </div>
                    </div>
                    <div className='col-md-8 profile-image'>
                    </div>
                </div>
            </div>
        </div>
    </div>
      )
  )
}

export default Profile