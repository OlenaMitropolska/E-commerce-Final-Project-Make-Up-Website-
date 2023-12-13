import React from 'react'
import { useAppContext } from '../context/appContext'
import { Link } from 'react-router-dom'

function Login() {
  const {LoginUser} = useAppContext ()

  function loginHandler (e) {
    e.preventDefault()
    const loginEmail = e.target.loginEmail.value
    const loginPassword = e.target.loginPassword.value

    LoginUser (loginEmail,loginPassword )
  }
  return (
    <div className='main'>
      <form onSubmit={(e) => loginHandler (e)} className='loginForm' action="">
      <h2>Login</h2>
      <input name='loginEmail' type="email" placeholder="Email" className="input input-bordered w-80" />
      <input name='loginPassword' type="password" placeholder="Password" className="input input-bordered w-80" />
      <button className='btn w-48' type='submit'>Login</button>
     <Link to={"/register"}> <p>Don't have an account yet? <span className='underline decoration-solid'>Register</span> </p> </Link>
      </form>
    
    </div>
  )
}

export default Login