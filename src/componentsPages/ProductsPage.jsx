import { useAppContext } from '../context/appContext'

function ProductsPage() {
    const {dataRetriever} = useAppContext()
    const {products} = useAppContext()
  return (
    <div className='main'>ProductsPage
        <button className='btn' onClick={dataRetriever}>get info</button>
{products && products.map((product, j) => <div key={j} className='products_main'>{product.name}</div>)}
    
    </div>
  )
}

export default ProductsPage