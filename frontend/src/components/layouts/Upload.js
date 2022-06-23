import axios from 'axios'
import React, { useRef, useState } from 'react'
import upload from '../../images/upload.png'
import $ from 'jquery'
import FileUploadProgress  from 'react-fileupload-progress'
import Progress from '../ui/Progress'

function Upload() {
    const[file,setFile] = useState('')
    const formRef= useRef()
    const[fileList,setFileList] = useState([])


   

    async function uploadfile(e){
        e.preventDefault()
        try {
            const data = new FormData()
            for (const f of file ) {
                data.append('file',f)
            }
        
            const config={
                headers:{
                    'access-token':localStorage.getItem('token')
                },
                onUploadProgress: (e) => updateProgress(e)
            }
            const response = await axios.post('/file/upload',data, config)
            transferComplete()

            // var oReq = new XMLHttpRequest();
            // oReq.addEventListener("error", transferFailed);
            // oReq.addEventListener("load", transferComplete);
            // oReq.open('POST','http://localhost:5000/api/file/upload', true);
            // oReq.setRequestHeader("access-token",localStorage.getItem('token'))
            // oReq.upload.onprogress = updateProgress(e)
            // oReq.send(data); 
        } catch (error) {
            console.log(error.message)
            var newFileList = [...fileList]
            for (const file of newFileList) {
                file.status="error"
                file.progress=100
                
                
            }
            setFileList(newFileList)

        }
    }



    function updateProgress(e){
        var newFileList = [...fileList]
        var total=0
      
        for (const file of newFileList) {
            total+=file.size
           if(e.loaded<total){
            file.progress = (e.loaded-(total-file.size))/file.size*100
           } else {
            file.progress = 100
           } 
        }
        setFileList(newFileList)
    }

   
    function transferComplete(){
        
        var newFileList = [...fileList]
        for (const file of newFileList) {
            file.status="completed"
        }
        setFileList(newFileList)
    }



    

    function fileset(e){
        e.preventDefault()

        
        var arr =  []
        for (const file of e.target.files) {
            file.status="progress"
            file.progress = 0
            arr.push(file)
            console.log(file)
        }
        setFileList(arr)
       
        setFile(e.target.files)
        setTimeout(()=>{
            formRef.current.click()
        },1000)
    }



    function beforeSend(request){
        request.setRequestHeader('access-token',localStorage.getItem('token'))
        return request
        console.log(request)
        
    }



  return (
    <div className='content-wrapper'>
        <div className='row align-items-center justify-content-between'>
        <div className={`${fileList&& fileList.length!=0?'col-md-4':'col-md-8  mx-auto'} card upload-card`}>
        <div className='card-body text-center'>
        <form onSubmit={(e)=>uploadfile(e)}>
                <div className='upload-img'>
                    <img src={upload} className="img-fluid"/>
                </div>
                <div className='upload-content'>Drag and drop files to upload</div>
                <div className='upload-or'>OR</div>
                <div className='upload-browse'>
                <label for="browse-file" type="submit" className="upload-browse-file">Browse</label>
                    <input type="file" id="browse-file" className='d-none' multiple onChange={(e)=>fileset(e)} />
                </div>
                <button ref={formRef} type="submit" className='d-none'>Submit</button>
                </form>
        </div>

        </div>
        {fileList && fileList.length!=0?(
            <div className='col-md-8'>
            <div className='card upload-progress-card'>
                <div className='card-body'>
                {fileList.map(file=>{
                    return(
                        <>
                       <Progress file={file}/>
                        </>
                    )
                })}
                
                
                </div>
            </div>
        </div>
        ):(null)}
        

        </div>
    </div>
  )
}

export default Upload