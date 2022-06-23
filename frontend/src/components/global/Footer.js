import React from 'react'
import img1 from '../../images/footerimg.png'

function Footer() {
  return (
    localStorage.getItem('token')?(
    null
    ):(
    <div className='footer-section'>
    <div className='row footer-component'>
        <div className='col-md-6 footer-col'>
        <div className='text-left'>
            <div className='footer-header'><i class="fa-solid fa-circle-info mr-2"></i>Information</div>
            <div className='footer-link'>News</div>
            <div className='footer-link'>Bugs</div>
            <div className='footer-link'>FAQ</div>
            <div className='footer-link'>Payments</div>
            </div>
        </div>
        <div className='col-md-6 footer-col'>
        <div className='text-left'>
            <div className='footer-header'><img src={img1} className="img-fluid mr-2"/>Contacts & Aggrements</div>
            <div className='footer-link'>Contact Us</div>
            <div className='footer-link'>Report</div>
            <div className='footer-link'>Privacy Policy</div>
            <div className='footer-link'>Terms Of Service</div>
            </div>
        </div>
      
    </div>
  
    <div className='copyright'>Copyright © 2022 Logo</div>
</div>)
    
  )
}

export default Footer