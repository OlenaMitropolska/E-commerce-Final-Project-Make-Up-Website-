import React from 'react'
import { useAppContext } from '../context/appContext'


function SearchInput() {
const {submitHandler} = useAppContext()
  return (
    <div>
        <form onSubmit={submitHandler} className="flex justify-between input input-bordered input-md w-full max-w-xs search-input-form">
        <input type="text" id='searchinput' placeholder="What are you looking for?" className='order-none rounded-3xl input-nav'/>
            <button type='submit' className="text-2xl"><ion-icon name="search-outline"></ion-icon></button>
        </form>
    </div>
  )
}

export default SearchInput