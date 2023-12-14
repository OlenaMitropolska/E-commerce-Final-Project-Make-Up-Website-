import { useAppContext } from '../context/appContext'

function Home() {
const {brands} = useAppContext()

  return (
    <div className='main'>
      <p>Home</p>
     {brands && brands.map (brand => 
      <div>{brand.brand}</div>
      )}

    
    </div>
  )
}

export default Home