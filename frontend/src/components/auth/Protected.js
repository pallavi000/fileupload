import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

function Protected(props) {
    const navigate = useNavigate()
    useEffect(() => {
      if(localStorage.getItem('token')){

      }else{
        navigate('/sign-in')
      }
    }, [props])
    
  return (
  
    <Outlet/>

  )
}

export default Protected