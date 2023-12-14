import React from 'react'
import { Link } from 'react-router-dom'

function EmptyCart() {
  return (
    <div className='error'>
     <p>Oops... Seems like somehting went wrong</p>
        <Link to={"/"}><button className='btn '>Back to Main page</button></Link>
    </div>
  )
}

export default EmptyCart