import React from 'react'

function Progress({file}) {
    function formatBytes(bytes, decimals = 2) {
        if (bytes === 0) return '0 Bytes';
    
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    
        const i = Math.floor(Math.log(bytes) / Math.log(k));
    
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }
  return (
    <div className='progress-card'>
                <div className='d-flex justify-content-between align-items-center mb-2'>
                <div className='progress-card-name'>{file.name}</div>
                <div className='progress-card-status'>
                {file.status=="progress"?(
                    <i class="fa-solid fa-spinner"></i>
                ):file.status=="error"?(
                    <i class="fa-solid fa-circle-xmark" style={{color:'red'}}></i>
                ):(
                    <i class="fa-solid fa-circle-check"></i>
                )}
                </div>
                </div>
                <div className='progress-bar'>
                    {file.status=="error"?(
                        <div className='progress-status' style={{'width':file.progress+'%','background':'red'}}></div>

                    ):(
                        <div className='progress-status' style={{'width':file.progress+'%'}}></div>

                    )}
                </div>
                <div className='d-flex justify-content-between align-items-center mt-2'>
                <div className='progress-card-size'> {formatBytes(file.size)}</div>
                <div className='progress-card-size' >{file.progress}%</div>
                </div>
                </div>
  )
}

export default Progress