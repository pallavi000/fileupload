import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Pagination from "react-js-pagination";


function FileUpload() {
  const [files,setFiles] = useState([])
  const call = useRef()

  const[pageno,setPageno] = useState(1)
  const[itemsCountPerPage,setItemCountPerPage] = useState(12)
  const[totalItemsCount,setTotalItemsCount] = useState(0)


  function paginate(pageno){
      setPageno(pageno)
  }


  const config={
    headers:{
        'access-token':localStorage.getItem('token')
    }
}

useEffect(() => {
  getFile()
 
}, [pageno])


async function getFile(){
  try {
    const data={
      pageno,
      itemsCountPerPage
  }
    const response = await axios.post('/file',data,config)
    console.log(response.data.files)
    setFiles(response.data.files)
    
    setTotalItemsCount(response.data.totalitems)

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


async function search(e){
  if(call.current){
      clearTimeout(call.current)
  }

  call.current= setTimeout(async() => {
    try {
      const data={
        input:e.target.value
      }

      const response = await axios.post('/file/search',data,config)
        console.log(response.data)
      setFiles(response.data)
    } catch (error) {
      console.log(error.request.response)
    }
  }, 2000);

}


  return (
    <div className='content-wrapper'>
<div className='table-card card'>
          <div className='card-body table-responsive'>
          <div className='row justify-content-between align-items-center'>
          <h3>Files</h3>
            <div className='row'>
                <div className='file-search-box'>
                <i class="fa-solid fa-magnifying-glass"></i> <input type="text" onChange={(e)=>search(e)} placeholder='Search by name...'></input>
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
          <div className='d-flex justify-content-end mr-4'>

         
<Pagination
activePage={pageno}
itemsCountPerPage={itemsCountPerPage}
totalItemsCount={totalItemsCount}
pageRangeDisplayed={5}
onChange={(e)=>paginate(e)}
itemClass="page-item"
linkClass="page-link"
/>
</div>
        </div>
       

    </div>
  )
}

export default FileUpload