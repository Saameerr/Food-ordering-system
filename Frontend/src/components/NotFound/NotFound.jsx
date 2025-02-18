import React from 'react'
import { Link } from "react-router-dom";
import "./NotFound.css"; 

const NotFound = () => {
  return (
    <div className='image'>
    <img src="error.png" alt="no_photo" />
    <Link to="/" className='text'>Go to Home</Link>
    </div>
  )
}

export default NotFound