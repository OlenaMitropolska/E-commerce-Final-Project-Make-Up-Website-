import React, { useEffect} from 'react'
import { useAppContext } from '../context/appContext'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Registration() {
  const {RegisterUser,LoggedinOrNot}= useAppContext()

  useEffect(() => {
    LoggedinOrNot ()
  }, [])

function registrationHandler (e) {
  e.preventDefault()
  const name = e.target.registerName.value
  const email = e.target.registerEmail.value
  const password = e.target.registerPassword.value
  const dateBirth = e.target.registerDateofBirth.value
  const city = e.target.registerCity.value
  const address = e.target.registerAddress.value
  const postcode = e.target.registerPostcode.value

RegisterUser(name,email,password, dateBirth,city,address, postcode)
}

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

<span className="label label-text">*Date of birth</span>
<input type="date"className="input input-bordered w-full max-w-xs" name='registerDateofBirth' />

<span className="label label-text">*City</span>
<input type="text"className="input input-bordered w-full max-w-xs" name='registerCity' />

<span className="label label-text">*Address</span>
<input type="text"className="input input-bordered w-full max-w-xs" name='registerAddress' />

<span className="label label-text">*Postcode</span>
<input type="number"className="input input-bordered w-full max-w-xs" name='registerPostcode' />

<button className='btn mt-2.5 px-8' type='submit'>Register</button>

</form>

        <ToastContainer />
        {/* special alert instead of toast? */}
{/* 
<div role="alert" className="alert alert-success">
  <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
  <span>Your purchase has been confirmed!</span>
</div> */} 


    </div>
  )
}

export default Registration