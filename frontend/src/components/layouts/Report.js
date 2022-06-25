import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import * as echarts from 'echarts';
import Pagination from "react-js-pagination";



function Report() {
    const[files,setFiles] = useState([])
    const [data,setData] = useState([])
    const[revenue,setRevenue] = useState([])
    const[input,setInput] = useState('')
    const call = useRef()

    const[pageno,setPageno] = useState(1)
    const[itemsCountPerPage,setItemCountPerPage] = useState(12)
    const[totalItemsCount,setTotalItemsCount] = useState(0)


    function paginate(pageno){
        setPageno(pageno)
    }


    useEffect(() => {
        getData()
       }, [pageno])
   

    const config = {
        headers:{
          'access-token':localStorage.getItem('token')
        }
       }

   async  function getData(){
        try {
            const data={
                pageno,
                itemsCountPerPage
            }
            const response = await axios.post('/file/report/generate',data,config)
            setFiles(response.data.files)
            setTotalItemsCount(response.data.totalitems)
            
            var arr=[]
            for (const file of response.data.topdownload) {
                arr.push(
                    {'value':file.download_counts,'name':file.name}
                )
            }
            setData(arr)
            var newarr=[]
            for (const rev of response.data.toprevenue) {
                newarr.push({'value':rev.revenue,'name':rev.name})
            }
            setRevenue(newarr)
          
            
        } catch (error) {
            console.log(error.request.response)
        }
    }
    
// change storage format
    function formatBytes(bytes, decimals = 2) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
      
        const i = Math.floor(Math.log(bytes) / Math.log(k));
      
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
      }


// piechart

useEffect(()=>{
    makepiechart()
    revenue_piechart()
    },[data,revenue])
    

function makepiechart(){
 var chartDom = document.querySelector('.pichart-container');
var myChart = echarts.init(chartDom);
var option;

option = {
  title: {
    text: 'Top Downloads',
    subtext: '',
    left: 'center'
  },
  tooltip: {
    trigger: 'item'
  },
  legend: {
    orient: 'vertical',
    left: 'left',
    show:false
  },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: '50%',
      data: data,
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
};

option && myChart.setOption(option);

}


function revenue_piechart(){

var chartDom = document.querySelector('.piechart-revenue');
var myChart = echarts.init(chartDom);
var option;

option = {
  tooltip: {
    trigger: 'item'
  },
  legend: {
    show: false,
    top: '95%',
    left: 'center'
  },
  title: {
    text: 'Top Revenues',
    subtext: '',
    left: 'center'
  },

  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: ['40%', '70%'],
      avoidLabelOverlap: false,
      label: {
        show: false,
        position: 'center'
      },
      emphasis: {
        label: {
          show: true,
          fontSize: '40',
          fontWeight: 'bold'
        }
      },
      labelLine: {
        show: false
      },
      data: revenue
    }
  ]
};

option && myChart.setOption(option);
}



async  function search(e){
    if(call.current) {
        clearTimeout(call.current)
    }
    call.current = setTimeout(async ()=>{
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
    },2000)
}





      
  return (
    <div className='content-wrapper'>
    <div className='row'>
    <div className='col-md-6 col-sm-12'>
        <div className='card login-card text-left'>
        <div className='card-body'>
        <div className='pichart-container' style={{'height':'200px'}}></div>
        </div>
        </div>
    </div>

    <div className='col-md-6 col-sm-12'>
        <div className='card login-card text-left'>
        <div className='card-body'>
        <div className='piechart-revenue' style={{height:'200px'}}></div>

        </div>
        </div>
    </div>
        
    </div>
        <div className='table-card card'>
          <div className='card-body table-responsive'>
          <div className='row justify-content-between align-items-center'>
          <h3>Reports</h3>
            <div className='row'>
            <form>
                <div className='file-search-box'>
                <i class="fa-solid fa-magnifying-glass"></i> <input type="text" onChange={(e)=>search(e)} placeholder='Search by name...'></input>
                </div>
                </form>
            </div>
          </div>
            <div className='table-div'>
            <table class="table">
              <thead class="">
                <tr>
                  <th scope="col">Filename</th>
                  <th scope="col">Filesize</th>
                  <th scope="col">Filetype</th>
                  <th scope="col">Total Downloads</th>
                  <th scope="col">Total Revenue</th>
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
                  <td>{file.download_counts}</td>
                  <td>
                  {file.revenue}
                  </td>
                 
                </tr>
                )
              })}
              <tr className='tr-green'>
                <td>Total Earning</td>
                <td>20Mb</td>
                <td></td>
                <td>234567</td>
                <td>$200</td>
              </tr>
              <tr className='tr-red'>
                <td>Total Withdraw</td>
                <td></td>
                <td></td>
                <td></td>
                <td>$200</td>
              </tr>
              <tr className='tr-green'>
                <td>Remaining Balance</td>
                <td></td>
                <td></td>
                <td></td>
                <td>$200</td>
              </tr>

                
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

export default Report