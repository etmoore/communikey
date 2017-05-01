import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => (
  <div className='text-center'>
    <h1>404 Page Not Found</h1>
    <Link to='/'><h2>Return Home</h2></Link>
  </div>
)

export default NotFound
