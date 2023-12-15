import { useEffect } from 'react'
import { useAppContext } from '../context/appContext'

function Home() {
const {brands,displayBrands,seeBrand} = useAppContext()
useEffect(() => {
displayBrands() 
}, [])


  return (
    <div className='brands'>
      <h2 className='text-lg uppercase'>Our brand selection</h2>

      <div>{brands && brands.map ((brand,k)=> 
      <div onClick={() => seeBrand(brand)} className='brandsMap' key={k}>{brand}</div>
      )}
      </div>

    
    </div>
  )
}

export default Home