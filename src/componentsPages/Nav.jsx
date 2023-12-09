import React from 'react'
import { Link } from 'react-router-dom'
import SearchInput from '../components/SearchInput'

function Nav() {
  return (
    <div>
        <div className="navbar bg-base-100">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
      </div>
      <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
        <li><a>Face Products</a></li>
        <li><a>Eye Products</a></li>
        <li><a>Lip Products</a></li>
        <li><a>Nail Polishes (NEW!)</a></li>

      </ul>
    </div>
    <Link to={"/"}><a className="btn btn-ghost text-xl">ESSENTIALIST</a></Link>
  </div>
 {/* hidden part */}
  <div className="navbar-center hidden lg:flex">
  <div className='search-input'><SearchInput/></div> 
  </div>
  <div className="navbar-end gap-1">
    <Link to={'/favoritespage'}><a className="text-2xl"><ion-icon name="heart-outline"></ion-icon></a></Link>
    <Link to={'/loginpage'}><a className="text-2xl"><ion-icon name="person-outline"></ion-icon></a></Link>
    <Link to={'/cart' }><a className="text-2xl"><ion-icon name="bag-outline"></ion-icon></a></Link>
  </div>


</div>
<div className='sub-nav'><SearchInput/></div>
    </div>
  )
}

export default Nav