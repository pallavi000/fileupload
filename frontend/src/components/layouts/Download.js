import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import download from '../../images//download.png'
import { Oval } from  'react-loader-spinner'


function Download(prop) {
  const[file,setFile] = useState({})
  const params = useParams()
    const [is_loader,setIs_loader] = useState(true)

  useEffect(() => {
  getFile()
  }, [])
  
async function getFile(){
  try {
    const response = await axios.get('/file/'+params.id)
    setIs_loader(false)
    setFile(response.data)
  } catch (error) {
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
    <div className='download-card card'>
        <div className='card-body download-body text-center'>
        <img src={download} className="img-fluid"/>

            
            <div className='row download-container'>
            <div>
                <div className='file-download-item'>Filename</div>
                <div className='file-download-item'>Filesize</div>
                </div>
                <div>
                <div className='file-download-item-value'>{file.name}</div>
                <div className='file-download-item-value'>{formatBytes(file.filesize)}</div>

                </div>
            </div>
            <a href={`http://localhost:5000/api/file/download/${file._id}`} className='file-download-btn'>DOWNLOAD</a>

        </div>
    </div>

   </div>
    )
  )
}

export default Download