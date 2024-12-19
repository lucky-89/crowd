import React from 'react'
import '../App.css';
import { useNavigate } from 'react-router-dom';

import video from '../assets/v1.mp4';

const BackgroundVideo = () => {
    const navigate=useNavigate();
  return (
    <div>
       <div className="video-container">
      <video autoPlay loop muted className="background-video">
        <source src={video} />
        
      </video>
      <div className="content">
        <h1>Welcome to My Website</h1>
    <div className='flex justify-center my-20'>
            <button className='px-6 py-1 text-lg bg-gray-900 rounded'>Earn Money</button>
            <button className=' mx-4 px-2 py-1 text-lg bg-gray-900 rounded' onClick={()=>navigate('/campaign')}>Start Campaign</button>
        </div>
      </div>
    </div>
    </div>
  )
}

export default BackgroundVideo
