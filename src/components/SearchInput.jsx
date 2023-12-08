import React from 'react'

function SearchInput() {
  return (
    <div>
        <form className="flex justify-between input input-bordered input-md w-full max-w-xs search-input-form">
        <input type="text" placeholder="What are you looking for?" className='order-none rounded-3xl input-nav'/>
            <button type='submit' class="text-2xl"><ion-icon name="search-outline"></ion-icon></button>
        </form>
    </div>
  )
}

export default SearchInput