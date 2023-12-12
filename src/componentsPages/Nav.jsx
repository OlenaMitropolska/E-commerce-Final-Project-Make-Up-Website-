import React from 'react'
import { Link } from 'react-router-dom'
import SearchInput from '../components/SearchInput'
import { useAppContext } from '../context/appContext'

function Nav() {

  const {categoriesSearchHandler} = useAppContext()

  const navElements = [
    {
      name: "Face Products",
      items: [
        "Foundation", "Bronzer", "Blush"
      ]
    },
    {
      name: "Eye Products",
      items: [
        "Eyeliner", "Eyeshadow", "Mascara", "Eyebrow"
      ]
    },
    {
      name: "Lip Products",
      items: [
        "Lip Liner", "Lipstick"
      ]
    },
    {
      name: "Nail Polishes (NEW!)",
      items: [
        "Nail polish"
      ]
    }
  ]

  function categoryHandler (e) {
    console.log(e.target.textContent)
    const categorySearch = e.target.textContent

    categoriesSearchHandler (categorySearch)
  }


  return (
    <div>
        <div className="navbar bg-base-100">
  <div className="navbar-start">
    <button></button>
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
      </div>
      <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
        {navElements.map((ele, p) =>
           <li key={p}>
           <button>{ele.name}</button>
           <ul className="p-2">
            {ele.items.map((cat, j) => <li key={j} ><button onClick={categoryHandler}>{cat}</button></li>)}
          </ul>
         </li> )}
      </ul>
    </div>
    <Link to={"/"}><button className="btn btn-ghost text-xl">ESSENTIALIST</button></Link>
  </div>

 {/* hidden part */}
  <div className="navbar-center hidden lg:flex">
  <div className='search-input'><SearchInput/></div> 
  </div>
  <div className="navbar-end gap-1">
    <Link to={'/favoritespage'}><button className="text-2xl"><ion-icon name="heart-outline"></ion-icon></button></Link>
    <Link to={'/loginpage'}><button className="text-2xl"><ion-icon name="person-outline"></ion-icon></button></Link>
    <Link to={'/cart' }><button className="text-2xl"><ion-icon name="bag-outline"></ion-icon></button></Link>
  </div>

</div>
<div className='sub-nav'><SearchInput/></div>

{/* hidden for phone and tablet categories */}
<div className="navbar-center hidden lg:flex">
      <ul className="menu menu-horizontal w-full flex justify-center align-center">
      {navElements.map((ele,p) =>
           <li key={p}>
            <details close>
            <summary>{ele.name}</summary>
           <ul className="p-2">
            {ele.items.map((cat,j) => <li key={j} ><button onClick={categoryHandler}>{cat}</button></li>)}
          </ul>
          </details>
         </li> )}

        
</ul>
  </div>
    </div>
  )
}

export default Nav