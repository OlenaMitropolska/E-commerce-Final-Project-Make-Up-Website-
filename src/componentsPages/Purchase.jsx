import React from 'react'
import { Link } from 'react-router-dom'

function Purchase() {
  return (
    <div className="">


        <div className="overflow-x-auto p-3 purchaseMain">
        <h2 className='text-2xl uppercase self-start mb-2'>Purchase Method</h2>
  <table className="table">
    
    <tbody>
      
      <tr>
        <td><input type="checkbox" className="checkbox" /></td>
        <td>Paypal</td>
      </tr>
      
      <tr>
      <td><input type="checkbox" className="checkbox" /></td>
        <td>Credit Card</td>
      </tr>

    </tbody>
  </table>
  <div className='flex justify-center align-center p-4'><Link to={"/thankyou"}><button className='btn self-center'>Complete Purchase</button></Link> </div>
  </div>
</div>


  )
}

export default Purchase