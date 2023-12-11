import React from 'react'
import { useAppContext } from '../context/appContext'


function SearchInput() {
const {searchSubmitHandler} = useAppContext()

function searchHandler (e) {
e.preventDefault ()
const value = e.target.searchinput.value
const category = e.target.searchinput.value

searchSubmitHandler (value, category)
e.target.searchinput.value = ""
  }

  return (
    <div>
        <form onSubmit={searchHandler} className="flex justify-between input input-bordered input-md w-full max-w-xs search-input-form">
        <input type="text" name='searchinput' placeholder="What are you looking for?" className='order-none rounded-3xl input-nav'/>
            <button type='submit' className="text-2xl"><ion-icon name="search-outline"></ion-icon></button>
        </form>
    </div>
  )
}

export default SearchInput