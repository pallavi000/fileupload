import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function FileUpload() {
  const [files,setFiles] = useState([])


  const config={
    headers:{
        'access-token':localStorage.getItem('token')
    }
}

useEffect(() => {
  getFile()
 
}, [])

async function getFile(){
  try {
    const response = await axios.get('/file',config)
    console.log(response.data)
    setFiles(response.data)
  } catch (error) {
    console.log(error.request.response)
  }
}

async function distroy(id){
  try {
    const response = await axios.delete('/file/'+id,config)
    console.log(response.data)
    const newfile = files.filter(file=>file._id!=id)
    setFiles(newfile)
  } catch (error) {
    console.log(error.request.response)
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
    <div className='content-wrapper'>
<div className='table-card card'>
          <div className='card-body table-responsive'>
          <div className='row justify-content-between align-items-center'>
          <h3>Files</h3>
            <div className='row'>
                <div className='file-search-box'>
                <i class="fa-solid fa-magnifying-glass"></i> <input type="text" placeholder='Search by name...'></input>
                </div>
                <Link className='btn-upload-file' to="/upload">Upload File</Link>
            </div>
          </div>
            <div className='table-div'>
            <table class="table">
              <thead class="">
                <tr>
                  <th scope="col">Filename</th>
                  <th scope="col">Filesize</th>
                  <th scope="col">Filetype</th>
                  <th scope="col">Date Added</th>
                  <th scope="col">Action</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
              {files.map(file=>{
                return(
                  <tr>
                  <td>
                  <Link to={`/download/${file._id}`}> {file.name}</Link>
                 </td>
                  <td>{formatBytes(file.filesize)}</td>
                  <td className='text-capitalize'>{file.filetype}</td>
                  <td>{file.filetime}</td>
                  <td>
                  <Link to={`/edit-file/${file._id}`} ><i class="fa-solid fa-pen-to-square"></i></Link> <i class="fa-solid fa-trash-can" onClick={(e)=>distroy(e,file._id)}></i>
                  </td>
                  <td className='file-status '>
                  <div className="file-status active">Active</div></td>
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

export default FileUpload