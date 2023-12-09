import { useAppContext } from '../context/appContext'

function Home() {
const {dataRetriever} = useAppContext()

  return (
    <div className='main'>
      <p>Home</p>
      <button className='btn' onClick={dataRetriever}>get info</button>
    </div>
  )
}

export default Home