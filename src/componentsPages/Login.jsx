import React from 'react'

function Login() {
  return (
    <div className='main'>
      <form className='loginForm' action="">
      <input type="email" placeholder="Email" className="input input-bordered w-80" />
      <input type="password" placeholder="Password" className="input input-bordered w-80" />
      <button className='btn w-48' type='submit'>Login</button>
      </form>
    </div>
  )
}

export default Login