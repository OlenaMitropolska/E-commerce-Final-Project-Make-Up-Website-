import React, { useState } from 'react'
import { useAppContext } from '../context/appContext'


function Registration() {
  const {RegisterUser}= useAppContext()

  const [name,setName] =useState("")
  const [email,setEmail] =useState("")
  const [password,setPassword] = useState("")

function registrationHandler (e) {
  e.preventDefault()

setName(e.target.registerName.value)
setEmail(e.target.registerEmail.value)
setPassword(e.target.registerPassword.value)

RegisterUser(name,email,password)
}

// only works with 2nd submit


// function submitHandler (e) {
// const name = e.target.name.value

// RegisterUser(name,email,pass) //to receive in appContext 
// }

//context does not see and event, not a component so do function in component and call context just to get the data from there
//do if logged in then navigate smth like that later
  return (
    <div className='registerPage'>
<h2>Create an Account</h2>

<form onSubmit={(e)=>registrationHandler(e)} className='registrationForm' action="">

<span className=" label label-text">*Full Name</span>
<input type="text"className="input input-bordered w-full max-w-xs" name='registerName' />

<span className=" label label-text">*Email address</span>
<input type="email" className="input input-bordered w-full max-w-xs" name='registerEmail' />

<span className="label label-text">*Password</span>
<input type="password"className="input input-bordered w-full max-w-xs" name='registerPassword' />

<button className='btn mt-2.5 px-8' type='submit'>Register</button>
</form>



    </div>
  )
}

export default Registration