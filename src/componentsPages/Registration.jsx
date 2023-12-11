import React from 'react'

function Registration() {
  return (
    <div className='main'>
<h2>Create an Account</h2>
<form action="">

<span className=" label label-text">*Full Name</span>
<input type="text" className="input input-bordered w-full max-w-xs" />

<span className=" label label-text">*Email address</span>
<input type="email" className="input input-bordered w-full max-w-xs" />

<span className="label label-text">*Password</span>
<input type="password" className="input input-bordered w-full max-w-xs" />

<button className='btn mt-2.5 px-8' type='submit'>Register</button>
</form>

{/* <input type="text" placeholder="full name" className="input input-bordered w-full max-w-xs" />
<input type="email" placeholder="email" className="input input-bordered w-full max-w-xs" /> */}



    </div>
  )
}

export default Registration