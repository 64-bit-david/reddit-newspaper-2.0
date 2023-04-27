import React from 'react'

const SubHeader: React.FC = () => {





    const getDate = () => {

        const today = new Date();
        const dd = today.getDay();
        const dofm = today.getDate();
        const mm = today.getMonth();
        const yyyy = today.getFullYear();
    
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    
        const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    
        const daysOfMonth = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
    
        const date = `${days[dd]} ${months[mm]} ${daysOfMonth[dofm]} ${yyyy}`
    
        return date;
      }
      
      
 
    
    

  return (
    <div className='sub-header'>
        <div className='date-container'>
        {getDate()}
        </div>
        <div className='weather-container'>
            <p>22deg</p>
        </div>
    </div>
  )
}

export default SubHeader