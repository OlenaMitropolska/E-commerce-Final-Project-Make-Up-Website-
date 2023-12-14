import { useEffect } from 'react'
import { useAppContext } from '../context/appContext'

function Home() {
const {brands,displayBrands } = useAppContext()
useEffect(() => {
displayBrands() 

}, [])


  return (
    <div className='main'>
      {/* <p>Home</p>
     {brands && brands.map (brand => 
      <div>{brand.brand}</div>
      )} */}

    
    </div>
  )
}

export default Home