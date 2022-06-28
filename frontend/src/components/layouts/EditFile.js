import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Oval } from  'react-loader-spinner'
import * as toastr from 'toastr';
import '../../../node_modules/toastr/build/toastr.css'


function EditFile() {
    const [name,setName] =useState('')
    const [file,setFile] = useState({})
    const params=useParams()
    const navigate = useNavigate()
    const [is_loader,setIs_loader] = useState(true)
    


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
            const response = await axios.get('/file/'+params.id,config)
            console.log(response.data)
            setFile(response.data)
            setName(response.data.name)
            setIs_loader(false)

           
        } catch (error) {
            console.log(error.request.response)
            setIs_loader(false)
        }
    }
    

    async function file_edit(e){
        e.preventDefault()
        try {
            const data={
                name
            }
            const response = await axios.put('/file/'+params.id,data,config)
            console.log(response.data)
            toastr.success('Success !!')
            navigate(-1)

        } catch (error) {
            console.log(error.request.response)
            toastr.error(error.request.response,'Error')
        }
    
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
    <div className='content-wrapper '>
    <div className='login-section bg-transparent row align-items-start'>
    <div className='col-md-6 col-sm-12'>
    <div className='card login-card'>
            <div className='card-body'>
                <div className='login-header'>Edit File</div>
                <form onSubmit={(e)=>file_edit(e)}>
                    <div className='form-group d-flex'>
                        <input type="text" class="username" onChange={(e)=>setName(e.target.value)} placeholder="Name" defaultValue={file.name} required/>
                        <i class="fa-solid fa-envelope loginicon"></i>
                    </div>
                    <button className='btn-signin' type="submit">Update</button>

                    </form>
                    </div>
                    </div>
                    </div>
                    </div>
                    </div>
                    
  )
  )
}

export default EditFile