import React, { useEffect } from 'react'
import { useAppContext } from '../context/appContext'
import { Link } from 'react-router-dom'


function Profile() {
    const {getProfileInfo,userInfo, LoggedinOrNot} = useAppContext()
    useEffect(() => {
      LoggedinOrNot ()
      getProfileInfo () 
    }, [])
    
  return (
    <div className='profileMain flex flex-col p-4'>
      
      <h2 className='text-xl pb-6'>Welcome back, {userInfo && userInfo.name}</h2>
      <h3 className='font-bold'>My address</h3>
      <p>{userInfo && userInfo.name}</p>
      <p>{userInfo && userInfo.Street}</p>
      <p>{userInfo && userInfo.Postcode} {userInfo && userInfo.City}</p>
      <Link className='self-center' to={"/"}><button className='btn'>Home Page</button></Link>

    </div>
  )
}

export default Profile