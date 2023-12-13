import React from 'react'
import { useAppContext } from '../context/appContext'
import { Link } from 'react-router-dom'


function Profile() {
    const {getProfileInfo,userInfo} = useAppContext()
  return (
    <div className='profileMain flex flex-col p-4'>
        {userInfo && userInfo.map((info, p) =>
        <div className='flex flex-col profileInfo' key={p}>
            <h2 className='text-xl pb-6'>Welcome back, {info.name}</h2>
            <h3 className='font-bold'>My address</h3>
            <p>{info.name}</p>
            <p>{info.Street}</p>
            <p>{info.Postcode} {info.City}</p>
            <Link className='self-center' to={"/"}><button className='btn'>Home Page</button></Link>
        </div>
            
            )}



        {/* <button className='btn' onClick={getProfileInfo}>Get profile info</button> */}
    </div>
  )
}

export default Profile