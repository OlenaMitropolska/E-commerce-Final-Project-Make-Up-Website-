import React from 'react'
import { Link } from 'react-router-dom'

export default function ThankYou() {
  return (
    <div className='thanks'>
<p>Your payment has been successfully received!</p>
<Link to={"/"}><button className='btn '>Back to Shopping</button></Link>
    </div>
  )
}
