import React from 'react'
import {Link,useNavigate,useLocation} from 'react-router-dom'
import $ from 'jquery'

function Sidebar(props) {

const navigate = useNavigate();


  function logout(e){
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/');
  }
   
  let sidebar = document.querySelector(".sidebar");
  let closeBtn = document.querySelector("#btn");
  let searchBtn = document.querySelector(".bx-search");


  function dashboard(){
    $('.sidebar').toggleClass("open");
    menuBtnChange();
  }
  
  // following are the code to change sidebar button(optional)
  function menuBtnChange() {
    if($('.sidebar').hasClass("open")){
      $('#btn').removeClass("fa-bars");
      $('#btn').addClass("fa-align-right")
    }else {
       $('#btn').removeClass("fa-align-right")
       $('#btn').addClass("fa-bars");
    }
   }



    return (
  <div class="sidebar">
  <div class="logo-details">
    <i class="fa fa-bandcamp icon" aria-hidden="true"></i>
      <div class="logo_name">Logo</div>
        <i class="fa fa-bars" id="btn" onClick={(e)=>dashboard(e)} aria-hidden="true"></i>
  </div>
  <ul class="nav-list">
    <li>
      <Link to="/dashboard">
        <i class="fa fa-th-large" aria-hidden="true"></i>
        <span class="links_name">Dashboard</span>
      </Link>
       <span class="tooltip">Dashboard</span>
    </li>
        <li>
     <Link to="/upload">
       <i class="fa fa-audio-description" aria-hidden="true"></i>
       <span class="links_name">Upload Files</span>
     </Link>
     <span class="tooltip">Upload Files</span>
   </li>
   <li>
   <Link to="/my-drive">
    <i class="fa fa-star" aria-hidden="true"></i>
     <span class="links_name">My Drive</span>
   </Link>
   <span class="tooltip">My Drive</span>
 </li>
   <li>
     <Link to="/profile">
      <i class="fa fa-th" aria-hidden="true"></i>
       <span class="links_name">Profile</span>
     </Link>
     <span class="tooltip">Profile</span>
   </li>

   <li>
     <Link to="/withdraw">
      <i class="fa fa-th" aria-hidden="true"></i>
       <span class="links_name">Withdraw</span>
     </Link>
     <span class="tooltip">Withdraw</span>
   </li>

   <li>
     <Link to="/transaction">
      <i class="fa fa-th" aria-hidden="true"></i>
       <span class="links_name">Transaction</span>
     </Link>
     <span class="tooltip">Transaction</span>
   </li>

   <li>
     <Link to="/admin/user-subscription">
      <i class="fa fa-th" aria-hidden="true"></i>
       <span class="links_name">Report</span>
     </Link>
     <span class="tooltip">Report</span>
   </li>
 
   <li class="profile">
       <div class="profile-details">
       <Link to="/admin/profile">
       <i class="fa fa-cog" aria-hidden="true"></i>

         <div class="name_job">
           <div class="name">user name</div>
           <div class="job">Admin</div>
         </div>
         </Link>
       </div>
       <i class="fa fa-sign-out" id ="log_out" onClick={()=>logout()} aria-hidden="true"></i>
   </li>
  </ul>
</div>

    )
}

export default Sidebar
