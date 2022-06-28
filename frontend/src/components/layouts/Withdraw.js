import axios from 'axios'
import React, { useEffect, useState } from 'react'
import * as toastr from 'toastr';
import '../../../node_modules/toastr/build/toastr.css'

function Withdraw() {
    const[amount,setAmount]= useState(0)
    const[type,setType] = useState('')
    const[email,setEmail] = useState('')
    const[balance,setBalance] = useState(0)

    const config={
        headers:{
            'access-token':localStorage.getItem('token')
        }
    }

    async function submitWithdraw(e){
        e.preventDefault()
        if(amount>balance){
            toastr.error('Amount can not be greater than Balance')
            return false
        }
        try {
            const data={
                balance,
                amount,
                type,
                email
            }
            const response = await axios.post('/withdraw',data,config)
            console.log(response.data)
            toastr.success('Success')
            
        } catch (error) {
            console.log(error.request.response)
            toastr.error(error.request.response,'Error')
        }
    }

    useEffect(() => {
     getBalance()
    }, [])

   async function getBalance(){
        try {
            const response= await axios.get('/withdraw/current',config)
            console.log(response.data)
            setBalance(response.data)
        } catch (error) {
            console.log(error.request.response)
        }
    }
   


  return (
  <div className='content-wrapper '>
    <div className='login-section bg-transparent row align-items-start'>
    <div className='col-md-6 col-sm-12'>
    <div className='card login-card'>
            <div className='card-body'>
                <div className='login-header'>Withdraw (${balance})</div>
                <form onSubmit={(e)=>submitWithdraw(e)}>
                    <div className='form-group d-flex'>
                        <input type="text" class="username" onChange={(e)=>setAmount(e.target.value)} placeholder="Amount" required/>
                        <i class="fa-solid fa-envelope loginicon"></i>
                    </div>
                    <div className='form-group d-flex'>
                        <input type="text" class="username" onChange={(e)=>setType(e.target.value)} placeholder="Type" required/>
                        <i class="fa-solid fa-eye-slash loginicon"></i>
                    </div>
                    <div className='form-group d-flex'>
                        <input type="email" class="username" onChange={(e)=>setEmail(e.target.value)} placeholder="Email" required/>
                        <i class="fa-solid fa-eye-slash loginicon"></i>
                    </div>

                    <button className='btn-signin' type="submit">SUBMIT</button>
                </form>
            </div>
        </div>
    </div>
    <div className='col-md-6 col-sm-12'>
        <div className='card login-card text-left'>
        <div className='card-body'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
            molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
            numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
            optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis
            obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam
            nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit,
            tenetur error, harum nesciunt ipsum debitis quas aliquid. Reprehenderit,
            quia. Quo neque error repudiandae fuga? Ipsa laudantium molestias eos 
            sapiente officiis modi at sunt excepturi expedita sint? Sed quibusdam
            recusandae alias error harum maxime adipisci amet laborum. Perspiciatis 
            minima nesciunt dolorem! Officiis iure rerum voluptates a cumque velit 
            quibusdam sed amet tempora. Sit laborum ab, eius fugit doloribus tenetur 

        </div>
        </div>
    </div>
        
    </div>
  </div>
  )
}

export default Withdraw