import React from 'react'
import {Link} from 'react-router-dom'
import Sidebar from './Sidebar'

function Header() {
  return (
    localStorage.getItem('token')?(
      <Sidebar/>
    ):(
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <a class="navbar-brand" href="#">LOGO</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <a class="nav-link" href="#">Home</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Premium</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">About</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Contact</a>
      </li>
      
     
    </ul>
   
      <Link class="btn btn-outline-success my-2 my-sm-0 btn-login" type="submit" to="/sign-in">Login</Link>
      <Link className='btn btn-primary btn-register' to="/sign-up">Register</Link>
  </div>
</nav>
    )
     
 
  )
}

export default Header