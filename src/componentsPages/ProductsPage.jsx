import { useAppContext } from '../context/appContext'


function ProductsPage() {
    const {dataRetriever} = useAppContext()
    const {products} = useAppContext()
  return (
    <div className='main'>ProductsPage
        <button className='btn' onClick={dataRetriever}>get info</button>

        {/* products display */}
        <div className='main_products'>
{products && products.map((product, j) => <div key={j} className='products_presentation'>
   <img src={product.image_link} alt="" />
<div className='products_presentation_content'>
<h2> {product.name}</h2>
   <p>{product.brand}</p>
   <p>{product.price} &euro;</p>
</div>
<p className='products_presentation_additional'>*Inkl. MwSr. und zzgl.Versand</p>
<button className='btn'><a className="text-2xl"><ion-icon name="bag-outline"></ion-icon></a></button>
     </div>)}
     </div>
     {/* end of products display */}
    
    
    </div>
  )
}

export default ProductsPage