import React, { useEffect, useState } from 'react'
import icon from '../../../images/ring.png'
import axios from 'axios'
import { Oval } from  'react-loader-spinner'


function Dashboard() {
 const[uploadFiles,setUploadFiles] = useState([])
 const[downloads,setDownloads] = useState([])
 const[totalFiles,setTotalFiles] = useState(0)
 const[totalDownloads,setTotalDownloads] = useState(0)
 const[earning,setEarning] = useState(0)
 const[balance,setBalance] =useState(0)
 const [is_loader,setIs_loader] = useState(true)

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
    const response = await axios.get('/user/dashboard',config)
    setUploadFiles(response.data.uploadfile)
    setDownloads(response.data.topdownloads)
    setTotalDownloads(response.data.totaldownloads)
    setTotalFiles(response.data.totalfile)
    setBalance(response.data.balance)
    setEarning(response.data.earning)
    console.log(response.data)
    setIs_loader(false)
    
  } catch (error) {
    console.log(error.request.response)
    setIs_loader(false)
  }
 }

 function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
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
    <div className="content-wrapper">
   <div class="dash-cards">
          <div class="dash-card-single yellow row">
            <div className='dash-icon yellow'>
             <img src={icon} className="img-fluid"/>
            </div>
            <div className='dash-item-container'>
              <div className='dash-item'>FILES</div>
              <div className='dash-item-value'>{totalFiles}</div>
            </div>
            <div>
            </div>
          </div>
    
          <div class="dash-card-single green row">
            <div className='dash-icon green'>
             <img src={icon} className="img-fluid"/>
            </div>
            <div className='dash-item-container'>
              <div className='dash-item'>DOWNLOADS</div>
              <div className='dash-item-value'>{totalDownloads}</div>
            </div>
            <div>
            </div>
          </div>
    
          <div class="dash-card-single blue row">
            <div className='dash-icon blue'>
             <img src={icon} className="img-fluid"/>
            </div>
            <div className='dash-item-container'>
              <div className='dash-item'>EARNING</div>
              <div className='dash-item-value'>${earning}</div>
            </div>
            <div>
            </div>
          </div>
    
          <div class="dash-card-single grey row">
            <div className='dash-icon grey'>
             <img src={icon} className="img-fluid"/>
            </div>
            <div className='dash-item-container'>
              <div className='dash-item'>BALANCE</div>
              <div className='dash-item-value'>${balance}</div>
            </div>
            <div>
            </div>
          </div>
        </div>
        <div className='table-card card'>
          <div className='card-body table-responsive'>
          <h3>Recent Upload</h3>
            <div className='table-div'>
            <table class="table">
              <thead class="">
                <tr>
                  <th scope="col">Filename</th>
                  <th scope="col">Filesize</th>
                  <th scope="col">Filetype</th>
                  <th scope="col">Date Added</th>
                  <th scope="col">Downloads</th>
                </tr>
              </thead>
              <tbody>
              {
                uploadFiles.map(file=>{
                  return(
                    <tr>
                  <td>{file.name}</td>
                  <td>{formatBytes(file.filesize)}</td>
                  <td>{file.filetype}</td>
                  <td>{file.filetime}</td>
                  <td>{file.download_counts}</td>
                </tr>
                  )
                })
              }
               
               
              </tbody>
            </table>
            </div>
          </div>
        </div>
        <div className='table-card card'>
          <div className='card-body table-responsive'>
          <h3>Top Download</h3>
            <div className='table-div'>
            <table class="table">
              <thead class="thead-light">
                <tr>
                
                  <th scope="col">Filename</th>
                  <th scope="col">Filesize</th>
                  <th scope="col">Filetype</th>
                  <th scope="col">Date Added</th>
                  <th scope="col">Downloads</th>
                </tr>
              </thead>
              <tbody>
              {
                downloads.map(file=>{
                  return(
                    <tr>
                  <td>{file.name}</td>
                  <td>{formatBytes(file.filesize)}</td>
                  <td>{file.filetype}</td>
                  <td>{file.filetime}</td>
                  <td>{file.download_counts}</td>
                </tr>
                  )
                })
              }
               
              </tbody>
            </table>
            </div>
          </div>
        </div>
    </div>
    )
  )
}

export default Dashboard