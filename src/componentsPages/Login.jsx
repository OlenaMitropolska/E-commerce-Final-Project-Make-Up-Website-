import React, { useEffect } from 'react'
import { useAppContext } from '../context/appContext'
import { Link } from 'react-router-dom'

function Login() {
  const {LoginUser, LoggedinOrNot} = useAppContext ()
  useEffect(() => {
    LoggedinOrNot ()
  }, [])

  function loginHandler (e) {
    e.preventDefault()
    const loginEmail = e.target.loginEmail.value
    const loginPassword = e.target.loginPassword.value

    LoginUser (loginEmail,loginPassword )
  }
  return (
    <div className='main'>
      <div className='mainLogin'>
      <form onSubmit={(e) => loginHandler (e)} className='loginForm' action="">
      <h2>Login</h2>
      <input name='loginEmail' type="email" placeholder="Email" className="input input-bordered w-80" />
      <input name='loginPassword' type="password" placeholder="Password" className="input input-bordered w-80" />
      <button className='btn w-48' type='submit'>Login</button>
      </form>
     <p>Don't have an account yet? <Link to={"/register"}><span className='underline decoration-solid'>Register</span></Link></p>
     </div>

    </div>
  )
}

export default Login