import axios from 'axios'
import React, { useEffect, useState } from 'react'

function Transaction() {
  const[transactions,setTransactions] = useState([])

  useEffect(()=>{
getData()
  },[])

  const config = {
    headers:{
      'access-token':localStorage.getItem('token')
    }
   }

  async function getData(){
    try {
      const transactions = await axios.get('/withdraw',config)
      setTransactions(transactions.data)
      
    } catch (error) {
      console.log(error.request.response)
    }
  }





  return (
    <div className='content-wrapper'>
<div className='table-card card'>
          <div className='card-body table-responsive'>
          <div className='row justify-content-between align-items-center'>
          <h3>Transaction History</h3>
            
          </div>
            <div className='table-div'>
            <table class="table">
              <thead class="">
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Date</th>
                  <th scope="col">Status</th>
                  <th scope="col">Type</th>
                  <th scope="col">Amount($)</th>
                </tr>
              </thead>
              <tbody>
              {transactions.map(transaction=>{
                return(
                  <tr>
                  <td>{transaction._id}</td>
                  <td>{transaction.pdate}</td>
                  {transaction.status=="pending"?(
                    <td> <div className="file-status pending">{transaction.status}</div></td>

                  ):transaction.status=="completed"?(
                    <td> <div className="file-status active">{transaction.status}</div></td>
                  ):(
                    <td> <div className="file-status cancel">{transaction.status}</div></td>

                  )}
                  <td>{transaction.type}</td>
                  
                  <td>${transaction.totalwithdraw}</td>
                </tr>
                )
              })}
                
               
                
              </tbody>
            </table>
            </div>
          </div>
        </div>


    </div>
  )
}

export default Transaction