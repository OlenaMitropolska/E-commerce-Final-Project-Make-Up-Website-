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
    

    {/* daisy */}
    {/* {products && products.map((product, j) => <div key={j} className='products_presentation'>
    <div className="card w-96 h-{50} bg-base-100 shadow-xl">
  <figure><img src={product.image_link} alt="Shoes" /></figure>
  <div className="card-body h-1/2 w-1/2">
    <h2 className="card-title"> {product.name}</h2>
    <p>{product.brand}</p>
    <div className="card-actions justify-end">
      <button className="btn"><a className="text-2xl"><ion-icon name="bag-outline"></ion-icon></a></button>
    </div>
  </div>
</div>
</div>)} */}
{/* end daisy */}
    </div>
  )
}

export default ProductsPage